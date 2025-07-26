/**
 * resetExaTutorialProgress MCP Tool Implementation
 * 
 * Resets all tutorial progress with confirmation dialog.
 * Shows progress summary before reset.
 */

import { TutorialFormatter } from '../tutorial/formatter';
import { StateManager } from '../tutorial/state-manager';
import { ProgressTracker } from '../tutorial/progress-tracker';
import { ResetProgressParams, TutorialState } from '../types/tutorial-types';

export class ResetProgressTool {
  private stateManager: StateManager;
  private progressTracker: ProgressTracker;

  constructor() {
    this.stateManager = new StateManager();
    this.progressTracker = new ProgressTracker();
  }

  /**
   * MCP tool definition
   */
  static getDefinition() {
    return {
      name: 'resetExaTutorialProgress',
      description: 'Reset all tutorial progress. This action cannot be undone and requires confirmation.',
      inputSchema: {
        type: 'object',
        properties: {
          confirm: {
            type: 'boolean',
            description: 'Set to true to confirm that you want to reset all tutorial progress.'
          }
        },
        required: ['confirm']
      }
    };
  }

  /**
   * Executes the reset progress tool
   */
  async execute(params: ResetProgressParams): Promise<string> {
    try {
      // Load current state
      const state = await this.stateManager.loadState();
      if (!state) {
        return `📚 No tutorial state found. There's nothing to reset.`;
      }

      // If no confirmation, show progress summary and request confirmation
      if (!params.confirm) {
        return this.showProgressSummaryAndConfirmation(state);
      }

      // Perform reset
      return await this.performReset(state);
    } catch (error) {
      return `❌ Error resetting tutorial progress: ${error.message}`;
    }
  }

  /**
   * Shows progress summary and asks for confirmation
   */
  private showProgressSummaryAndConfirmation(state: TutorialState): string {
    const stats = this.progressTracker.getOverallStats(state);
    const hasProgress = stats.completedTutorials > 0 || stats.inProgressTutorials > 0;

    let summary = `⚠️ Reset All Tutorial Progress\n\n`;
    
    if (!hasProgress) {
      summary += `📚 You don't have any tutorial progress to reset.\n\n`;
      summary += `All tutorials are currently marked as "Not Started".`;
      return summary;
    }

    summary += `📊 Current Progress Summary:\n`;
    summary += `• Total Tutorials: ${stats.totalTutorials}\n`;
    summary += `• Completed: ${stats.completedTutorials}\n`;
    summary += `• In Progress: ${stats.inProgressTutorials}\n`;
    summary += `• Not Started: ${stats.notStartedTutorials}\n`;
    summary += `• Overall Progress: ${stats.overallProgress}%\n\n`;

    // Show detailed progress for each tutorial
    summary += `📚 Tutorial Details:\n`;
    for (const tutorial of state.tutorials) {
      const tutorialStats = this.progressTracker.getTutorialStats(tutorial);
      const statusEmoji = TutorialFormatter.statusEmoji(tutorial.status);
      summary += `${statusEmoji} ${tutorial.title}: ${tutorialStats.progressPercentage}% (${tutorialStats.completedSteps}/${tutorialStats.totalSteps} steps)\n`;
    }

    summary += `\n⚠️ WARNING: This action will:\n`;
    summary += `• Reset all tutorial progress to "Not Started"\n`;
    summary += `• Clear all step completion history\n`;
    summary += `• Remove current tutorial position\n`;
    summary += `• This action CANNOT be undone\n\n`;

    summary += `🔄 To proceed with the reset, call this tool again with:\n`;
    summary += `resetExaTutorialProgress({ confirm: true })\n\n`;

    summary += `❌ To cancel, simply don't call the tool again.`;

    return summary;
  }

  /**
   * Performs the actual reset operation
   */
  private async performReset(state: TutorialState): Promise<string> {
    // Get progress summary before reset
    const stats = this.progressTracker.getOverallStats(state);
    const hadProgress = stats.completedTutorials > 0 || stats.inProgressTutorials > 0;

    if (!hadProgress) {
      return `📚 No progress found to reset. All tutorials are already marked as "Not Started".`;
    }

    // Reset all tutorial progress
    const resetState: TutorialState = {
      ...state,
      currentTutorial: '',
      tutorials: state.tutorials.map(tutorial => ({
        ...tutorial,
        status: 0, // not started
        currentLesson: '',
        lessons: tutorial.lessons.map(lesson => ({
          ...lesson,
          status: 0, // not started
          currentStep: '',
          steps: lesson.steps.map(step => ({
            ...step,
            status: 0 // not started
          }))
        }))
      })),
      lastAccessed: new Date().toISOString()
    };

    // Save reset state
    await this.stateManager.saveState(resetState);

    // Generate success message
    let successMessage = `✅ Tutorial progress has been reset successfully!\n\n`;
    
    successMessage += `📊 Previous Progress (now cleared):\n`;
    successMessage += `• Completed Tutorials: ${stats.completedTutorials}\n`;
    successMessage += `• In Progress Tutorials: ${stats.inProgressTutorials}\n`;
    successMessage += `• Overall Progress: ${stats.overallProgress}%\n\n`;

    successMessage += `🎓 Fresh Start:\n`;
    successMessage += `• All ${stats.totalTutorials} tutorials are now marked as "Not Started"\n`;
    successMessage += `• All step completion history has been cleared\n`;
    successMessage += `• No current tutorial is active\n\n`;

    successMessage += `🚀 Ready to begin your learning journey again!\n`;
    successMessage += `Use startExaTutorial to explore available tutorials and start fresh.`;

    return successMessage;
  }

  /**
   * Shows available tutorials after reset
   */
  private async showAvailableTutorialsAfterReset(): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    return `📚 Available Tutorials (all reset):\n\n` +
           TutorialFormatter.formatTutorialList(state.tutorials) +
           `\n\nUse startExaTutorial to begin a tutorial.`;
  }

  /**
   * Validates reset parameters
   */
  private validateResetParams(params: ResetProgressParams): { isValid: boolean; error?: string } {
    if (typeof params.confirm !== 'boolean') {
      return { isValid: false, error: 'Confirmation parameter must be a boolean value.' };
    }

    return { isValid: true };
  }

  /**
   * Gets reset warning message
   */
  static getResetWarning(): string {
    return `⚠️ WARNING: Resetting tutorial progress will permanently delete all your learning progress.
    
This action will:
• Mark all tutorials as "Not Started"  
• Clear all step completion history
• Remove current tutorial position
• Cannot be undone

Please make sure you want to proceed before confirming.`;
  }

  /**
   * Checks if user has any progress to reset
   */
  async hasProgressToReset(): Promise<boolean> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return false;
    }

    const stats = this.progressTracker.getOverallStats(state);
    return stats.completedTutorials > 0 || stats.inProgressTutorials > 0;
  }

  /**
   * Gets backup data before reset (for potential recovery)
   */
  async getBackupData(): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    return JSON.stringify(state, null, 2);
  }
}