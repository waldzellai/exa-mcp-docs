import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { 
  TutorialState, 
  TutorialStateManager, 
  StateFileStructure, 
  ProgressStatus, 
  TutorialError, 
  UserIdentity 
} from './types.js';
import { UserManager } from './user-manager.js';

/**
 * StateManager handles tutorial progress persistence
 * Implements atomic writes and corruption recovery
 */
export class StateManager implements TutorialStateManager {
  private readonly stateFile: string;
  private readonly userManager: UserManager;
  private state: TutorialState | null = null;
  private readonly stateVersion = '1.0.0';

  constructor(userManager: UserManager) {
    this.userManager = userManager;
    this.stateFile = path.join(userManager.getCacheDirectory(), 'state.json');
  }

  /**
   * Load tutorial state from filesystem
   * Creates default state if none exists
   */
  async loadState(): Promise<TutorialState> {
    if (this.state) {
      return this.state;
    }

    try {
      // Get user identity first
      const userIdentity = await this.userManager.getUserIdentity();

      // Try to load existing state
      if (fs.existsSync(this.stateFile)) {
        const stateData = await this.loadStateFromFile();
        if (stateData) {
          this.state = stateData;
          this.state.userId = userIdentity.userId; // Ensure consistency
          this.state.lastAccessed = new Date().toISOString();
          await this.saveState(this.state);
          return this.state;
        }
      }

      // Create default state
      this.state = this.createDefaultState(userIdentity);
      await this.saveState(this.state);
      return this.state;
    } catch (error) {
      throw new TutorialError(
        `Failed to load tutorial state: ${error instanceof Error ? error.message : String(error)}`,
        { code: 'STATE_LOAD_ERROR', context: { error } }
      );
    }
  }

  /**
   * Save tutorial state to filesystem with atomic write
   */
  async saveState(state: TutorialState): Promise<void> {
    try {
      state.lastAccessed = new Date().toISOString();
      
      const stateFileData: StateFileStructure = {
        version: this.stateVersion,
        state: state,
        checksum: this.calculateChecksum(state)
      };

      const data = JSON.stringify(stateFileData, null, 2);
      await this.writeFileAtomic(this.stateFile, data);
      
      this.state = state;
    } catch (error) {
      throw new TutorialError(
        `Failed to save tutorial state: ${error instanceof Error ? error.message : String(error)}`,
        { code: 'STATE_SAVE_ERROR', context: { error } }
      );
    }
  }

  /**
   * Get user identity
   */
  async getUserIdentity(): Promise<UserIdentity> {
    return await this.userManager.getUserIdentity();
  }

  /**
   * Update progress for a specific step
   */
  async updateProgress(
    tutorialName: string, 
    lessonName: string, 
    stepName: string, 
    status: ProgressStatus
  ): Promise<void> {
    const state = await this.loadState();
    
    // Find tutorial
    const tutorial = state.tutorials.find(t => t.name === tutorialName);
    if (!tutorial) {
      throw new TutorialError(
        `Tutorial not found: ${tutorialName}`,
        { code: 'TUTORIAL_NOT_FOUND', context: { tutorialName } }
      );
    }

    // Find lesson
    const lesson = tutorial.lessons.find(l => l.name === lessonName);
    if (!lesson) {
      throw new TutorialError(
        `Lesson not found: ${lessonName}`,
        { code: 'LESSON_NOT_FOUND', context: { tutorialName, lessonName } }
      );
    }

    // Find step
    const step = lesson.steps.find(s => s.name === stepName);
    if (!step) {
      throw new TutorialError(
        `Step not found: ${stepName}`,
        { code: 'STEP_NOT_FOUND', context: { tutorialName, lessonName, stepName } }
      );
    }

    // Update step status
    step.status = status;

    // Update lesson status based on step completion
    this.updateLessonStatus(lesson);

    // Update tutorial status based on lesson completion
    this.updateTutorialStatus(tutorial);

    // Update current position if step is in progress
    if (status === 1) { // in progress
      state.currentTutorial = tutorialName;
      tutorial.currentLesson = lessonName;
      lesson.currentStep = stepName;
    }

    await this.saveState(state);
  }

  /**
   * Reset all tutorial progress
   */
  async resetProgress(): Promise<void> {
    const userIdentity = await this.userManager.getUserIdentity();
    this.state = this.createDefaultState(userIdentity);
    await this.saveState(this.state);
  }

  /**
   * Load state from file with integrity validation
   */
  private async loadStateFromFile(): Promise<TutorialState | null> {
    try {
      const data = fs.readFileSync(this.stateFile, 'utf-8');
      const stateFileData: StateFileStructure = JSON.parse(data);

      // Validate file structure
      if (!this.validateStateFileStructure(stateFileData)) {
        console.error('Invalid state file structure, creating new state');
        return null;
      }

      // Validate checksum if present
      if (stateFileData.checksum) {
        const expectedChecksum = this.calculateChecksum(stateFileData.state);
        if (stateFileData.checksum !== expectedChecksum) {
          console.error('State file checksum mismatch, creating new state');
          return null;
        }
      }

      // Check version compatibility
      if (stateFileData.version !== this.stateVersion) {
        console.warn(`State file version ${stateFileData.version} differs from current ${this.stateVersion}`);
        // Could implement migration logic here
      }

      return stateFileData.state;
    } catch (error) {
      console.error('Failed to parse state file:', error);
      return null;
    }
  }

  /**
   * Create default tutorial state
   */
  private createDefaultState(userIdentity: UserIdentity): TutorialState {
    return {
      userId: userIdentity.userId,
      currentTutorial: '',
      tutorials: [],
      lastAccessed: new Date().toISOString()
    };
  }

  /**
   * Update lesson status based on step completion
   */
  private updateLessonStatus(lesson: any): void {
    const totalSteps = lesson.steps.length;
    const completedSteps = lesson.steps.filter((s: any) => s.status === 2).length;
    const inProgressSteps = lesson.steps.filter((s: any) => s.status === 1).length;

    if (completedSteps === totalSteps) {
      lesson.status = 2; // completed
    } else if (completedSteps > 0 || inProgressSteps > 0) {
      lesson.status = 1; // in progress
    } else {
      lesson.status = 0; // not started
    }
  }

  /**
   * Update tutorial status based on lesson completion
   */
  private updateTutorialStatus(tutorial: any): void {
    const totalLessons = tutorial.lessons.length;
    const completedLessons = tutorial.lessons.filter((l: any) => l.status === 2).length;
    const inProgressLessons = tutorial.lessons.filter((l: any) => l.status === 1).length;

    if (completedLessons === totalLessons) {
      tutorial.status = 2; // completed
    } else if (completedLessons > 0 || inProgressLessons > 0) {
      tutorial.status = 1; // in progress
    } else {
      tutorial.status = 0; // not started
    }
  }

  /**
   * Calculate checksum for state integrity
   */
  private calculateChecksum(state: TutorialState): string {
    const stateString = JSON.stringify(state, Object.keys(state).sort());
    return crypto.createHash('sha256').update(stateString).digest('hex');
  }

  /**
   * Validate state file structure
   */
  private validateStateFileStructure(data: any): data is StateFileStructure {
    return (
      typeof data === 'object' &&
      data !== null &&
      typeof data.version === 'string' &&
      typeof data.state === 'object' &&
      data.state !== null &&
      this.validateTutorialState(data.state)
    );
  }

  /**
   * Validate tutorial state structure
   */
  private validateTutorialState(state: any): state is TutorialState {
    return (
      typeof state.userId === 'string' &&
      typeof state.currentTutorial === 'string' &&
      Array.isArray(state.tutorials) &&
      typeof state.lastAccessed === 'string'
    );
  }

  /**
   * Atomic file write to prevent corruption
   */
  private async writeFileAtomic(filePath: string, data: string): Promise<void> {
    const tempFile = `${filePath}.tmp`;
    
    try {
      // Write to temporary file
      fs.writeFileSync(tempFile, data, 'utf-8');
      
      // Atomic rename
      fs.renameSync(tempFile, filePath);
    } catch (error) {
      // Clean up temp file if it exists
      if (fs.existsSync(tempFile)) {
        try {
          fs.unlinkSync(tempFile);
        } catch (unlinkError) {
          // Ignore cleanup errors
        }
      }
      throw error;
    }
  }
}