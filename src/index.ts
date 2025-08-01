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
import { IntelligentUnifiedExaTool, EnhancedUnifiedExaToolSchema } from './tools/intelligent-unified-tool.js';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Check if intelligent mode is enabled
const INTELLIGENT_MODE = process.env.EXA_INTELLIGENT_MODE === 'true';

// Initialize appropriate tool instance
const unifiedTool = INTELLIGENT_MODE ? new IntelligentUnifiedExaTool() : new UnifiedExaTool();
const toolSchema = INTELLIGENT_MODE ? EnhancedUnifiedExaToolSchema : UnifiedExaToolSchema;

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
    const toolDefinition = INTELLIGENT_MODE 
      ? IntelligentUnifiedExaTool.getEnhancedDefinition()
      : UnifiedExaTool.getDefinition();
    
    // Convert zod schema to JSON Schema format
    const jsonSchema = zodToJsonSchema(toolSchema, {
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
      const validNames = INTELLIGENT_MODE ? ['exa', 'exa_docs'] : ['exa_docs'];
      if (!validNames.includes(name)) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      let result: string;
      
      // Handle natural language queries in intelligent mode
      if (INTELLIGENT_MODE && args && 'query' in args && typeof args.query === 'string' && !('operation' in args)) {
        result = await (unifiedTool as IntelligentUnifiedExaTool).executeNatural(args.query);
      } else {
        // Validate and parse arguments for structured queries
        const parsedArgs = UnifiedExaToolSchema.parse(args || {});
        result = await unifiedTool.execute(parsedArgs);
      }
      
      return { content: [{ type: 'text', text: result }] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new McpError(ErrorCode.InternalError, `Error executing tool ${name}: ${errorMessage}`);
    }
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Exa Documentation MCP Server running on stdio (${INTELLIGENT_MODE ? 'Intelligent' : 'Standard'} mode)`);
}

// Run the server
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});