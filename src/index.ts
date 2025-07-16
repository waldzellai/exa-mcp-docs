#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { ExaDocsTool } from './tools/docs-tool.js';
import { ExaExamplesTool } from './tools/examples-tool.js';
import { ExaIntegrationsTool } from './tools/integrations-tool.js';
import { ExaWebsetsTool } from './tools/websets-tool.js';
import { ExaChangelogTool } from './tools/changelog-tool.js';

// Initialize tool instances
const docsTool = new ExaDocsTool();
const examplesTool = new ExaExamplesTool();
const integrationsTool = new ExaIntegrationsTool();
const websetsTool = new ExaWebsetsTool();
const changelogTool = new ExaChangelogTool();

// Main entry point
async function main() {
  const server = new Server(
    {
      name: 'exa-docs-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'exaDocs',
          description: 'Access Exa API documentation, concepts, and guides',
          inputSchema: {
            type: 'object',
            properties: {
              paths: {
                type: 'array',
                items: { type: 'string' },
                description: 'Specific documentation paths'
              },
              category: {
                type: 'string',
                enum: ['api', 'concepts', 'guides', 'admin', 'reference'],
                description: 'Documentation category: api, concepts, guides, admin, reference'
              },
              query: {
                type: 'array',
                items: { type: 'string' },
                description: 'Keywords to search across documentation'
              }
            }
          }
        },
        {
          name: 'exaExamples',
          description: 'Access Exa code examples and implementations',
          inputSchema: {
            type: 'object',
            properties: {
              example: {
                type: 'string',
                description: 'Specific example name'
              },
              useCase: {
                type: 'string',
                enum: ['research', 'rag', 'news', 'analysis', 'recruiting', 'hallucination-detection'],
                description: 'Use case: research, rag, news, analysis, recruiting, hallucination-detection'
              },
              language: {
                type: 'string',
                enum: ['python', 'typescript', 'javascript'],
                description: 'Programming language: python, typescript, javascript'
              },
              query: {
                type: 'array',
                items: { type: 'string' },
                description: 'Search within examples'
              }
            }
          }
        },
        {
          name: 'exaIntegrations',
          description: 'Access Exa SDK documentation and framework integrations',
          inputSchema: {
            type: 'object',
            properties: {
              platform: {
                type: 'string',
                enum: ['python-sdk', 'js-sdk', 'typescript-sdk', 'langchain', 'llamaindex', 'crewai', 'openai', 'vercel', 'ibm-watsonx', 'openrouter'],
                description: 'Platform: python-sdk, js-sdk, typescript-sdk, langchain, llamaindex, crewai, openai, vercel, ibm-watsonx, openrouter'
              },
              method: {
                type: 'string',
                description: 'Specific method or feature'
              },
              topic: {
                type: 'string',
                description: 'Integration topic'
              },
              query: {
                type: 'array',
                items: { type: 'string' },
                description: 'Search within integrations'
              }
            }
          }
        },
        {
          name: 'exaWebsets',
          description: 'Access Exa Websets API documentation and features',
          inputSchema: {
            type: 'object',
            properties: {
              feature: {
                type: 'string',
                enum: ['monitors', 'webhooks', 'enrichments', 'imports', 'websets', 'events', 'searches', 'items'],
                description: 'Feature: monitors, webhooks, enrichments, imports, websets, events, searches, items'
              },
              operation: {
                type: 'string',
                enum: ['create', 'update', 'delete', 'list', 'get', 'cancel'],
                description: 'Operation: create, update, delete, list, get, cancel'
              },
              includeExamples: {
                type: 'boolean',
                description: 'Include code examples',
                default: false
              }
            }
          }
        },
        {
          name: 'exaChangelog',
          description: 'Access Exa version history and API changes',
          inputSchema: {
            type: 'object',
            properties: {
              version: {
                type: 'string',
                description: 'Specific version or "latest"'
              },
              changeType: {
                type: 'string',
                enum: ['breaking', 'feature', 'fix', 'deprecation', 'enhancement'],
                description: 'Change type: breaking, feature, fix, deprecation, enhancement'
              },
              dateRange: {
                type: 'object',
                properties: {
                  start: { type: 'string' },
                  end: { type: 'string' }
                },
                description: 'Date range for filtering changes'
              }
            }
          }
        }
      ]
    };
  });

  // Call tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: string;
      const toolArgs = args || {};
      
      switch (name) {
        case 'exaDocs':
          result = await docsTool.execute(toolArgs as Parameters<typeof docsTool.execute>[0]);
          break;
        case 'exaExamples':
          result = await examplesTool.execute(toolArgs as Parameters<typeof examplesTool.execute>[0]);
          break;
        case 'exaIntegrations':
          result = await integrationsTool.execute(toolArgs as Parameters<typeof integrationsTool.execute>[0]);
          break;
        case 'exaWebsets':
          result = await websetsTool.execute(toolArgs as Parameters<typeof websetsTool.execute>[0]);
          break;
        case 'exaChangelog':
          result = await changelogTool.execute(toolArgs as Parameters<typeof changelogTool.execute>[0]);
          break;
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
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
  console.error('Exa Documentation MCP Server running on stdio');
}

// Run the server
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});