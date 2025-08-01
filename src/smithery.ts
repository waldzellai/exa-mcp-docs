/**
 * Smithery CLI compatible entry point
 * This wraps the existing STDIO server for local development with Smithery CLI
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
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

// Smithery CLI compatible export
export default function ({ sessionId, config }: { sessionId: string; config: any }) {
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

  return server;
}