/**
 * getExaTutorialStatus MCP Tool Implementation
 * 
 * Shows current tutorial progress and available navigation options.
 */

import { TutorialFormatter } from '../tutorial/formatter';
import { StateManager } from '../tutorial/state-manager';
import { ProgressTracker } from '../tutorial/progress-tracker';
import { TutorialState } from '../types/tutorial-types';

export class GetStatusTool {
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
      name: 'getExaTutorialStatus',
      description: 'Show current tutorial progress and available navigation options.',
      inputSchema: {
        type: 'object',
        properties: {}
      }
    };
  }

  /**
   * Executes the get status tool
   */
  async execute(): Promise<string> {
    try {
      // Load current state
      const state = await this.stateManager.loadState();
      if (!state) {
        return `📚 No tutorial state found.

Welcome to Exa Tutorials! Use the startExaTutorial tool to begin your learning journey.`;
      }

      // If no tutorials available
      if (state.tutorials.length === 0) {
        return `📚 No tutorials available.

Please check your tutorial directory and ensure tutorial content is properly set up.`;
      }

      // Generate status overview
      return this.generateStatusOverview(state);
    } catch (error) {
      return `❌ Error getting tutorial status: ${error.message}`;
    }
  }

  /**
   * Generates comprehensive status overview
   */
  private generateStatusOverview(state: TutorialState): string {
    const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
    
    // Base status information
    let statusOutput = `📊 Tutorial Progress\n\n`;

    // Current tutorial information
    if (currentTutorial) {
      const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
      const currentLesson = this.progressTracker.getCurrentLesson(currentTutorial);
      
      if (currentStep && currentLesson) {
        const stepPosition = this.progressTracker.getStepPosition(currentTutorial, currentStep);
        const totalSteps = this.progressTracker.getTotalSteps(currentTutorial);
        const progress = this.progressTracker.calculateTutorialProgress(currentTutorial);
        
        statusOutput += `🎯 Current: ${currentTutorial.title}\n`;
        statusOutput += `📘 Lesson: ${currentLesson.title}\n`;
        statusOutput += `📝 Step: ${currentStep.title} (${stepPosition}/${totalSteps} steps)\n`;
        statusOutput += `📈 Progress: ${progress}% complete\n\n`;
      } else {
        statusOutput += `🎯 Current: ${currentTutorial.title}\n`;
        statusOutput += `📝 Status: ${this.getTutorialStatusText(currentTutorial.status)}\n\n`;
      }
    } else {
      statusOutput += `🎯 Current: No tutorial active\n\n`;
    }

    // All tutorials overview
    statusOutput += `📚 All Tutorials:\n`;
    statusOutput += TutorialFormatter.formatTutorialList(state.tutorials);
    statusOutput += '\n\n';

    // Overall statistics
    const stats = this.progressTracker.getOverallStats(state);
    statusOutput += `📊 Overall Statistics:\n`;
    statusOutput += `• Total Tutorials: ${stats.totalTutorials}\n`;
    statusOutput += `• Completed: ${stats.completedTutorials}\n`;
    statusOutput += `• In Progress: ${stats.inProgressTutorials}\n`;
    statusOutput += `• Not Started: ${stats.notStartedTutorials}\n`;
    statusOutput += `• Overall Progress: ${stats.overallProgress}%\n\n`;

    // Navigation suggestions
    statusOutput += this.generateNavigationSuggestions(state, currentTutorial);

    return statusOutput;
  }

  /**
   * Gets tutorial status as human-readable text
   */
  private getTutorialStatusText(status: number): string {
    switch (status) {
      case 0: return 'Not started';
      case 1: return 'In progress';
      case 2: return 'Completed';
      default: return 'Unknown';
    }
  }

  /**
   * Gets total steps across all tutorials
   */
  private getTotalSteps(tutorial: any): number {
    return tutorial.lessons.reduce((total: number, lesson: any) => total + lesson.steps.length, 0);
  }

  /**
   * Generates navigation suggestions based on current state
   */
  private generateNavigationSuggestions(state: TutorialState, currentTutorial: any): string {
    let suggestions = `🧭 What would you like to do?\n\n`;

    if (currentTutorial) {
      const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
      
      if (currentStep) {
        suggestions += `• Continue current tutorial: Ask me to "move to the next step"\n`;
        suggestions += `• Get tutorial status: You're here! 📍\n`;
        suggestions += `• Jump to different step: Use jumpToExaTutorialStep\n`;
        suggestions += `• Switch tutorials: Use startExaTutorial with different tutorial\n`;
      } else if (this.progressTracker.isTutorialComplete(currentTutorial)) {
        suggestions += `• Start new tutorial: Use startExaTutorial\n`;
        suggestions += `• Review completed tutorial: Use jumpToExaTutorialStep\n`;
      }
    } else {
      suggestions += `• Start a tutorial: Use startExaTutorial\n`;
      suggestions += `• Browse available tutorials: Use startExaTutorial (without parameters)\n`;
    }

    // Additional options
    suggestions += `• Reset all progress: Use resetExaTutorialProgress\n`;
    suggestions += `• View detailed statistics: You're seeing them above! 📊\n`;

    return suggestions;
  }

  /**
   * Gets detailed statistics for a specific tutorial
   */
  async getTutorialDetails(tutorialName: string): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    const tutorial = state.tutorials.find(t => t.name === tutorialName);
    if (!tutorial) {
      return `Tutorial '${tutorialName}' not found.`;
    }

    const stats = this.progressTracker.getTutorialStats(tutorial);
    
    let details = `📘 ${tutorial.title} Details\n\n`;
    details += `📊 Progress: ${stats.progressPercentage}%\n`;
    details += `📚 Lessons: ${stats.completedLessons}/${stats.totalLessons} completed\n`;
    details += `📝 Steps: ${stats.completedSteps}/${stats.totalSteps} completed\n`;
    details += `🎯 Difficulty: ${tutorial.difficulty}\n\n`;

    if (tutorial.description) {
      details += `📋 Description: ${tutorial.description}\n\n`;
    }

    if (tutorial.prerequisites.length > 0) {
      details += `📚 Prerequisites: ${tutorial.prerequisites.join(', ')}\n\n`;
    }

    // Lesson breakdown
    details += `📖 Lessons:\n`;
    for (let i = 0; i < tutorial.lessons.length; i++) {
      const lesson = tutorial.lessons[i];
      const lessonComplete = this.progressTracker.isLessonComplete(lesson);
      const emoji = lessonComplete ? '✅' : (lesson.status === 1 ? '🔶' : '⬜');
      details += `${i + 1}. ${emoji} ${lesson.title} (${lesson.steps.length} steps)\n`;
    }

    return details;
  }

  /**
   * Gets quick status summary
   */
  async getQuickStatus(): Promise<string> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return 'No tutorial state found.';
    }

    const currentTutorial = state.tutorials.find(t => t.name === state.currentTutorial);
    if (!currentTutorial) {
      return 'No tutorial currently active.';
    }

    const progress = this.progressTracker.calculateTutorialProgress(currentTutorial);
    const currentStep = this.progressTracker.getCurrentStep(currentTutorial);
    
    if (currentStep) {
      return `📊 ${currentTutorial.title}: ${progress}% complete, currently on "${currentStep.title}"`;
    } else {
      return `📊 ${currentTutorial.title}: ${progress}% complete`;
    }
  }
}