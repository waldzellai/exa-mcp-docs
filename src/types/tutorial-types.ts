/**
 * Core type definitions for the Exa Interactive Tutorial System v2.0
 * 
 * Based on the specification in specs/exa-interactive-tutorials-v2.md
 * Implements the assistant-as-tutor approach with terminal-optimized formatting
 */

export type ProgressStatus = 0 | 1 | 2; // not started | in progress | completed

export interface TutorialState {
  userId: string;           // Local UUID for this user
  currentTutorial: string;  // Current tutorial name
  tutorials: Tutorial[];    // All available tutorials
  lastAccessed: string;     // ISO timestamp
  version: string;          // State schema version
}

export interface Tutorial {
  name: string;             // Tutorial identifier (kebab-case)
  title: string;            // Display name
  description: string;      // Brief description
  difficulty: "beginner" | "intermediate" | "advanced";
  status: ProgressStatus;   // 0=not started, 1=in progress, 2=completed
  currentLesson: string;    // Current lesson name
  lessons: Lesson[];        // Tutorial lessons
  prerequisites: string[];  // Required knowledge/tutorials
}

export interface Lesson {
  name: string;             // Lesson identifier (kebab-case)
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  currentStep: string;      // Current step name
  steps: Step[];            // Lesson steps
}

export interface Step {
  name: string;             // Step identifier (kebab-case)
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  hasCode: boolean;         // Whether step includes code examples
  content?: string;         // Step content (loaded on demand)
}

export interface TutorialFormatter {
  // Progress indicators
  statusEmoji: (status: ProgressStatus) => '⬜' | '🔶' | '✅';
  
  // Step headers
  stepHeader: (lesson: string, step: string) => string;
  // "📘 Lesson: Understanding Websets\n📝 Step: What Are Websets"
  
  // Progress summary
  progressSummary: (tutorial: Tutorial) => string;
  // "Progress: 3/7 steps completed (43%)"
  
  // Navigation hints
  navigationHints: () => string;
  // "Ready to continue? Ask me to 'move to the next step'"
}

export interface StateManager {
  // Storage paths
  userIdPath: string;     // ~/.cache/exa-tutorials/user-id
  statePath: string;      // ~/.cache/exa-tutorials/state.json
  
  // Core operations
  loadState(): Promise<TutorialState | null>;
  saveState(state: TutorialState): Promise<void>;
  
  // Atomic operations
  updateProgress(tutorialName: string, lessonName: string, stepName: string): Promise<void>;
  markCompleted(tutorialName: string, lessonName: string, stepName: string): Promise<void>;
  
  // Error handling
  recoverFromCorruption(): Promise<TutorialState>;
  migrateStateVersion(oldState: any): Promise<TutorialState>;
}

export interface ProgressTracker {
  // Status calculations
  calculateTutorialProgress(tutorial: Tutorial): number;
  calculateOverallProgress(state: TutorialState): number;
  
  // Next step logic
  findNextStep(tutorial: Tutorial): Step | null;
  findNextLesson(tutorial: Tutorial): Lesson | null;
  
  // Completion logic
  isStepComplete(step: Step): boolean;
  isLessonComplete(lesson: Lesson): boolean;
  isTutorialComplete(tutorial: Tutorial): boolean;
}

export interface TutorialContentLoader {
  // Content loading
  loadStepContent(tutorialName: string, lessonName: string, stepName: string): Promise<string>;
  loadFromDisk(tutorialName: string, lessonName: string, stepName: string): Promise<string>;
  wrapForTutoring(content: string, stepInfo: Step): Promise<string>;
}

export interface TutorialErrorHandler {
  // Error recovery
  handleCorruptedState(): Promise<TutorialState>;
  handleMissingContent(tutorialName: string, lessonName: string, stepName: string): Promise<string>;
  handleInvalidNavigation(requested: string, available: string[]): string;
}

export interface TutorialMemoryManager {
  // Memory management
  readonly MAX_CACHED_STEPS: number;
  stepCache: Map<string, string>;
  
  // Cache operations
  getCachedStep(key: string): string | undefined;
  setCachedStep(key: string, content: string): void;
  clearCache(): void;
}

// MCP Tool parameter types
export interface StartTutorialParams {
  tutorialName?: string;
}

export interface JumpToStepParams {
  tutorialName: string;
  lessonName?: string;
  stepName?: string;
}

export interface ResetProgressParams {
  confirm?: boolean;
}

// Tutorial metadata format (from tutorial.json files)
export interface TutorialMetadata {
  name: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  lessons: LessonMetadata[];
}

export interface LessonMetadata {
  name: string;
  title: string;
  steps: StepMetadata[];
}

export interface StepMetadata {
  name: string;
  title: string;
  hasCode: boolean;
}

// Content format (from markdown files)
export interface StepContent {
  title: string;
  hasCode: boolean;
  content: string;
}

// Error types
export class TutorialError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'TutorialError';
  }
}

export class StateCorruptionError extends TutorialError {
  constructor(message: string) {
    super(message, 'STATE_CORRUPTION');
  }
}

export class ContentNotFoundError extends TutorialError {
  constructor(message: string) {
    super(message, 'CONTENT_NOT_FOUND');
  }
}

export class InvalidNavigationError extends TutorialError {
  constructor(message: string) {
    super(message, 'INVALID_NAVIGATION');
  }
}

// Constants
export const TUTORIAL_CACHE_DIR = '~/.cache/exa-tutorials';
export const USER_ID_FILE = 'user-id';
export const STATE_FILE = 'state.json';
export const TUTORIAL_DIR = 'tutorials';
export const CURRENT_STATE_VERSION = '1.0.0';
export const MAX_CACHED_STEPS = 10;

// Tutoring prompt constant
export const TUTORING_PROMPT = `
You are a skilled programming tutor helping someone learn Exa's search capabilities. Your role is to:

1. **Guide, don't dump**: Present step content in a conversational, teaching manner
2. **Write code for the user**: When examples are shown, write the actual code
3. **Explain as you go**: Briefly explain concepts before showing code
4. **Keep it concise**: This is a terminal environment - be brief but thorough
5. **Be encouraging**: Celebrate progress and provide clear next steps

The user is currently working through a tutorial step. Present the content below in a teaching manner, write any code examples for them, and guide them to use the \`nextExaTutorialStep\` tool when they're ready to continue.

Remember: You're a tutor, not a documentation reader. Make this interactive and engaging while keeping output concise for the terminal.
`;