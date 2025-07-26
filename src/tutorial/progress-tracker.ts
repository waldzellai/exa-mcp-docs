/**
 * Progress Tracking System for Exa Interactive Tutorials
 * 
 * Provides calculation methods for tutorial progress, step navigation,
 * and completion status across the tutorial hierarchy.
 */

import { Tutorial, TutorialState, Step, Lesson, ProgressTracker as IProgressTracker } from '../types/tutorial-types';

/**
 * Tracks and calculates tutorial progress across all levels
 */
export class ProgressTracker implements IProgressTracker {

  /**
   * Calculates progress percentage for a tutorial
   */
  calculateTutorialProgress(tutorial: Tutorial): number {
    const totalSteps = this.getTotalSteps(tutorial);
    if (totalSteps === 0) return 0;
    
    const completedSteps = this.getCompletedSteps(tutorial);
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Calculates overall progress across all tutorials
   */
  calculateOverallProgress(state: TutorialState): number {
    if (state.tutorials.length === 0) return 0;
    
    const totalSteps = state.tutorials.reduce((sum, tutorial) => sum + this.getTotalSteps(tutorial), 0);
    if (totalSteps === 0) return 0;
    
    const completedSteps = state.tutorials.reduce((sum, tutorial) => sum + this.getCompletedSteps(tutorial), 0);
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Finds the next step to complete in a tutorial
   */
  findNextStep(tutorial: Tutorial): Step | null {
    // First, look for any step that's in progress
    for (const lesson of tutorial.lessons) {
      const inProgressStep = lesson.steps.find(step => step.status === 1);
      if (inProgressStep) {
        return inProgressStep;
      }
    }

    // If no step is in progress, find the first not-started step
    for (const lesson of tutorial.lessons) {
      const nextStep = lesson.steps.find(step => step.status === 0);
      if (nextStep) {
        return nextStep;
      }
    }

    // All steps are complete
    return null;
  }

  /**
   * Finds the next lesson to start in a tutorial
   */
  findNextLesson(tutorial: Tutorial): Lesson | null {
    // Look for first lesson that's not complete
    for (const lesson of tutorial.lessons) {
      if (lesson.status !== 2) {
        return lesson;
      }
    }

    // All lessons are complete
    return null;
  }

  /**
   * Checks if a step is complete
   */
  isStepComplete(step: Step): boolean {
    return step.status === 2;
  }

  /**
   * Checks if a lesson is complete (all steps completed)
   */
  isLessonComplete(lesson: Lesson): boolean {
    return lesson.steps.every(step => step.status === 2);
  }

  /**
   * Checks if a tutorial is complete (all lessons completed)
   */
  isTutorialComplete(tutorial: Tutorial): boolean {
    return tutorial.lessons.every(lesson => this.isLessonComplete(lesson));
  }

  /**
   * Gets the current step in a tutorial
   */
  getCurrentStep(tutorial: Tutorial): Step | null {
    const currentLesson = tutorial.lessons.find(lesson => lesson.name === tutorial.currentLesson);
    if (!currentLesson) {
      return this.findNextStep(tutorial);
    }

    const currentStep = currentLesson.steps.find(step => step.name === currentLesson.currentStep);
    return currentStep || this.findNextStep(tutorial);
  }

  /**
   * Gets the current lesson in a tutorial
   */
  getCurrentLesson(tutorial: Tutorial): Lesson | null {
    const currentLesson = tutorial.lessons.find(lesson => lesson.name === tutorial.currentLesson);
    return currentLesson || this.findNextLesson(tutorial);
  }

  /**
   * Gets step position within a tutorial (1-based)
   */
  getStepPosition(tutorial: Tutorial, targetStep: Step): number {
    let position = 0;
    
    for (const lesson of tutorial.lessons) {
      for (const step of lesson.steps) {
        position++;
        if (step.name === targetStep.name) {
          return position;
        }
      }
    }
    
    return position;
  }

  /**
   * Gets lesson position within a tutorial (1-based)
   */
  getLessonPosition(tutorial: Tutorial, targetLesson: Lesson): number {
    return tutorial.lessons.findIndex(lesson => lesson.name === targetLesson.name) + 1;
  }

  /**
   * Gets step position within a lesson (1-based)
   */
  getStepPositionInLesson(lesson: Lesson, targetStep: Step): number {
    return lesson.steps.findIndex(step => step.name === targetStep.name) + 1;
  }

  /**
   * Checks if a step is the last step in its lesson
   */
  isLastStepInLesson(lesson: Lesson, step: Step): boolean {
    const stepIndex = lesson.steps.findIndex(s => s.name === step.name);
    return stepIndex === lesson.steps.length - 1;
  }

  /**
   * Checks if a lesson is the last lesson in its tutorial
   */
  isLastLessonInTutorial(tutorial: Tutorial, lesson: Lesson): boolean {
    const lessonIndex = tutorial.lessons.findIndex(l => l.name === lesson.name);
    return lessonIndex === tutorial.lessons.length - 1;
  }

  /**
   * Checks if a step is the last step in the entire tutorial
   */
  isLastStepInTutorial(tutorial: Tutorial, step: Step): boolean {
    const lesson = tutorial.lessons.find(l => l.steps.some(s => s.name === step.name));
    if (!lesson) return false;
    
    return this.isLastLessonInTutorial(tutorial, lesson) && this.isLastStepInLesson(lesson, step);
  }

  /**
   * Gets the next step after completing current step
   */
  getNextStepAfterCompletion(tutorial: Tutorial, currentStep: Step): Step | null {
    // Find the lesson containing the current step
    const currentLesson = tutorial.lessons.find(lesson => 
      lesson.steps.some(step => step.name === currentStep.name)
    );
    
    if (!currentLesson) return null;

    // Find current step index in lesson
    const currentStepIndex = currentLesson.steps.findIndex(step => step.name === currentStep.name);
    
    // If there's a next step in the same lesson, return it
    if (currentStepIndex < currentLesson.steps.length - 1) {
      return currentLesson.steps[currentStepIndex + 1];
    }

    // Find next lesson
    const currentLessonIndex = tutorial.lessons.findIndex(lesson => lesson.name === currentLesson.name);
    if (currentLessonIndex < tutorial.lessons.length - 1) {
      const nextLesson = tutorial.lessons[currentLessonIndex + 1];
      return nextLesson.steps.length > 0 ? nextLesson.steps[0] : null;
    }

    // No next step (tutorial complete)
    return null;
  }

  /**
   * Gets tutorial completion statistics
   */
  getTutorialStats(tutorial: Tutorial): {
    totalSteps: number;
    completedSteps: number;
    inProgressSteps: number;
    notStartedSteps: number;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
  } {
    const totalSteps = this.getTotalSteps(tutorial);
    const completedSteps = this.getCompletedSteps(tutorial);
    const inProgressSteps = this.getInProgressSteps(tutorial);
    const notStartedSteps = totalSteps - completedSteps - inProgressSteps;
    
    const totalLessons = tutorial.lessons.length;
    const completedLessons = tutorial.lessons.filter(lesson => this.isLessonComplete(lesson)).length;
    
    return {
      totalSteps,
      completedSteps,
      inProgressSteps,
      notStartedSteps,
      totalLessons,
      completedLessons,
      progressPercentage: this.calculateTutorialProgress(tutorial)
    };
  }

  /**
   * Gets overall statistics for all tutorials
   */
  getOverallStats(state: TutorialState): {
    totalTutorials: number;
    completedTutorials: number;
    inProgressTutorials: number;
    notStartedTutorials: number;
    totalSteps: number;
    completedSteps: number;
    overallProgress: number;
  } {
    const totalTutorials = state.tutorials.length;
    const completedTutorials = state.tutorials.filter(tutorial => this.isTutorialComplete(tutorial)).length;
    const inProgressTutorials = state.tutorials.filter(tutorial => tutorial.status === 1).length;
    const notStartedTutorials = state.tutorials.filter(tutorial => tutorial.status === 0).length;
    
    const totalSteps = state.tutorials.reduce((sum, tutorial) => sum + this.getTotalSteps(tutorial), 0);
    const completedSteps = state.tutorials.reduce((sum, tutorial) => sum + this.getCompletedSteps(tutorial), 0);
    
    return {
      totalTutorials,
      completedTutorials,
      inProgressTutorials,
      notStartedTutorials,
      totalSteps,
      completedSteps,
      overallProgress: this.calculateOverallProgress(state)
    };
  }

  /**
   * Validates tutorial structure and progress consistency
   */
  validateTutorialProgress(tutorial: Tutorial): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check if tutorial status matches lesson statuses
    const allLessonsComplete = tutorial.lessons.every(lesson => this.isLessonComplete(lesson));
    const anyLessonInProgress = tutorial.lessons.some(lesson => lesson.status === 1);
    
    if (allLessonsComplete && tutorial.status !== 2) {
      errors.push('Tutorial should be marked as complete when all lessons are complete');
    }
    
    if (anyLessonInProgress && tutorial.status === 0) {
      errors.push('Tutorial should be marked as in progress when lessons are in progress');
    }

    // Check lesson status consistency
    for (const lesson of tutorial.lessons) {
      const allStepsComplete = lesson.steps.every(step => this.isStepComplete(step));
      const anyStepInProgress = lesson.steps.some(step => step.status === 1);
      
      if (allStepsComplete && lesson.status !== 2) {
        errors.push(`Lesson '${lesson.name}' should be marked as complete when all steps are complete`);
      }
      
      if (anyStepInProgress && lesson.status === 0) {
        errors.push(`Lesson '${lesson.name}' should be marked as in progress when steps are in progress`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Private helper methods

  private getTotalSteps(tutorial: Tutorial): number {
    return tutorial.lessons.reduce((sum, lesson) => sum + lesson.steps.length, 0);
  }

  private getCompletedSteps(tutorial: Tutorial): number {
    return tutorial.lessons.reduce((sum, lesson) => {
      return sum + lesson.steps.filter(step => step.status === 2).length;
    }, 0);
  }

  private getInProgressSteps(tutorial: Tutorial): number {
    return tutorial.lessons.reduce((sum, lesson) => {
      return sum + lesson.steps.filter(step => step.status === 1).length;
    }, 0);
  }
}