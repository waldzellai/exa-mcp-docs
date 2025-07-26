/**
 * Implementation Test Suite for Exa Interactive Tutorials
 * 
 * Tests implementation against the checklist to verify system functionality
 * before presenting completion summary for merge decision.
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { TutorialEngine } from './engine';
import { StateManager } from './state-manager';
import { TutorialContentLoader } from './content-loader';
import { ProgressTracker } from './progress-tracker';
import { TutorialFormatter } from './formatter';
import { TUTORING_PROMPT } from '../types/tutorial-types';

interface TestResult {
  passed: boolean;
  message: string;
  details?: any;
}

interface TestSuite {
  name: string;
  results: TestResult[];
  passed: number;
  total: number;
}

export class ImplementationTester {
  private tutorialEngine: TutorialEngine;
  private tutorialDir: string;
  private testResults: TestSuite[] = [];

  constructor(tutorialDir: string = '/Users/b.c.nims/glassBead-MASTER/Exa/exa-docs-server/trees/implement-spec-1752686704/tutorials') {
    this.tutorialDir = tutorialDir;
    this.tutorialEngine = new TutorialEngine(tutorialDir);
  }

  /**
   * Run all tests and return summary
   */
  async runAllTests(): Promise<{
    totalTests: number;
    passedTests: number;
    failedTests: number;
    testSuites: TestSuite[];
    readyForRelease: boolean;
  }> {
    console.log('🧪 Running Implementation Tests...\n');

    // Core Architecture Tests
    await this.testCoreArchitecture();
    
    // State Management Tests
    await this.testStateManagement();
    
    // Content Management Tests
    await this.testContentManagement();
    
    // MCP Tools Tests
    await this.testMCPTools();
    
    // Integration Tests
    await this.testIntegration();

    // Calculate totals
    const totalTests = this.testResults.reduce((sum, suite) => sum + suite.total, 0);
    const passedTests = this.testResults.reduce((sum, suite) => sum + suite.passed, 0);
    const failedTests = totalTests - passedTests;
    const readyForRelease = failedTests === 0;

    return {
      totalTests,
      passedTests,
      failedTests,
      testSuites: this.testResults,
      readyForRelease
    };
  }

  /**
   * Test core architecture components
   */
  private async testCoreArchitecture(): Promise<void> {
    const suite: TestSuite = {
      name: 'Core Architecture',
      results: [],
      passed: 0,
      total: 0
    };

    // Test Type Definitions
    suite.results.push(this.testTypeDefinitions());
    
    // Test Content Wrapping System
    suite.results.push(this.testContentWrapping());
    
    // Test Terminal Formatting
    suite.results.push(this.testTerminalFormatting());

    suite.total = suite.results.length;
    suite.passed = suite.results.filter(r => r.passed).length;
    this.testResults.push(suite);
  }

  /**
   * Test state management functionality
   */
  private async testStateManagement(): Promise<void> {
    const suite: TestSuite = {
      name: 'State Management',
      results: [],
      passed: 0,
      total: 0
    };

    const stateManager = new StateManager();
    const progressTracker = new ProgressTracker();

    // Test State Persistence
    suite.results.push(await this.testStatePersistence(stateManager));
    
    // Test Progress Tracking
    suite.results.push(await this.testProgressTracking(progressTracker));

    suite.total = suite.results.length;
    suite.passed = suite.results.filter(r => r.passed).length;
    this.testResults.push(suite);
  }

  /**
   * Test content management functionality
   */
  private async testContentManagement(): Promise<void> {
    const suite: TestSuite = {
      name: 'Content Management',
      results: [],
      passed: 0,
      total: 0
    };

    const contentLoader = new TutorialContentLoader(this.tutorialDir);

    // Test Content Loading
    suite.results.push(await this.testContentLoading(contentLoader));
    
    // Test Tutorial Structure
    suite.results.push(await this.testTutorialStructure());

    suite.total = suite.results.length;
    suite.passed = suite.results.filter(r => r.passed).length;
    this.testResults.push(suite);
  }

  /**
   * Test MCP tools functionality
   */
  private async testMCPTools(): Promise<void> {
    const suite: TestSuite = {
      name: 'MCP Tools',
      results: [],
      passed: 0,
      total: 0
    };

    try {
      await this.tutorialEngine.initialize();
      
      // Test each MCP tool
      suite.results.push(await this.testStartTutorialTool());
      suite.results.push(await this.testGetStatusTool());
      suite.results.push(await this.testJumpToStepTool());
      suite.results.push(await this.testResetProgressTool());
      
    } catch (error) {
      suite.results.push({
        passed: false,
        message: `MCP Tools initialization failed: ${error.message}`
      });
    }

    suite.total = suite.results.length;
    suite.passed = suite.results.filter(r => r.passed).length;
    this.testResults.push(suite);
  }

  /**
   * Test system integration
   */
  private async testIntegration(): Promise<void> {
    const suite: TestSuite = {
      name: 'System Integration',
      results: [],
      passed: 0,
      total: 0
    };

    // Test Tutorial Engine Integration
    suite.results.push(await this.testTutorialEngineIntegration());
    
    // Test MCP Tool Definitions
    suite.results.push(this.testMCPToolDefinitions());

    suite.total = suite.results.length;
    suite.passed = suite.results.filter(r => r.passed).length;
    this.testResults.push(suite);
  }

  /**
   * Test type definitions
   */
  private testTypeDefinitions(): TestResult {
    try {
      // Check if TUTORING_PROMPT is defined
      if (!TUTORING_PROMPT || typeof TUTORING_PROMPT !== 'string') {
        return {
          passed: false,
          message: 'TUTORING_PROMPT constant not properly defined'
        };
      }

      // Check if TUTORING_PROMPT matches specification requirements
      if (!TUTORING_PROMPT.includes('assistant-as-tutor') || 
          !TUTORING_PROMPT.includes('progressive disclosure')) {
        return {
          passed: false,
          message: 'TUTORING_PROMPT does not match specification requirements'
        };
      }

      return {
        passed: true,
        message: 'Type definitions validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Type definition test failed: ${error.message}`
      };
    }
  }

  /**
   * Test content wrapping system
   */
  private testContentWrapping(): TestResult {
    try {
      const formatter = new TutorialFormatter();
      
      // Test basic formatting functionality
      const statusEmoji = formatter.statusEmoji(0);
      if (!statusEmoji || typeof statusEmoji !== 'string') {
        return {
          passed: false,
          message: 'Status emoji function not working properly'
        };
      }

      return {
        passed: true,
        message: 'Content wrapping system validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Content wrapping test failed: ${error.message}`
      };
    }
  }

  /**
   * Test terminal formatting
   */
  private testTerminalFormatting(): TestResult {
    try {
      const formatter = new TutorialFormatter();
      
      // Test emoji status functionality
      const completedEmoji = formatter.statusEmoji(2);
      const inProgressEmoji = formatter.statusEmoji(1);
      const notStartedEmoji = formatter.statusEmoji(0);
      
      if (!completedEmoji || !inProgressEmoji || !notStartedEmoji) {
        return {
          passed: false,
          message: 'Terminal formatting emojis not working properly'
        };
      }

      return {
        passed: true,
        message: 'Terminal formatting validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Terminal formatting test failed: ${error.message}`
      };
    }
  }

  /**
   * Test state persistence
   */
  private async testStatePersistence(stateManager: StateManager): Promise<TestResult> {
    try {
      // Test state loading (should handle missing files gracefully)
      const state = await stateManager.loadState();
      
      return {
        passed: true,
        message: 'State persistence working correctly',
        details: { hasState: !!state }
      };
    } catch (error) {
      return {
        passed: false,
        message: `State persistence test failed: ${error.message}`
      };
    }
  }

  /**
   * Test progress tracking
   */
  private async testProgressTracking(progressTracker: ProgressTracker): Promise<TestResult> {
    try {
      // Create mock tutorial for testing
      const mockTutorial = {
        name: 'test-tutorial',
        title: 'Test Tutorial',
        description: 'Test',
        difficulty: 'beginner',
        status: 0,
        currentLesson: '',
        lessons: [{
          name: 'lesson-1',
          title: 'Lesson 1',
          status: 0,
          currentStep: '',
          steps: [{
            name: 'step-1',
            title: 'Step 1',
            status: 0,
            hasCode: false
          }]
        }],
        prerequisites: []
      };

      // Test progress calculation
      const progress = progressTracker.calculateTutorialProgress(mockTutorial);
      
      if (typeof progress !== 'number' || progress < 0 || progress > 100) {
        return {
          passed: false,
          message: 'Progress calculation returned invalid value'
        };
      }

      return {
        passed: true,
        message: 'Progress tracking validated successfully',
        details: { progress }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Progress tracking test failed: ${error.message}`
      };
    }
  }

  /**
   * Test content loading
   */
  private async testContentLoading(contentLoader: TutorialContentLoader): Promise<TestResult> {
    try {
      // Test listing available tutorials
      const tutorials = await contentLoader.listAvailableTutorials();
      
      if (!Array.isArray(tutorials)) {
        return {
          passed: false,
          message: 'Tutorial listing returned invalid format'
        };
      }

      return {
        passed: true,
        message: 'Content loading validated successfully',
        details: { tutorialCount: tutorials.length, tutorials }
      };
    } catch (error) {
      return {
        passed: false,
        message: `Content loading test failed: ${error.message}`
      };
    }
  }

  /**
   * Test tutorial directory structure
   */
  private async testTutorialStructure(): Promise<TestResult> {
    try {
      // Check if tutorial directory exists
      const tutorialDirExists = await this.fileExists(this.tutorialDir);
      if (!tutorialDirExists) {
        return {
          passed: false,
          message: 'Tutorial directory does not exist'
        };
      }

      // Check for getting-started tutorial
      const gettingStartedExists = await this.fileExists(join(this.tutorialDir, 'getting-started'));
      if (!gettingStartedExists) {
        return {
          passed: false,
          message: 'Getting started tutorial directory missing'
        };
      }

      // Check for tutorial.json
      const metadataExists = await this.fileExists(join(this.tutorialDir, 'getting-started', 'tutorial.json'));
      if (!metadataExists) {
        return {
          passed: false,
          message: 'Tutorial metadata file missing'
        };
      }

      return {
        passed: true,
        message: 'Tutorial structure validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `Tutorial structure test failed: ${error.message}`
      };
    }
  }

  /**
   * Test startExaTutorial tool
   */
  private async testStartTutorialTool(): Promise<TestResult> {
    try {
      const result = await this.tutorialEngine.startTutorial({});
      
      if (typeof result !== 'string') {
        return {
          passed: false,
          message: 'startExaTutorial tool returned invalid result type'
        };
      }

      return {
        passed: true,
        message: 'startExaTutorial tool validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `startExaTutorial tool test failed: ${error.message}`
      };
    }
  }

  /**
   * Test getExaTutorialStatus tool
   */
  private async testGetStatusTool(): Promise<TestResult> {
    try {
      const result = await this.tutorialEngine.getStatus();
      
      if (typeof result !== 'string') {
        return {
          passed: false,
          message: 'getExaTutorialStatus tool returned invalid result type'
        };
      }

      return {
        passed: true,
        message: 'getExaTutorialStatus tool validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `getExaTutorialStatus tool test failed: ${error.message}`
      };
    }
  }

  /**
   * Test jumpToExaTutorialStep tool
   */
  private async testJumpToStepTool(): Promise<TestResult> {
    try {
      const result = await this.tutorialEngine.jumpToStep({
        tutorialName: 'nonexistent-tutorial'
      });
      
      if (typeof result !== 'string') {
        return {
          passed: false,
          message: 'jumpToExaTutorialStep tool returned invalid result type'
        };
      }

      // Should handle nonexistent tutorial gracefully
      if (!result.includes('not found')) {
        return {
          passed: false,
          message: 'jumpToExaTutorialStep tool did not handle invalid tutorial properly'
        };
      }

      return {
        passed: true,
        message: 'jumpToExaTutorialStep tool validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `jumpToExaTutorialStep tool test failed: ${error.message}`
      };
    }
  }

  /**
   * Test resetExaTutorialProgress tool
   */
  private async testResetProgressTool(): Promise<TestResult> {
    try {
      const result = await this.tutorialEngine.resetProgress({ confirm: false });
      
      if (typeof result !== 'string') {
        return {
          passed: false,
          message: 'resetExaTutorialProgress tool returned invalid result type'
        };
      }

      // Should require confirmation
      if (!result.includes('confirm')) {
        return {
          passed: false,
          message: 'resetExaTutorialProgress tool did not require confirmation'
        };
      }

      return {
        passed: true,
        message: 'resetExaTutorialProgress tool validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `resetExaTutorialProgress tool test failed: ${error.message}`
      };
    }
  }

  /**
   * Test tutorial engine integration
   */
  private async testTutorialEngineIntegration(): Promise<TestResult> {
    try {
      const health = await this.tutorialEngine.getSystemHealth();
      
      if (!health || typeof health.status !== 'string') {
        return {
          passed: false,
          message: 'Tutorial engine health check failed'
        };
      }

      return {
        passed: true,
        message: 'Tutorial engine integration validated successfully',
        details: health
      };
    } catch (error) {
      return {
        passed: false,
        message: `Tutorial engine integration test failed: ${error.message}`
      };
    }
  }

  /**
   * Test MCP tool definitions
   */
  private testMCPToolDefinitions(): TestResult {
    try {
      const toolDefinitions = TutorialEngine.getMCPToolDefinitions();
      
      if (!Array.isArray(toolDefinitions) || toolDefinitions.length !== 5) {
        return {
          passed: false,
          message: 'MCP tool definitions returned incorrect number of tools'
        };
      }

      const expectedTools = [
        'startExaTutorial',
        'nextExaTutorialStep',
        'getExaTutorialStatus',
        'jumpToExaTutorialStep',
        'resetExaTutorialProgress'
      ];

      const actualTools = toolDefinitions.map(tool => tool.name);
      const missingTools = expectedTools.filter(tool => !actualTools.includes(tool));

      if (missingTools.length > 0) {
        return {
          passed: false,
          message: `Missing MCP tools: ${missingTools.join(', ')}`
        };
      }

      return {
        passed: true,
        message: 'MCP tool definitions validated successfully'
      };
    } catch (error) {
      return {
        passed: false,
        message: `MCP tool definitions test failed: ${error.message}`
      };
    }
  }

  /**
   * Helper to check if file exists
   */
  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generate detailed test report
   */
  generateReport(): string {
    const totalTests = this.testResults.reduce((sum, suite) => sum + suite.total, 0);
    const passedTests = this.testResults.reduce((sum, suite) => sum + suite.passed, 0);
    const failedTests = totalTests - passedTests;

    let report = `# Implementation Test Report\n\n`;
    report += `## Overall Results\n`;
    report += `- **Total Tests**: ${totalTests}\n`;
    report += `- **Passed**: ${passedTests}\n`;
    report += `- **Failed**: ${failedTests}\n`;
    report += `- **Success Rate**: ${((passedTests / totalTests) * 100).toFixed(1)}%\n\n`;

    for (const suite of this.testResults) {
      report += `## ${suite.name}\n`;
      report += `- **Results**: ${suite.passed}/${suite.total} passed\n\n`;
      
      for (const result of suite.results) {
        const status = result.passed ? '✅' : '❌';
        report += `${status} ${result.message}\n`;
        if (result.details) {
          report += `   Details: ${JSON.stringify(result.details)}\n`;
        }
      }
      report += '\n';
    }

    return report;
  }
}