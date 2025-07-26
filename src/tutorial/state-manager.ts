/**
 * State Management System for Exa Interactive Tutorials
 * 
 * Handles local filesystem-based persistence of tutorial progress using
 * atomic writes and corruption recovery. Follows the pattern established
 * by Mastra's course system but with enhanced error handling.
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { randomUUID } from 'crypto';
import { 
  TutorialState, 
  StateManager as IStateManager, 
  TUTORIAL_CACHE_DIR, 
  USER_ID_FILE, 
  STATE_FILE, 
  CURRENT_STATE_VERSION,
  StateCorruptionError,
  TutorialError
} from '../types/tutorial-types';

/**
 * Manages tutorial state persistence to local filesystem
 */
export class StateManager implements IStateManager {
  readonly userIdPath: string;
  readonly statePath: string;
  private readonly cacheDir: string;

  constructor() {
    this.cacheDir = join(homedir(), '.cache', 'exa-tutorials');
    this.userIdPath = join(this.cacheDir, USER_ID_FILE);
    this.statePath = join(this.cacheDir, STATE_FILE);
  }

  /**
   * Loads tutorial state from filesystem
   */
  async loadState(): Promise<TutorialState | null> {
    try {
      await this.ensureCacheDirectory();
      
      if (!(await this.fileExists(this.statePath))) {
        return null;
      }

      const stateData = await fs.readFile(this.statePath, 'utf8');
      const state = JSON.parse(stateData) as TutorialState;
      
      // Validate state structure
      if (!this.isValidState(state)) {
        throw new StateCorruptionError('Invalid state structure');
      }

      // Migrate if necessary
      if (state.version !== CURRENT_STATE_VERSION) {
        return await this.migrateStateVersion(state);
      }

      return state;
    } catch (error) {
      if (error instanceof StateCorruptionError) {
        console.warn('State corruption detected, attempting recovery...');
        return await this.recoverFromCorruption();
      }
      throw error;
    }
  }

  /**
   * Saves tutorial state to filesystem using atomic writes
   */
  async saveState(state: TutorialState): Promise<void> {
    try {
      await this.ensureCacheDirectory();
      
      // Update timestamp
      state.lastAccessed = new Date().toISOString();
      
      // Validate state before saving
      if (!this.isValidState(state)) {
        throw new TutorialError('Invalid state structure', 'INVALID_STATE');
      }

      // Atomic write using temporary file
      const tempPath = this.statePath + '.tmp';
      const stateData = JSON.stringify(state, null, 2);
      
      await fs.writeFile(tempPath, stateData, 'utf8');
      await fs.rename(tempPath, this.statePath);
    } catch (error) {
      throw new TutorialError(`Failed to save state: ${error.message}`, 'SAVE_ERROR');
    }
  }

  /**
   * Updates progress for a specific step
   */
  async updateProgress(tutorialName: string, lessonName: string, stepName: string): Promise<void> {
    const state = await this.loadState();
    if (!state) {
      throw new TutorialError('No state found', 'NO_STATE');
    }

    const tutorial = state.tutorials.find(t => t.name === tutorialName);
    if (!tutorial) {
      throw new TutorialError(`Tutorial not found: ${tutorialName}`, 'TUTORIAL_NOT_FOUND');
    }

    const lesson = tutorial.lessons.find(l => l.name === lessonName);
    if (!lesson) {
      throw new TutorialError(`Lesson not found: ${lessonName}`, 'LESSON_NOT_FOUND');
    }

    const step = lesson.steps.find(s => s.name === stepName);
    if (!step) {
      throw new TutorialError(`Step not found: ${stepName}`, 'STEP_NOT_FOUND');
    }

    // Update step status to in progress
    step.status = 1;
    
    // Update lesson and tutorial current pointers
    lesson.currentStep = stepName;
    tutorial.currentLesson = lessonName;
    
    // Update tutorial status if it's not started
    if (tutorial.status === 0) {
      tutorial.status = 1;
    }

    // Update lesson status if it's not started
    if (lesson.status === 0) {
      lesson.status = 1;
    }

    // Update current tutorial
    state.currentTutorial = tutorialName;

    await this.saveState(state);
  }

  /**
   * Marks a step as completed and updates overall progress
   */
  async markCompleted(tutorialName: string, lessonName: string, stepName: string): Promise<void> {
    const state = await this.loadState();
    if (!state) {
      throw new TutorialError('No state found', 'NO_STATE');
    }

    const tutorial = state.tutorials.find(t => t.name === tutorialName);
    if (!tutorial) {
      throw new TutorialError(`Tutorial not found: ${tutorialName}`, 'TUTORIAL_NOT_FOUND');
    }

    const lesson = tutorial.lessons.find(l => l.name === lessonName);
    if (!lesson) {
      throw new TutorialError(`Lesson not found: ${lessonName}`, 'LESSON_NOT_FOUND');
    }

    const step = lesson.steps.find(s => s.name === stepName);
    if (!step) {
      throw new TutorialError(`Step not found: ${stepName}`, 'STEP_NOT_FOUND');
    }

    // Mark step as completed
    step.status = 2;

    // Check if lesson is complete
    const allStepsComplete = lesson.steps.every(s => s.status === 2);
    if (allStepsComplete) {
      lesson.status = 2;
    }

    // Check if tutorial is complete
    const allLessonsComplete = tutorial.lessons.every(l => l.status === 2);
    if (allLessonsComplete) {
      tutorial.status = 2;
    }

    // Update current pointers to next step/lesson
    this.updateCurrentPointers(tutorial);

    await this.saveState(state);
  }

  /**
   * Recovers from state corruption by creating fresh state
   */
  async recoverFromCorruption(): Promise<TutorialState> {
    console.warn('Recovering from state corruption, creating fresh state...');
    
    const userId = await this.getUserId();
    const freshState: TutorialState = {
      userId,
      currentTutorial: '',
      tutorials: [],
      lastAccessed: new Date().toISOString(),
      version: CURRENT_STATE_VERSION
    };

    await this.saveState(freshState);
    return freshState;
  }

  /**
   * Migrates state from older versions
   */
  async migrateStateVersion(oldState: any): Promise<TutorialState> {
    console.log(`Migrating state from version ${oldState.version || 'unknown'} to ${CURRENT_STATE_VERSION}`);
    
    // For now, just create a fresh state and preserve user ID if it exists
    const userId = oldState.userId || await this.getUserId();
    const migratedState: TutorialState = {
      userId,
      currentTutorial: '',
      tutorials: [],
      lastAccessed: new Date().toISOString(),
      version: CURRENT_STATE_VERSION
    };

    await this.saveState(migratedState);
    return migratedState;
  }

  /**
   * Gets or creates user ID
   */
  async getUserId(): Promise<string> {
    try {
      await this.ensureCacheDirectory();
      
      if (await this.fileExists(this.userIdPath)) {
        return await fs.readFile(this.userIdPath, 'utf8');
      }

      const userId = randomUUID();
      await fs.writeFile(this.userIdPath, userId, 'utf8');
      return userId;
    } catch (error) {
      throw new TutorialError(`Failed to get user ID: ${error.message}`, 'USER_ID_ERROR');
    }
  }

  /**
   * Resets all tutorial progress
   */
  async resetAllProgress(): Promise<void> {
    const state = await this.loadState();
    if (!state) {
      return;
    }

    // Reset all tutorials, lessons, and steps
    for (const tutorial of state.tutorials) {
      tutorial.status = 0;
      tutorial.currentLesson = '';
      
      for (const lesson of tutorial.lessons) {
        lesson.status = 0;
        lesson.currentStep = '';
        
        for (const step of lesson.steps) {
          step.status = 0;
        }
      }
    }

    state.currentTutorial = '';
    await this.saveState(state);
  }

  /**
   * Ensures cache directory exists
   */
  private async ensureCacheDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw new TutorialError(`Failed to create cache directory: ${error.message}`, 'CACHE_DIR_ERROR');
      }
    }
  }

  /**
   * Checks if file exists
   */
  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validates state structure
   */
  private isValidState(state: any): state is TutorialState {
    return (
      typeof state === 'object' &&
      typeof state.userId === 'string' &&
      typeof state.currentTutorial === 'string' &&
      Array.isArray(state.tutorials) &&
      typeof state.lastAccessed === 'string' &&
      typeof state.version === 'string'
    );
  }

  /**
   * Updates current pointers to next step/lesson after completion
   */
  private updateCurrentPointers(tutorial: any): void {
    // Find next incomplete step
    for (const lesson of tutorial.lessons) {
      for (const step of lesson.steps) {
        if (step.status !== 2) {
          lesson.currentStep = step.name;
          tutorial.currentLesson = lesson.name;
          return;
        }
      }
    }

    // If all steps are complete, clear current pointers
    tutorial.currentLesson = '';
    for (const lesson of tutorial.lessons) {
      lesson.currentStep = '';
    }
  }
}