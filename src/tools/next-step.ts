/**
 * nextExaTutorialStep MCP Tool Implementation
 * 
 * Advances to the next step in the current tutorial.
 * Marks current step as completed and loads next step content.
 */

import { TutorialFormatter } from '../tutorial/formatter';
import { StateManager } from '../tutorial/state-manager';
import { TutorialContentLoader } from '../tutorial/content-loader';
import { ProgressTracker } from '../tutorial/progress-tracker';
import { TutorialState, Tutorial } from '../types/tutorial-types';

export class NextStepTool {
  private stateManager: StateManager;
  private contentLoader: TutorialContentLoader;
  private progressTracker: ProgressTracker;

  constructor() {
    this.stateManager = new StateManager();
    this.contentLoader = new TutorialContentLoader();
    this.progressTracker = new ProgressTracker();
  }

  /**
   * MCP tool definition
   */
  static getDefinition() {
    return {
      name: 'nextExaTutorialStep',
      description: 'Advance to the next step in the current tutorial. Marks current step as completed.',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    };
  }

  /**
   * Executes the next step tool
   */
  async execute(): Promise<string> {
    try {
      // Load current state
      const state = await this.stateManager.loadState();
      if (!state) {
        return `❌ No tutorial state found. Please start a tutorial first using the startExaTutorial tool.`;
      }

      // Get current tutorial
      const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
      if (!currentTutorial) {
        return `❌ No tutorial currently active. Please start a tutorial first using the startExaTutorial tool.`;
      }

      // Get current step
      const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
      if (!currentStep) {
        return `❌ No current step found. The tutorial may be complete.`;
      }

      const currentLesson = this.progressTracker.getCurrentLesson(currentTutorial);
      if (!currentLesson) {
        return `❌ No current lesson found.`;
      }

      // Mark current step as completed
      await this.stateManager.markCompleted(currentTutorial.name, currentLesson.name, currentStep.name);

      // Check if tutorial is now complete
      const updatedState = await this.stateManager.loadState();
      const updatedTutorial = updatedState!.tutorials.find(t => t.name === state.currentTutorial);
      
      if (this.progressTracker.isTutorialComplete(updatedTutorial!)) {
        return TutorialFormatter.formatTutorialCompletion(updatedTutorial!.title);
      }

      // Get next step
      const nextStep = this.progressTracker.getNextStepAfterCompletion(updatedTutorial!, currentStep);
      if (!nextStep) {
        return TutorialFormatter.formatTutorialCompletion(updatedTutorial!.title);
      }

      // Find lesson containing next step
      const nextLesson = updatedTutorial!.lessons.find(lesson => 
        lesson.steps.some(step => step.name === nextStep.name)
      );

      if (!nextLesson) {
        return `❌ Could not find lesson for next step.`;
      }

      // Check if we're moving to a new lesson
      const isNewLesson = currentLesson.name !== nextLesson.name;
      let response = '';

      if (isNewLesson) {
        response += TutorialFormatter.formatLessonCompletion(currentLesson.title, updatedTutorial!.title) + '\n\n';
      }

      // Mark next step as in progress
      await this.stateManager.updateProgress(updatedTutorial!.name, nextLesson.name, nextStep.name);

      // Load and wrap next step content
      const stepNumber = this.progressTracker.getStepPositionInLesson(nextLesson, nextStep);
      const totalSteps = nextLesson.steps.length;
      
      const wrappedContent = await this.contentLoader.loadAndWrapContent(
        updatedTutorial!.name,
        nextLesson.name,
        nextStep.name,
        nextStep,
        nextLesson.title,
        stepNumber,
        totalSteps
      );

      // Format completion message
      const completionMessage = TutorialFormatter.formatStepCompletion(
        currentStep.title,
        nextStep.title,
        updatedTutorial!.title,
        stepNumber,
        totalSteps
      );

      return `${response}${completionMessage}

${wrappedContent}`;
    } catch (error) {
      return `❌ Error advancing to next step: ${error.message}`;
    }
  }

  /**
   * Checks if there's a next step available
   */
  private async hasNextStep(): Promise<{ hasNext: boolean; message?: string }> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return { hasNext: false, message: 'No tutorial state found.' };
    }

    const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
    if (!currentTutorial) {
      return { hasNext: false, message: 'No tutorial currently active.' };
    }

    const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
    if (!currentStep) {
      return { hasNext: false, message: 'No current step found.' };
    }

    const nextStep = this.progressTracker.getNextStepAfterCompletion(currentTutorial, currentStep);
    if (!nextStep) {
      return { hasNext: false, message: 'Tutorial complete!' };
    }

    return { hasNext: true };
  }

  /**
   * Gets preview of next step without advancing
   */
  async getNextStepPreview(): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
    if (!currentTutorial) {
      return 'No tutorial currently active.';
    }

    const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
    if (!currentStep) {
      return 'No current step found.';
    }

    const nextStep = this.progressTracker.getNextStepAfterCompletion(currentTutorial, currentStep);
    if (!nextStep) {
      return 'Tutorial will be complete after current step.';
    }

    return `Next step: ${nextStep.title}`;
  }

  /**
   * Validates that tutorial progression is valid
   */
  private async validateProgression(tutorial: Tutorial): Promise<{ isValid: boolean; error?: string }> {
    // Check if tutorial has proper structure
    if (!tutorial.lessons || tutorial.lessons.length === 0) {
      return { isValid: false, error: 'Tutorial has no lessons.' };
    }

    // Check if all lessons have steps
    for (const lesson of tutorial.lessons) {
      if (!lesson.steps || lesson.steps.length === 0) {
        return { isValid: false, error: `Lesson '${lesson.title}' has no steps.` };
      }
    }

    // Validate progress consistency
    const validation = this.progressTracker.validateTutorialProgress(tutorial);
    if (!validation.isValid) {
      return { isValid: false, error: validation.errors.join(', ') };
    }

    return { isValid: true };
  }
}