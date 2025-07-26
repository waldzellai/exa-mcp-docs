/**
 * TypeScript interfaces for the Exa Interactive Tutorials system
 * These types define the structure for tutorial state management and content
 */

export type ProgressStatus = 0 | 1 | 2; // not started | in progress | completed

export interface TutorialState {
  /** Local UUID for this user */
  userId: string;
  /** Current tutorial name */
  currentTutorial: string;
  /** All available tutorials */
  tutorials: Tutorial[];
  /** ISO timestamp of last access */
  lastAccessed: string;
}

export interface Tutorial {
  /** Tutorial identifier */
  name: string;
  /** Display name */
  title: string;
  /** Tutorial description */
  description: string;
  /** Progress status */
  status: ProgressStatus;
  /** Current lesson name */
  currentLesson: string;
  /** Tutorial lessons */
  lessons: Lesson[];
  /** Additional metadata */
  metadata?: TutorialMetadata;
}

export interface Lesson {
  /** Lesson identifier */
  name: string;
  /** Display title */
  title: string;
  /** Progress status */
  status: ProgressStatus;
  /** Current step name */
  currentStep: string;
  /** Lesson steps */
  steps: Step[];
}

export interface Step {
  /** Step identifier */
  name: string;
  /** Display title */
  title: string;
  /** Progress status */
  status: ProgressStatus;
  /** Step content (loaded on demand) */
  content: string;
  /** Step metadata from frontmatter */
  metadata?: StepMetadata;
}

export interface TutorialMetadata {
  /** Estimated completion time */
  estimatedTime?: string;
  /** Difficulty level */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** Prerequisites */
  prerequisites?: string[];
  /** Tutorial version */
  version?: string;
}

export interface StepMetadata {
  /** Step description */
  description?: string;
  /** Whether step includes code examples */
  codeExample?: boolean;
  /** Estimated time for this step */
  estimatedTime?: string;
  /** Step tags */
  tags?: string[];
}

export interface TutorialDirectoryStructure {
  /** Tutorial name */
  name: string;
  /** Path to tutorial directory */
  path: string;
  /** Tutorial metadata file */
  metadataFile: string;
  /** Lessons in this tutorial */
  lessons: LessonDirectoryStructure[];
}

export interface LessonDirectoryStructure {
  /** Lesson name */
  name: string;
  /** Path to lesson directory */
  path: string;
  /** Steps in this lesson */
  steps: StepDirectoryStructure[];
}

export interface StepDirectoryStructure {
  /** Step name */
  name: string;
  /** Path to step markdown file */
  path: string;
  /** Step title extracted from filename */
  title: string;
}

export interface TutorialToolArgs {
  /** Tutorial name */
  tutorialName?: string;
  /** Lesson name */
  lessonName?: string;
  /** Step name */
  stepName?: string;
  /** Confirmation flag */
  confirm?: boolean;
}

export interface TutorialNavigationResult {
  /** Success flag */
  success: boolean;
  /** Result message */
  message: string;
  /** Current position */
  currentPosition?: {
    tutorial: string;
    lesson: string;
    step: string;
  };
  /** Step content if applicable */
  content?: string;
  /** Progress information */
  progress?: {
    tutorialProgress: number;
    lessonProgress: number;
    completedSteps: number;
    totalSteps: number;
  };
}

export interface TutorialStatusInfo {
  /** Current tutorial */
  currentTutorial?: Tutorial;
  /** Current lesson */
  currentLesson?: Lesson;
  /** Current step */
  currentStep?: Step;
  /** Available tutorials */
  availableTutorials: Tutorial[];
  /** Overall progress */
  overallProgress: {
    completedTutorials: number;
    totalTutorials: number;
    completedLessons: number;
    totalLessons: number;
    completedSteps: number;
    totalSteps: number;
  };
}

export interface TutorialError extends Error {
  /** Error code */
  code: string;
  /** Error context */
  context?: any;
}

export interface UserIdentity {
  /** User ID */
  userId: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last seen timestamp */
  lastSeen: string;
}

export interface StateFileStructure {
  /** Format version for migration compatibility */
  version: string;
  /** Tutorial state */
  state: TutorialState;
  /** Checksum for integrity validation */
  checksum?: string;
}

export interface TutorialContentFile {
  /** File path */
  path: string;
  /** Raw content */
  content: string;
  /** Parsed frontmatter */
  frontmatter: Record<string, any>;
  /** Markdown content without frontmatter */
  markdownContent: string;
}

export interface TutorialDirectoryScanner {
  /** Scan tutorials directory */
  scanTutorials(tutorialsPath: string): Promise<TutorialDirectoryStructure[]>;
  /** Validate tutorial structure */
  validateTutorialStructure(tutorial: TutorialDirectoryStructure): boolean;
  /** Get tutorial metadata */
  getTutorialMetadata(tutorialPath: string): Promise<TutorialMetadata>;
}

export interface TutorialContentLoader {
  /** Load tutorial content */
  loadTutorial(tutorialPath: string): Promise<Tutorial>;
  /** Load lesson content */
  loadLesson(lessonPath: string): Promise<Lesson>;
  /** Load step content */
  loadStep(stepPath: string): Promise<Step>;
  /** Parse markdown with frontmatter */
  parseMarkdownFile(filePath: string): Promise<TutorialContentFile>;
}

export interface TutorialStateManager {
  /** Load tutorial state */
  loadState(): Promise<TutorialState>;
  /** Save tutorial state */
  saveState(state: TutorialState): Promise<void>;
  /** Get user identity */
  getUserIdentity(): Promise<UserIdentity>;
  /** Update progress */
  updateProgress(tutorial: string, lesson: string, step: string, status: ProgressStatus): Promise<void>;
  /** Reset all progress */
  resetProgress(): Promise<void>;
}

export interface TutorialProgressTracker {
  /** Calculate tutorial progress */
  calculateTutorialProgress(tutorial: Tutorial): number;
  /** Calculate lesson progress */
  calculateLessonProgress(lesson: Lesson): number;
  /** Calculate overall progress */
  calculateOverallProgress(tutorials: Tutorial[]): {
    completedTutorials: number;
    totalTutorials: number;
    completedLessons: number;
    totalLessons: number;
    completedSteps: number;
    totalSteps: number;
  };
  /** Mark step as completed */
  markStepCompleted(state: TutorialState, tutorial: string, lesson: string, step: string): void;
  /** Get next step */
  getNextStep(state: TutorialState, tutorial: string, lesson: string, step: string): {
    tutorial: string;
    lesson: string;
    step: string;
  } | null;
}

export interface TutorialEngine {
  /** Initialize tutorial system */
  initialize(): Promise<void>;
  /** Start tutorial */
  startTutorial(tutorialName?: string): Promise<TutorialNavigationResult>;
  /** Go to next step */
  nextStep(): Promise<TutorialNavigationResult>;
  /** Get current status */
  getStatus(): Promise<TutorialStatusInfo>;
  /** Jump to specific step */
  jumpToStep(tutorial: string, lesson?: string, step?: string): Promise<TutorialNavigationResult>;
  /** Reset progress */
  resetProgress(confirm: boolean): Promise<TutorialNavigationResult>;
}