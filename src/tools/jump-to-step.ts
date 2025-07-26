/**
 * jumpToExaTutorialStep MCP Tool Implementation
 * 
 * Jumps to a specific tutorial, lesson, or step with flexible navigation.
 */

import { TutorialFormatter } from '../tutorial/formatter';
import { StateManager } from '../tutorial/state-manager';
import { TutorialContentLoader } from '../tutorial/content-loader';
import { ProgressTracker } from '../tutorial/progress-tracker';
import { JumpToStepParams, TutorialState, Tutorial, Lesson, Step } from '../types/tutorial-types';

export class JumpToStepTool {
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
      name: 'jumpToExaTutorialStep',
      description: 'Jump to a specific tutorial, lesson, or step.',
      inputSchema: {
        type: 'object',
        properties: {
          tutorialName: {
            type: 'string',
            description: 'Name of the tutorial to jump to'
          },
          lessonName: {
            type: 'string',
            description: 'Optional: Name of the lesson to jump to'
          },
          stepName: {
            type: 'string',
            description: 'Optional: Name of the step to jump to'
          }
        },
        required: ['tutorialName']
      }
    };
  }

  /**
   * Executes the jump to step tool
   */
  async execute(params: JumpToStepParams): Promise<string> {
    try {
      // Load current state
      const state = await this.stateManager.loadState();
      if (!state) {
        return `❌ No tutorial state found. Please start a tutorial first using the startExaTutorial tool.`;
      }

      // Find target tutorial
      const tutorial = state.tutorials.find(t => t.name === params.tutorialName);
      if (!tutorial) {
        const availableNames = state.tutorials.map(t => t.name);
        return TutorialFormatter.formatTutorialNotFound(params.tutorialName, availableNames);
      }

      // Handle different navigation scenarios
      if (params.stepName && params.lessonName) {
        return await this.jumpToSpecificStep(tutorial, params.lessonName, params.stepName, state);
      } else if (params.lessonName) {
        return await this.jumpToLesson(tutorial, params.lessonName, state);
      } else {
        return await this.jumpToTutorial(tutorial, state);
      }
    } catch (error) {
      return `❌ Error jumping to step: ${error.message}`;
    }
  }

  /**
   * Jumps to a specific step within a lesson
   */
  private async jumpToSpecificStep(
    tutorial: Tutorial,
    lessonName: string,
    stepName: string,
    state: TutorialState
  ): Promise<string> {
    // Find target lesson
    const lesson = tutorial.lessons.find(l => l.name === lessonName);
    if (!lesson) {
      const availableLessons = tutorial.lessons.map(l => l.name);
      return `❌ Lesson '${lessonName}' not found in tutorial '${tutorial.title}'.

Available lessons:
${availableLessons.map(name => `- ${name}`).join('\n')}`;
    }

    // Find target step
    const step = lesson.steps.find(s => s.name === stepName);
    if (!step) {
      const availableSteps = lesson.steps.map(s => s.name);
      return `❌ Step '${stepName}' not found in lesson '${lesson.title}'.

Available steps:
${availableSteps.map(name => `- ${name}`).join('\n')}`;
    }

    // Mark progress preservation - mark all previous steps as completed
    await this.markProgressToStep(tutorial, lesson, step, state);

    // Update current position
    await this.stateManager.updateProgress(tutorial.name, lesson.name, step.name);

    // Load and wrap content
    const stepNumber = this.progressTracker.getStepPositionInLesson(lesson, step);
    const totalSteps = lesson.steps.length;
    
    const wrappedContent = await this.contentLoader.loadAndWrapContent(
      tutorial.name,
      lesson.name,
      step.name,
      step,
      lesson.title,
      stepNumber,
      totalSteps
    );

    // Show navigation context
    const contextMessage = this.generateJumpContext(tutorial, lesson, step);

    return `${contextMessage}

${wrappedContent}`;
  }

  /**
   * Jumps to the first step of a lesson
   */
  private async jumpToLesson(tutorial: Tutorial, lessonName: string, state: TutorialState): Promise<string> {
    // Find target lesson
    const lesson = tutorial.lessons.find(l => l.name === lessonName);
    if (!lesson) {
      const availableLessons = tutorial.lessons.map(l => l.name);
      return `❌ Lesson '${lessonName}' not found in tutorial '${tutorial.title}'.

Available lessons:
${availableLessons.map(name => `- ${name}`).join('\n')}`;
    }

    // Jump to first step of lesson
    if (lesson.steps.length === 0) {
      return `❌ Lesson '${lesson.title}' has no steps.`;
    }

    const firstStep = lesson.steps[0];
    return await this.jumpToSpecificStep(tutorial, lesson.name, firstStep.name, state);
  }

  /**
   * Jumps to tutorial (first step of first lesson)
   */
  private async jumpToTutorial(tutorial: Tutorial, state: TutorialState): Promise<string> {
    // Find first lesson
    if (tutorial.lessons.length === 0) {
      return `❌ Tutorial '${tutorial.title}' has no lessons.`;
    }

    const firstLesson = tutorial.lessons[0];
    if (firstLesson.steps.length === 0) {
      return `❌ First lesson '${firstLesson.title}' has no steps.`;
    }

    const firstStep = firstLesson.steps[0];
    return await this.jumpToSpecificStep(tutorial, firstLesson.name, firstStep.name, state);
  }

  /**
   * Marks progress up to the target step as completed
   */
  private async markProgressToStep(tutorial: Tutorial, targetLesson: Lesson, targetStep: Step, state: TutorialState): Promise<void> {
    // Mark all previous lessons as completed
    for (const lesson of tutorial.lessons) {
      if (lesson.name === targetLesson.name) {
        // Mark steps in current lesson up to target step as completed
        for (const step of lesson.steps) {
          if (step.name === targetStep.name) {
            break;
          }
          await this.stateManager.markCompleted(tutorial.name, lesson.name, step.name);
        }
        break;
      } else {
        // Mark all steps in previous lessons as completed
        for (const step of lesson.steps) {
          await this.stateManager.markCompleted(tutorial.name, lesson.name, step.name);
        }
      }
    }
  }

  /**
   * Generates context message for jump navigation
   */
  private generateJumpContext(tutorial: Tutorial, lesson: Lesson, step: Step): string {
    const tutorialProgress = this.progressTracker.calculateTutorialProgress(tutorial);
    const stepPosition = this.progressTracker.getStepPosition(tutorial, step);
    const totalSteps = this.progressTracker.getTotalSteps(tutorial);
    const lessonPosition = this.progressTracker.getLessonPosition(tutorial, lesson);
    const stepInLesson = this.progressTracker.getStepPositionInLesson(lesson, step);

    return `🎯 Jumped to: ${tutorial.title}
📘 Lesson ${lessonPosition}: ${lesson.title}
📝 Step ${stepInLesson}/${lesson.steps.length}: ${step.title}
📊 Tutorial Progress: ${tutorialProgress}% (${stepPosition}/${totalSteps} steps)`;
  }

  /**
   * Validates jump parameters
   */
  private validateJumpParams(params: JumpToStepParams): { isValid: boolean; error?: string } {
    if (!params.tutorialName) {
      return { isValid: false, error: 'Tutorial name is required.' };
    }

    if (params.stepName && !params.lessonName) {
      return { isValid: false, error: 'Lesson name is required when step name is provided.' };
    }

    return { isValid: true };
  }

  /**
   * Shows available jump targets
   */
  async showAvailableTargets(tutorialName?: string): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    if (!tutorialName) {
      // Show all tutorials
      return `📚 Available tutorials to jump to:

${TutorialFormatter.formatTutorialList(state.tutorials)}

Use jumpToExaTutorialStep with a tutorial name to jump to a specific tutorial.`;
    }

    // Show specific tutorial structure
    const tutorial = state.tutorials.find(t => t.name === tutorialName);
    if (!tutorial) {
      return `Tutorial '${tutorialName}' not found.`;
    }

    let structure = `📘 ${tutorial.title} Structure:\n\n`;
    
    for (let i = 0; i < tutorial.lessons.length; i++) {
      const lesson = tutorial.lessons[i];
      const lessonStatus = TutorialFormatter.statusEmoji(lesson.status);
      structure += `${i + 1}. ${lessonStatus} ${lesson.title} (${lesson.name})\n`;
      
      for (let j = 0; j < lesson.steps.length; j++) {
        const step = lesson.steps[j];
        const stepStatus = TutorialFormatter.statusEmoji(step.status);
        structure += `   ${j + 1}. ${stepStatus} ${step.title} (${step.name})\n`;
      }
      structure += '\n';
    }

    structure += `Use jumpToExaTutorialStep with:
- tutorialName: "${tutorial.name}"
- lessonName: one of the lesson names above
- stepName: one of the step names above`;

    return structure;
  }

  /**
   * Gets jump suggestions based on current position
   */
  async getJumpSuggestions(): Promise<string> {
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

    let suggestions = `🎯 Jump Suggestions from "${currentStep.title}":\n\n`;

    // Previous steps
    const currentLesson = this.progressTracker.getCurrentLesson(currentTutorial);
    if (currentLesson) {
      const stepIndex = currentLesson.steps.findIndex(s => s.name === currentStep.name);
      if (stepIndex > 0) {
        const prevStep = currentLesson.steps[stepIndex - 1];
        suggestions += `⬅️ Previous step: ${prevStep.title}\n`;
      }
    }

    // Next steps
    const nextStep = this.progressTracker.getNextStepAfterCompletion(currentTutorial, currentStep);
    if (nextStep) {
      suggestions += `➡️ Next step: ${nextStep.title}\n`;
    }

    // Other tutorials
    const otherTutorials = state.tutorials.filter(t => t.name !== currentTutorial.name);
    if (otherTutorials.length > 0) {
      suggestions += `\n📚 Other tutorials:\n`;
      for (const tutorial of otherTutorials.slice(0, 3)) {
        suggestions += `• ${tutorial.title} (${tutorial.difficulty})\n`;
      }
    }

    return suggestions;
  }
}