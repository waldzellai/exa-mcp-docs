#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { UnifiedExaTool, UnifiedExaToolSchema } from './tools/unified-exa-tool.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Lazy initialization of tools
let unifiedTool: UnifiedExaTool | null = null;

function getUnifiedTool() {
  if (!unifiedTool) {
    unifiedTool = new UnifiedExaTool();
  }
  return unifiedTool;
}

// Main entry point
async function main() {
  const server = new Server(
    {
      name: 'exa-docs-server',
      version: '2.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const toolDefinition = UnifiedExaTool.getDefinition();
    
    // Convert zod schema to JSON Schema format
    const jsonSchema = zodToJsonSchema(UnifiedExaToolSchema, {
      target: 'openApi3',
      $refStrategy: 'none',
    });

    return {
      tools: [
        {
          name: toolDefinition.name,
          description: toolDefinition.description,
          inputSchema: jsonSchema
        }
      ]
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      if (name !== 'exa_docs') {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      // Validate and parse arguments
      const parsedArgs = UnifiedExaToolSchema.parse(args || {});
      const tool = getUnifiedTool();
      const result = await tool.execute(parsedArgs);
      
      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new McpError(ErrorCode.InternalError, `Error executing tool ${name}: ${errorMessage}`);
    }
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Don't write to stderr after connecting - it can interfere with stdio protocol
}

// Run the server
main().catch((error) => {
  // Cannot use console.error in MCP stdio servers - just exit with error code
  process.exit(1);
});