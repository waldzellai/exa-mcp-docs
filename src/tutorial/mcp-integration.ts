/**
 * MCP Integration for Exa Interactive Tutorials
 * 
 * Integrates the tutorial system with the existing MCP server,
 * adding tutorial tools alongside existing documentation tools.
 */

import { TutorialEngine } from './engine';
import { TutorialError } from '../types/tutorial-types';

/**
 * MCP server integration for tutorial system
 */
export class TutorialMCPIntegration {
  private tutorialEngine: TutorialEngine;
  private isInitialized: boolean = false;

  constructor(tutorialDir: string = 'tutorials') {
    this.tutorialEngine = new TutorialEngine(tutorialDir);
  }

  /**
   * Initialize the tutorial system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      await this.tutorialEngine.initialize();
      this.isInitialized = true;
      console.log('✅ Tutorial system initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize tutorial system:', error.message);
      throw error;
    }
  }

  /**
   * Get all tutorial tool definitions for MCP registration
   */
  getTutorialToolDefinitions() {
    return TutorialEngine.getMCPToolDefinitions();
  }

  /**
   * Handle tutorial tool calls
   */
  async handleTutorialTool(toolName: string, parameters: any): Promise<string> {
    if (!this.isInitialized) {
      throw new TutorialError('Tutorial system not initialized', 'NOT_INITIALIZED');
    }

    return await this.tutorialEngine.handleMCPTool(toolName, parameters);
  }

  /**
   * Check if a tool name is a tutorial tool
   */
  isTutorialTool(toolName: string): boolean {
    const tutorialToolNames = [
      'startExaTutorial',
      'nextExaTutorialStep', 
      'getExaTutorialStatus',
      'jumpToExaTutorialStep',
      'resetExaTutorialProgress'
    ];
    return tutorialToolNames.includes(toolName);
  }

  /**
   * Get tutorial system health
   */
  async getHealth() {
    if (!this.isInitialized) {
      return {
        status: 'not_initialized',
        message: 'Tutorial system not initialized'
      };
    }

    return await this.tutorialEngine.getSystemHealth();
  }

  /**
   * Clean up tutorial system
   */
  async cleanup(): Promise<void> {
    if (this.isInitialized) {
      await this.tutorialEngine.cleanup();
      this.isInitialized = false;
    }
  }
}

/**
 * Factory function to create and initialize tutorial integration
 */
export async function createTutorialIntegration(tutorialDir?: string): Promise<TutorialMCPIntegration> {
  const integration = new TutorialMCPIntegration(tutorialDir);
  await integration.initialize();
  return integration;
}

/**
 * Enhanced MCP server setup with tutorial integration
 */
export function setupTutorialMCPServer(server: any, tutorialIntegration: TutorialMCPIntegration) {
  // Register tutorial tools
  const tutorialTools = tutorialIntegration.getTutorialToolDefinitions();
  
  for (const toolDef of tutorialTools) {
    server.addTool(toolDef, async (params: any) => {
      try {
        return await tutorialIntegration.handleTutorialTool(toolDef.name, params);
      } catch (error) {
        console.error(`Tutorial tool error (${toolDef.name}):`, error);
        return `❌ Error: ${error.message}`;
      }
    });
  }

  // Add tutorial health check endpoint (if server supports it)
  if (server.addHealthCheck) {
    server.addHealthCheck('tutorials', async () => {
      return await tutorialIntegration.getHealth();
    });
  }

  console.log(`📚 Registered ${tutorialTools.length} tutorial tools with MCP server`);
}

/**
 * Middleware to handle tutorial tools in existing MCP setup
 */
export function tutorialToolMiddleware(tutorialIntegration: TutorialMCPIntegration) {
  return async (toolName: string, parameters: any, next: Function) => {
    if (tutorialIntegration.isTutorialTool(toolName)) {
      return await tutorialIntegration.handleTutorialTool(toolName, parameters);
    }
    
    // Pass through to next handler for non-tutorial tools
    return await next();
  };
}

/**
 * Helper to merge tutorial tools with existing tools
 */
export function mergeTutorialTools(existingTools: any[], tutorialIntegration: TutorialMCPIntegration) {
  const tutorialTools = tutorialIntegration.getTutorialToolDefinitions();
  
  // Create tool handlers map
  const toolHandlers = new Map();
  
  // Add existing tools
  for (const tool of existingTools) {
    toolHandlers.set(tool.name, tool);
  }
  
  // Add tutorial tools
  for (const toolDef of tutorialTools) {
    const handler = {
      ...toolDef,
      handler: async (params: any) => {
        return await tutorialIntegration.handleTutorialTool(toolDef.name, params);
      }
    };
    toolHandlers.set(toolDef.name, handler);
  }
  
  return Array.from(toolHandlers.values());
}

/**
 * Configuration for tutorial system
 */
export interface TutorialConfig {
  tutorialDir: string;
  enabled: boolean;
  cacheSize: number;
  maxFileSize: number;
}

export const DEFAULT_TUTORIAL_CONFIG: TutorialConfig = {
  tutorialDir: 'tutorials',
  enabled: true,
  cacheSize: 10,
  maxFileSize: 1024 * 1024 // 1MB
};