# Tutorial Tools Integration Specification

## Executive Summary

This specification defines the integration of the fully-implemented tutorial system into the main EXA MCP Documentation Server, exposing five interactive tutorial tools to enhance the user learning experience.

## Current State

The EXA server has a complete tutorial system implementation including:
- Tutorial engine with state management
- Content loading and caching
- Progress tracking
- Interactive tools
- MCP integration helpers

However, these tools are not exposed in the main server (`index.ts`).

## Proposed Integration

### Architecture Overview

```
index.ts (Main Server)
    ├── Existing Tools (exaDocs, exaExamples, etc.)
    └── Tutorial Integration
        ├── TutorialMCPIntegration instance
        └── Tutorial Tools (5 new tools)
```

### Implementation Approach

#### Option 1: Direct Integration (Recommended)

Modify `index.ts` to import and integrate tutorial tools directly.

```typescript
// Add imports
import { TutorialMCPIntegration } from './tutorial/mcp-integration.js';
import { StartTutorialTool } from './tools/start-tutorial.js';
import { NextStepTool } from './tools/next-step.js';
import { GetStatusTool } from './tools/get-status.js';
import { JumpToStepTool } from './tools/jump-to-step.js';
import { ResetProgressTool } from './tools/reset-progress.js';

// Initialize tutorial system
const tutorialIntegration = new TutorialMCPIntegration();
await tutorialIntegration.initialize();

// Add tools to list handler
const tutorialTools = [
  StartTutorialTool.getDefinition(),
  NextStepTool.getDefinition(),
  GetStatusTool.getDefinition(),
  JumpToStepTool.getDefinition(),
  ResetProgressTool.getDefinition()
];

// Add to tool execution switch
case 'startExaTutorial':
  result = await tutorialIntegration.handleTutorialTool(name, toolArgs);
  break;
// ... repeat for other tools
```

#### Option 2: Modular Tool Registry

Create a tool registry system for cleaner integration.

```typescript
interface ToolRegistry {
  register(tool: ToolDefinition, handler: ToolHandler): void;
  getTools(): ToolDefinition[];
  execute(name: string, args: any): Promise<string>;
}
```

## Integration Details

### 1. Server Initialization

```typescript
async function main() {
  // Initialize tutorial system before server start
  const tutorialIntegration = new TutorialMCPIntegration();
  try {
    await tutorialIntegration.initialize();
    console.error('Tutorial system initialized');
  } catch (error) {
    console.error('Warning: Tutorial system initialization failed:', error);
    // Continue without tutorials - graceful degradation
  }

  const server = new Server(/* ... */);
  // ... rest of server setup
}
```

### 2. Tool Registration

Add tutorial tools to the ListToolsRequestSchema handler:

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ... existing tools ...
      {
        name: 'startExaTutorial',
        description: 'Start a tutorial or resume from last position. If no tutorial is specified, will show available tutorials or resume the current tutorial.',
        inputSchema: {
          type: 'object',
          properties: {
            tutorialName: {
              type: 'string',
              description: 'Optional: specific tutorial to start. If not provided, will show available tutorials or resume current tutorial.'
            }
          }
        }
      },
      {
        name: 'nextExaTutorialStep',
        description: 'Advance to the next step in the current tutorial. Marks the current step as completed and loads the next step.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'getExaTutorialStatus',
        description: 'Show current tutorial progress, including which tutorials are available, current position, and completion status.',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'jumpToExaTutorialStep',
        description: 'Jump to a specific tutorial, lesson, or step. Use this to navigate directly to any part of the tutorial system.',
        inputSchema: {
          type: 'object',
          properties: {
            tutorialName: {
              type: 'string',
              description: 'Name of the tutorial to jump to'
            },
            lessonName: {
              type: 'string',
              description: 'Optional: specific lesson to jump to'
            },
            stepName: {
              type: 'string',
              description: 'Optional: specific step to jump to'
            }
          },
          required: ['tutorialName']
        }
      },
      {
        name: 'resetExaTutorialProgress',
        description: 'Reset all tutorial progress and start over from the beginning. This action cannot be undone and requires confirmation.',
        inputSchema: {
          type: 'object',
          properties: {
            confirm: {
              type: 'boolean',
              description: 'Set to true to confirm that you want to reset all tutorial progress. This action cannot be undone.'
            }
          }
        }
      }
    ]
  };
});
```

### 3. Tool Execution

Add tutorial tool handling to CallToolRequestSchema:

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: string;
    const toolArgs = args || {};
    
    // Check if it's a tutorial tool
    if (tutorialIntegration.isTutorialTool(name)) {
      result = await tutorialIntegration.handleTutorialTool(name, toolArgs);
      return { content: [{ type: 'text', text: result }] };
    }
    
    // Existing tool handling
    switch (name) {
      case 'exaDocs':
        // ... existing cases ...
    }
  } catch (error) {
    // ... error handling ...
  }
});
```

## Error Handling

### Graceful Degradation
- If tutorial system fails to initialize, log warning but continue
- If tutorial content missing, provide helpful error messages
- Handle file system errors gracefully

### Error Messages
```typescript
const TUTORIAL_ERRORS = {
  NOT_INITIALIZED: 'Tutorial system is not available. Please try restarting the server.',
  CONTENT_NOT_FOUND: 'Tutorial content not found. Please ensure tutorials are properly installed.',
  STATE_CORRUPTED: 'Tutorial progress data corrupted. Use resetExaTutorialProgress to start fresh.'
};
```

## Testing Requirements

### Unit Tests
1. Mock tutorial integration for server tests
2. Test tool registration independently
3. Verify error handling paths

### Integration Tests
1. Start server with tutorial system
2. Execute each tutorial tool
3. Verify state persistence
4. Test error scenarios

### Manual Testing Checklist
- [ ] Server starts with tutorial system initialized
- [ ] All 5 tutorial tools appear in tool list
- [ ] startExaTutorial shows available tutorials
- [ ] Tutorial navigation works correctly
- [ ] Progress persists across restarts
- [ ] Error messages are helpful

## Migration Path

### Phase 1: Basic Integration
1. Add tutorial tool imports
2. Initialize tutorial system
3. Register tools in handlers
4. Basic error handling

### Phase 2: Enhanced Integration
1. Add health checks
2. Implement metrics
3. Add configuration options
4. Enhanced error recovery

### Phase 3: Future Enhancements
1. Tutorial hot-reloading
2. Progress analytics
3. Multi-user support
4. Tutorial versioning

## Configuration

Add tutorial configuration to server:

```typescript
interface ServerConfig {
  // ... existing config ...
  tutorials?: {
    enabled: boolean;
    directory?: string;
    cacheSize?: number;
  };
}
```

## Success Criteria

1. **Tool Visibility**: All 5 tutorial tools visible in MCP tool list
2. **Functionality**: Each tool executes without errors
3. **State Management**: Progress persists correctly
4. **Error Handling**: Graceful handling of missing content
5. **Performance**: No impact on existing tool performance

## Rollback Plan

If integration causes issues:
1. Comment out tutorial initialization
2. Remove tutorial tools from handlers
3. Server continues with original tools only

## Timeline

- **Implementation**: 30 minutes
- **Testing**: 45 minutes
- **Documentation**: 15 minutes

Total: 1.5 hours