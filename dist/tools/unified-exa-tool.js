/**
 * Unified Exa Documentation Tool
 *
 * A single tool that handles all documentation and tutorial operations with natural language
 * descriptions and simplified parameter structure. This reduces cognitive load compared to
 * having 10+ separate tools.
 */
import { z } from 'zod';
import { ExaDocsTool } from './docs/docs-tool.js';
import { ExaExamplesTool } from './docs/examples-tool.js';
import { ExaIntegrationsTool } from './docs/integrations-tool.js';
import { ExaWebsetsTool } from './docs/websets-tool.js';
import { ExaChangelogTool } from './docs/changelog-tool.js';
// Operation schemas with progressive disclosure
const BaseOperationSchema = z.object({
    operation: z.enum([
        // Documentation Operations
        "get_docs",
        "search_docs",
        // Example Operations
        "list_examples",
        "get_example",
        "search_examples",
        // Integration Operations
        "get_integration",
        "list_integrations",
        "search_integrations",
        // Websets Operations
        "get_websets_docs",
        "search_websets",
        // Changelog Operations
        "get_changelog",
        "get_latest_changes",
        "search_changes",
    ]).describe("What you want to do")
});
// Documentation Parameters
const DocsParamsSchema = z.object({
    paths: z.array(z.string()).optional().describe("Specific documentation paths to retrieve"),
    category: z.enum(['api', 'concepts', 'guides', 'admin', 'reference']).optional()
        .describe("Filter by documentation category"),
    query: z.array(z.string()).optional().describe("Keywords to search across documentation")
}).optional();
// Examples Parameters
const ExamplesParamsSchema = z.object({
    name: z.string().optional().describe("Specific example name to retrieve"),
    useCase: z.enum(['research', 'rag', 'news', 'analysis', 'recruiting', 'hallucination-detection']).optional()
        .describe("Filter by use case type"),
    language: z.enum(['python', 'typescript', 'javascript']).optional()
        .describe("Filter by programming language"),
    query: z.array(z.string()).optional().describe("Keywords to search within examples")
}).optional();
// Integration Parameters
const IntegrationParamsSchema = z.object({
    platform: z.enum([
        'python-sdk', 'js-sdk', 'typescript-sdk',
        'langchain', 'llamaindex', 'crewai',
        'openai', 'vercel', 'ibm-watsonx', 'openrouter'
    ]).optional().describe("Specific platform or SDK"),
    method: z.string().optional().describe("Specific method or feature"),
    topic: z.string().optional().describe("Integration topic"),
    query: z.array(z.string()).optional().describe("Keywords to search within integrations")
}).optional();
// Websets Parameters
const WebsetsParamsSchema = z.object({
    feature: z.enum([
        'monitors', 'webhooks', 'enrichments', 'imports',
        'websets', 'events', 'searches', 'items'
    ]).optional().describe("Specific Websets feature"),
    operation: z.enum(['create', 'update', 'delete', 'list', 'get', 'cancel']).optional()
        .describe("Specific operation type"),
    includeExamples: z.boolean().optional().describe("Include code examples in response")
}).optional();
// Changelog Parameters
const ChangelogParamsSchema = z.object({
    version: z.string().optional().describe("Specific version or 'latest'"),
    changeType: z.enum(['breaking', 'feature', 'fix', 'deprecation', 'enhancement']).optional()
        .describe("Filter by type of change"),
    dateRange: z.object({
        start: z.string().optional(),
        end: z.string().optional()
    }).optional().describe("Filter changes by date range")
}).optional();
// Combined schema
const UnifiedExaToolSchema = BaseOperationSchema.extend({
    // Operation-specific parameters
    docs: DocsParamsSchema,
    examples: ExamplesParamsSchema,
    integrations: IntegrationParamsSchema,
    websets: WebsetsParamsSchema,
    changelog: ChangelogParamsSchema
});
export class UnifiedExaTool {
    docsTool = null;
    examplesTool = null;
    integrationsTool = null;
    websetsTool = null;
    changelogTool = null;
    constructor() {
        // Lazy initialization - tools will be created when first used
    }
    getDocsTool() {
        if (!this.docsTool) {
            this.docsTool = new ExaDocsTool();
        }
        return this.docsTool;
    }
    getExamplesTool() {
        if (!this.examplesTool) {
            this.examplesTool = new ExaExamplesTool();
        }
        return this.examplesTool;
    }
    getIntegrationsTool() {
        if (!this.integrationsTool) {
            this.integrationsTool = new ExaIntegrationsTool();
        }
        return this.integrationsTool;
    }
    getWebsetsTool() {
        if (!this.websetsTool) {
            this.websetsTool = new ExaWebsetsTool();
        }
        return this.websetsTool;
    }
    getChangelogTool() {
        if (!this.changelogTool) {
            this.changelogTool = new ExaChangelogTool();
        }
        return this.changelogTool;
    }
    static getDefinition() {
        return {
            name: 'exa_docs',
            description: `Access Exa.ai's complete documentation, code examples, and interactive tutorials through a single unified tool. This simplifies usage by providing all documentation operations in one place instead of multiple separate tools.

Available operations:
- Documentation: get_docs, search_docs
- Examples: list_examples, get_example, search_examples  
- Integrations: get_integration, list_integrations, search_integrations
- Websets: get_websets_docs, search_websets
- Changelog: get_changelog, get_latest_changes, search_changes`,
            inputSchema: UnifiedExaToolSchema
        };
    }
    async execute(args) {
        const { operation, docs, examples, integrations, websets, changelog } = args;
        try {
            switch (operation) {
                // Documentation Operations
                case 'get_docs':
                    return await this.handleGetDocs(docs);
                case 'search_docs':
                    return await this.handleSearchDocs(docs);
                // Example Operations
                case 'list_examples':
                    return await this.handleListExamples(examples);
                case 'get_example':
                    return await this.handleGetExample(examples);
                case 'search_examples':
                    return await this.handleSearchExamples(examples);
                // Integration Operations
                case 'get_integration':
                    return await this.handleGetIntegration(integrations);
                case 'list_integrations':
                    return await this.handleListIntegrations(integrations);
                case 'search_integrations':
                    return await this.handleSearchIntegrations(integrations);
                // Websets Operations
                case 'get_websets_docs':
                    return await this.handleGetWebsetsDocs(websets);
                case 'search_websets':
                    return await this.handleSearchWebsets(websets);
                // Changelog Operations
                case 'get_changelog':
                    return await this.handleGetChangelog(changelog);
                case 'get_latest_changes':
                    return await this.handleGetLatestChanges(changelog);
                case 'search_changes':
                    return await this.handleSearchChanges(changelog);
                default:
                    return this.formatError(`Unknown operation: ${operation}`, operation);
            }
        }
        catch (error) {
            return this.formatError(error instanceof Error ? error.message : 'An unknown error occurred', operation);
        }
    }
    // Documentation handlers
    async handleGetDocs(params) {
        return await this.getDocsTool().execute({
            paths: params?.paths,
            category: params?.category,
            query: params?.query
        });
    }
    async handleSearchDocs(params) {
        if (!params?.query || params.query.length === 0) {
            throw new Error("Query keywords are required for searching documentation");
        }
        return await this.getDocsTool().execute({
            query: params.query,
            category: params?.category
        });
    }
    // Example handlers
    async handleListExamples(params) {
        // List examples without specific filters returns all
        return await this.getExamplesTool().execute({
            useCase: params?.useCase,
            language: params?.language
        });
    }
    async handleGetExample(params) {
        if (!params?.name) {
            throw new Error("Example name is required");
        }
        return await this.getExamplesTool().execute({
            example: params.name
        });
    }
    async handleSearchExamples(params) {
        if (!params?.query || params.query.length === 0) {
            throw new Error("Query keywords are required for searching examples");
        }
        return await this.getExamplesTool().execute({
            query: params.query,
            useCase: params?.useCase,
            language: params?.language
        });
    }
    // Integration handlers
    async handleGetIntegration(params) {
        if (!params?.platform) {
            throw new Error("Platform is required to get integration documentation");
        }
        return await this.getIntegrationsTool().execute({
            platform: params.platform,
            method: params?.method,
            topic: params?.topic
        });
    }
    async handleListIntegrations(params) {
        // List all available integrations
        return await this.getIntegrationsTool().execute({});
    }
    async handleSearchIntegrations(params) {
        if (!params?.query || params.query.length === 0) {
            throw new Error("Query keywords are required for searching integrations");
        }
        return await this.getIntegrationsTool().execute({
            query: params.query,
            platform: params?.platform
        });
    }
    // Websets handlers
    async handleGetWebsetsDocs(params) {
        return await this.getWebsetsTool().execute({
            feature: params?.feature,
            operation: params?.operation,
            includeExamples: params?.includeExamples
        });
    }
    async handleSearchWebsets(params) {
        // For websets, we'll interpret search as looking for specific features
        return await this.getWebsetsTool().execute({
            feature: params?.feature,
            operation: params?.operation,
            includeExamples: params?.includeExamples
        });
    }
    // Changelog handlers
    async handleGetChangelog(params) {
        return await this.getChangelogTool().execute({
            version: params?.version,
            changeType: params?.changeType,
            dateRange: params?.dateRange
        });
    }
    async handleGetLatestChanges(params) {
        return await this.getChangelogTool().execute({
            version: 'latest',
            changeType: params?.changeType
        });
    }
    async handleSearchChanges(params) {
        // Changelog tool doesn't have direct search, but we can filter by type
        return await this.getChangelogTool().execute({
            changeType: params?.changeType,
            dateRange: params?.dateRange
        });
    }
    formatError(message, operation) {
        const helpMessages = this.getOperationHelp(operation);
        return JSON.stringify({
            success: false,
            error: message,
            operation,
            help: helpMessages
        }, null, 2);
    }
    getOperationHelp(operation) {
        const helpMap = {
            'get_docs': [
                "Provide paths array for specific documentation files",
                "Or use category to filter by type (api, concepts, guides, admin, reference)",
                "Leave empty to list all available documentation"
            ],
            'search_docs': [
                "Provide query array with keywords to search",
                "Optionally filter by category"
            ],
            'get_example': [
                "Provide name of the specific example to retrieve",
                "Use list_examples first to see available examples"
            ]
        };
        return helpMap[operation] || [
            "Check the operation name and required parameters",
            "Refer to the tool description for available operations"
        ];
    }
}
export { UnifiedExaToolSchema };
