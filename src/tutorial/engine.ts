/**
 * Tutorial Engine - Main orchestration system
 * 
 * Coordinates all tutorial components and provides a unified interface
 * for the MCP tools to interact with the tutorial system.
 */

import { StateManager } from './state-manager';
import { TutorialContentLoader } from './content-loader';
import { ProgressTracker } from './progress-tracker';
import { TutorialFormatter } from './formatter';
import { StartTutorialTool } from '../tools/start-tutorial';
import { NextStepTool } from '../tools/next-step';
import { GetStatusTool } from '../tools/get-status';
import { JumpToStepTool } from '../tools/jump-to-step';
import { ResetProgressTool } from '../tools/reset-progress';
import { 
  TutorialState, 
  Tutorial, 
  TutorialEngine as ITutorialEngine,
  TutorialError,
  StartTutorialParams,
  JumpToStepParams,
  ResetProgressParams
} from '../types/tutorial-types';

/**
 * Main tutorial engine that coordinates all components
 */
export class TutorialEngine implements ITutorialEngine {
  private stateManager: StateManager;
  private contentLoader: TutorialContentLoader;
  private progressTracker: ProgressTracker;
  private formatter: TutorialFormatter;
  
  // MCP Tools
  private startTutorialTool: StartTutorialTool;
  private nextStepTool: NextStepTool;
  private getStatusTool: GetStatusTool;
  private jumpToStepTool: JumpToStepTool;
  private resetProgressTool: ResetProgressTool;

  constructor(tutorialDir: string = 'tutorials') {
    // Initialize core components
    this.stateManager = new StateManager();
    this.contentLoader = new TutorialContentLoader(tutorialDir);
    this.progressTracker = new ProgressTracker();
    this.formatter = new TutorialFormatter();
    
    // Initialize MCP tools
    this.startTutorialTool = new StartTutorialTool();
    this.nextStepTool = new NextStepTool();
    this.getStatusTool = new GetStatusTool();
    this.jumpToStepTool = new JumpToStepTool();
    this.resetProgressTool = new ResetProgressTool();
  }

  /**
   * Initialize the tutorial system
   */
  async initialize(): Promise<void> {
    try {
      // Ensure state directory exists
      await this.stateManager.ensureStateDirectory();
      
      // Load initial state if it exists
      const state = await this.stateManager.loadState();
      if (!state) {
        console.log('No existing tutorial state found - will initialize on first use');
      } else {
        console.log(`Tutorial system initialized with ${state.tutorials.length} tutorials`);
      }
    } catch (error) {
      throw new TutorialError(`Failed to initialize tutorial system: ${error.message}`, 'INIT_ERROR');
    }
  }

  /**
   * Get current tutorial state
   */
  async getState(): Promise<TutorialState | null> {
    return await this.stateManager.loadState();
  }

  /**
   * Start or resume a tutorial
   */
  async startTutorial(params: StartTutorialParams): Promise<string> {
    return await this.startTutorialTool.execute(params);
  }

  /**
   * Advance to next step in current tutorial
   */
  async nextStep(): Promise<string> {
    return await this.nextStepTool.execute();
  }

  /**
   * Get current progress status
   */
  async getStatus(): Promise<string> {
    return await this.getStatusTool.execute();
  }

  /**
   * Jump to specific tutorial/lesson/step
   */
  async jumpToStep(params: JumpToStepParams): Promise<string> {
    return await this.jumpToStepTool.execute(params);
  }

  /**
   * Reset all tutorial progress
   */
  async resetProgress(params: ResetProgressParams): Promise<string> {
    return await this.resetProgressTool.execute(params);
  }

  /**
   * Get available tutorials
   */
  async getAvailableTutorials(): Promise<Tutorial[]> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return [];
    }
    return state.tutorials;
  }

  /**
   * Get tutorial by name
   */
  async getTutorial(name: string): Promise<Tutorial | null> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return null;
    }
    return state.tutorials.find(t => t.name === name) || null;
  }

  /**
   * Get current tutorial
   */
  async getCurrentTutorial(): Promise<Tutorial | null> {
    const state = await this.stateManager.loadState();
    if (!state || !state.currentTutorial) {
      return null;
    }
    return state.tutorials.find(t => t.name === state.currentTutorial) || null;
  }

  /**
   * Get tutorial statistics
   */
  async getStats(): Promise<{
    totalTutorials: number;
    completedTutorials: number;
    inProgressTutorials: number;
    overallProgress: number;
  }> {
    const state = await this.stateManager.loadState();
    if (!state) {
      return {
        totalTutorials: 0,
        completedTutorials: 0,
        inProgressTutorials: 0,
        overallProgress: 0
      };
    }
    
    return this.progressTracker.getOverallStats(state);
  }

  /**
   * Validate tutorial system integrity
   */
  async validateSystem(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check state manager
      const state = await this.stateManager.loadState();
      if (state) {
        // Validate each tutorial
        for (const tutorial of state.tutorials) {
          const validation = this.progressTracker.validateTutorialProgress(tutorial);
          if (!validation.isValid) {
            errors.push(`Tutorial ${tutorial.name}: ${validation.errors.join(', ')}`);
          }
        }
      }

      // Check content loader
      const availableTutorials = await this.contentLoader.listAvailableTutorials();
      if (availableTutorials.length === 0) {
        warnings.push('No tutorials found in tutorial directory');
      }

      // Validate tutorial directory structure
      for (const tutorialName of availableTutorials) {
        const structureCheck = await this.contentLoader.validateTutorialStructure(tutorialName);
        if (!structureCheck.exists) {
          errors.push(`Tutorial ${tutorialName} has invalid structure: ${structureCheck.missingPaths.join(', ')}`);
        }
      }

    } catch (error) {
      errors.push(`System validation error: ${error.message}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Get MCP tool definitions for registration
   */
  static getMCPToolDefinitions() {
    return [
      StartTutorialTool.getDefinition(),
      NextStepTool.getDefinition(),
      GetStatusTool.getDefinition(),
      JumpToStepTool.getDefinition(),
      ResetProgressTool.getDefinition()
    ];
  }

  /**
   * Route MCP tool calls to appropriate handlers
   */
  async handleMCPTool(toolName: string, parameters: any): Promise<string> {
    switch (toolName) {
      case 'startExaTutorial':
        return await this.startTutorial(parameters);
      
      case 'nextExaTutorialStep':
        return await this.nextStep();
      
      case 'getExaTutorialStatus':
        return await this.getStatus();
      
      case 'jumpToExaTutorialStep':
        return await this.jumpToStep(parameters);
      
      case 'resetExaTutorialProgress':
        return await this.resetProgress(parameters);
      
      default:
        throw new TutorialError(`Unknown tool: ${toolName}`, 'UNKNOWN_TOOL');
    }
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    // Clear any caches
    this.contentLoader.clearCache();
    
    // Any other cleanup needed
    console.log('Tutorial engine cleanup completed');
  }

  /**
   * Get system health information
   */
  async getSystemHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    components: {
      stateManager: boolean;
      contentLoader: boolean;
      progressTracker: boolean;
    };
    lastCheck: string;
  }> {
    const health = {
      status: 'healthy' as const,
      components: {
        stateManager: true,
        contentLoader: true,
        progressTracker: true
      },
      lastCheck: new Date().toISOString()
    };

    try {
      // Test state manager
      await this.stateManager.loadState();
    } catch (error) {
      health.components.stateManager = false;
      health.status = 'degraded';
    }

    try {
      // Test content loader
      await this.contentLoader.listAvailableTutorials();
    } catch (error) {
      health.components.contentLoader = false;
      health.status = 'degraded';
    }

    // If multiple components are failing, mark as unhealthy
    const failingComponents = Object.values(health.components).filter(c => !c).length;
    if (failingComponents >= 2) {
      health.status = 'unhealthy';
    }

    return health;
  }
}