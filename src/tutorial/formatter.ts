/**
 * Terminal Formatting System for Exa Interactive Tutorials
 * 
 * Provides emoji-rich, concise formatting optimized for CLI environments.
 * Implements consistent visual hierarchy using emojis and structured text.
 */

import { Tutorial, ProgressStatus, TutorialState } from '../types/tutorial-types';

/**
 * Terminal-optimized tutorial formatter
 */
export class TutorialFormatter {
  /**
   * Returns appropriate emoji for progress status
   */
  static statusEmoji(status: ProgressStatus): '⬜' | '🔶' | '✅' {
    switch (status) {
      case 0: return '⬜'; // not started
      case 1: return '🔶'; // in progress
      case 2: return '✅'; // completed
      default: return '⬜';
    }
  }

  /**
   * Formats tutorial list with progress indicators
   */
  static formatTutorialList(tutorials: Tutorial[]): string {
    return tutorials.map((tutorial, index) => {
      const status = this.statusEmoji(tutorial.status);
      const progress = this.calculateProgressDisplay(tutorial);
      return `${index + 1}. ${status} ${tutorial.title} (${tutorial.difficulty}) - ${progress}`;
    }).join('\n');
  }

  /**
   * Formats step header with lesson and step information
   */
  static formatStepHeader(lesson: string, step: string): string {
    return `📘 Lesson: ${lesson}\n📝 Step: ${step}`;
  }

  /**
   * Formats progress summary for a tutorial
   */
  static formatProgressSummary(tutorial: Tutorial): string {
    const completedSteps = this.countCompletedSteps(tutorial);
    const totalSteps = this.countTotalSteps(tutorial);
    const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    return `Progress: ${completedSteps}/${totalSteps} steps completed (${percentage}%)`;
  }

  /**
   * Provides navigation hints for user
   */
  static navigationHints(): string {
    return "Ready to continue? Ask me to \"move to the next step\"";
  }

  /**
   * Formats welcome message for new users
   */
  static formatWelcomeMessage(tutorials: Tutorial[]): string {
    return `🎓 Welcome to Exa Tutorials!

📚 Available Tutorials:

${this.formatTutorialList(tutorials)}

Which tutorial would you like to start? Just tell me the name or number.`;
  }

  /**
   * Formats tutorial status overview
   */
  static formatStatusOverview(state: TutorialState): string {
    const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
    
    if (!currentTutorial) {
      return `📊 Tutorial Progress

No tutorial currently active.

📚 All Tutorials:
${this.formatTutorialList(state.tutorials)}

Ready to start? Ask me to \"start a tutorial\"`;
    }

    const currentStep = this.findCurrentStep(currentTutorial);
    const stepCount = this.getStepPosition(currentTutorial);
    const totalSteps = this.countTotalSteps(currentTutorial);
    const progress = totalSteps > 0 ? Math.round((stepCount / totalSteps) * 100) : 0;

    return `📊 Tutorial Progress

🎯 Current: ${currentTutorial.title}
📝 Step: ${currentStep?.title || 'None'} (${stepCount}/${totalSteps} steps)
📈 Progress: ${progress}% complete

📚 All Tutorials:
${this.formatTutorialList(state.tutorials)}

Ready to continue? Ask me to \"move to the next step\"`;
  }

  /**
   * Formats step completion celebration
   */
  static formatStepCompletion(
    completedStepTitle: string,
    nextStepTitle: string,
    tutorialTitle: string,
    stepNumber: number,
    totalSteps: number
  ): string {
    return `🎉 Great job completing "${completedStepTitle}"!

📘 Continuing: ${tutorialTitle}
📝 Next Step: ${nextStepTitle} (${stepNumber}/${totalSteps})

[Wrapped step content follows...]`;
  }

  /**
   * Formats tutorial completion celebration
   */
  static formatTutorialCompletion(tutorialTitle: string): string {
    return `🎉 Congratulations! You've completed "${tutorialTitle}"!

🏆 Tutorial Complete! You've mastered the concepts and can now apply them in practice.

Ready to start another tutorial? Ask me to \"start a tutorial\" to see available options.`;
  }

  /**
   * Formats lesson completion message
   */
  static formatLessonCompletion(lessonTitle: string, tutorialTitle: string): string {
    return `🎉 Lesson Complete! You've finished "${lessonTitle}" in ${tutorialTitle}.

📚 Moving to the next lesson...`;
  }

  /**
   * Formats error message for missing tutorial
   */
  static formatTutorialNotFound(requested: string, available: string[]): string {
    return `❌ Tutorial "${requested}" not found.

📚 Available tutorials:
${available.map(name => `- ${name}`).join('\n')}

Try again with one of the available tutorial names.`;
  }

  /**
   * Formats reset confirmation prompt
   */
  static formatResetConfirmation(state: TutorialState): string {
    const completedCount = state.tutorials.filter(t => t.status === 2).length;
    const inProgressCount = state.tutorials.filter(t => t.status === 1).length;
    
    return `⚠️ Reset Tutorial Progress

This will reset ALL tutorial progress:
- ${completedCount} completed tutorials will be reset
- ${inProgressCount} in-progress tutorials will be reset
- All step progress will be lost

Are you sure you want to reset all progress? This cannot be undone.
Call this tool again with \`confirm: true\` to proceed.`;
  }

  /**
   * Formats reset completion message
   */
  static formatResetComplete(): string {
    return `🔄 Tutorial progress has been reset.

All tutorials are now available from the beginning. 
Ask me to \"start a tutorial\" to begin your learning journey!`;
  }

  // Helper methods

  /**
   * Calculates progress display string for a tutorial
   */
  private static calculateProgressDisplay(tutorial: Tutorial): string {
    const completedSteps = this.countCompletedSteps(tutorial);
    const totalSteps = this.countTotalSteps(tutorial);
    
    if (tutorial.status === 2) {
      return 'Completed';
    }
    
    if (tutorial.status === 0) {
      return 'Not started';
    }
    
    return `${completedSteps}/${totalSteps} steps`;
  }

  /**
   * Counts completed steps in a tutorial
   */
  private static countCompletedSteps(tutorial: Tutorial): number {
    return tutorial.lessons.reduce((count, lesson) => {
      return count + lesson.steps.filter(step => step.status === 2).length;
    }, 0);
  }

  /**
   * Counts total steps in a tutorial
   */
  private static countTotalSteps(tutorial: Tutorial): number {
    return tutorial.lessons.reduce((count, lesson) => count + lesson.steps.length, 0);
  }

  /**
   * Finds the current step in a tutorial
   */
  private static findCurrentStep(tutorial: Tutorial) {
    for (const lesson of tutorial.lessons) {
      const currentStep = lesson.steps.find(step => step.status === 1);
      if (currentStep) {
        return currentStep;
      }
    }
    
    // If no step is in progress, find the first incomplete step
    for (const lesson of tutorial.lessons) {
      const nextStep = lesson.steps.find(step => step.status === 0);
      if (nextStep) {
        return nextStep;
      }
    }
    
    return null;
  }

  /**
   * Gets the position of the current step in the tutorial
   */
  private static getStepPosition(tutorial: Tutorial): number {
    let position = 0;
    
    for (const lesson of tutorial.lessons) {
      for (const step of lesson.steps) {
        position++;
        if (step.status === 1) {
          return position;
        }
      }
    }
    
    // If no step is in progress, return position of first incomplete step
    position = 0;
    for (const lesson of tutorial.lessons) {
      for (const step of lesson.steps) {
        position++;
        if (step.status === 0) {
          return position;
        }
      }
    }
    
    return position;
  }
}

/**
 * Utility functions for consistent emoji usage
 */
export class EmojiHelper {
  static readonly PROGRESS = {
    NOT_STARTED: '⬜',
    IN_PROGRESS: '🔶',
    COMPLETED: '✅'
  };

  static readonly TUTORIAL = {
    GRADUATION: '🎓',
    BOOKS: '📚',
    BOOK_OPEN: '📘',
    PENCIL: '📝',
    TARGET: '🎯',
    CHART: '📈',
    TROPHY: '🏆',
    PARTY: '🎉',
    COMPUTER: '💻',
    DOCUMENT: '📖'
  };

  static readonly ACTIONS = {
    WARNING: '⚠️',
    ERROR: '❌',
    REFRESH: '🔄',
    ARROW_RIGHT: '→',
    ARROW_DOWN: '↓'
  };

  /**
   * Gets appropriate emoji for tutorial difficulty
   */
  static getDifficultyEmoji(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  }

  /**
   * Gets appropriate emoji for content type
   */
  static getContentTypeEmoji(hasCode: boolean): string {
    return hasCode ? this.TUTORIAL.COMPUTER : this.TUTORIAL.DOCUMENT;
  }
}