/**
 * Unified Exa Documentation Tool
 *
 * A single tool that handles all documentation and tutorial operations with natural language
 * descriptions and simplified parameter structure. This reduces cognitive load compared to
 * having 10+ separate tools.
 */
import { z } from 'zod';
declare const UnifiedExaToolSchema: z.ZodObject<{
    operation: z.ZodEnum<["get_docs", "search_docs", "list_examples", "get_example", "search_examples", "get_integration", "list_integrations", "search_integrations", "get_websets_docs", "search_websets", "get_changelog", "get_latest_changes", "search_changes"]>;
} & {
    docs: z.ZodOptional<z.ZodObject<{
        paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        category: z.ZodOptional<z.ZodEnum<["api", "concepts", "guides", "admin", "reference"]>>;
        query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        paths?: string[] | undefined;
        category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
        query?: string[] | undefined;
    }, {
        paths?: string[] | undefined;
        category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
        query?: string[] | undefined;
    }>>;
    examples: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        useCase: z.ZodOptional<z.ZodEnum<["research", "rag", "news", "analysis", "recruiting", "hallucination-detection"]>>;
        language: z.ZodOptional<z.ZodEnum<["python", "typescript", "javascript"]>>;
        query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        query?: string[] | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
        name?: string | undefined;
    }, {
        query?: string[] | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
        name?: string | undefined;
    }>>;
    integrations: z.ZodOptional<z.ZodObject<{
        platform: z.ZodOptional<z.ZodEnum<["python-sdk", "js-sdk", "typescript-sdk", "langchain", "llamaindex", "crewai", "openai", "vercel", "ibm-watsonx", "openrouter"]>>;
        method: z.ZodOptional<z.ZodString>;
        topic: z.ZodOptional<z.ZodString>;
        query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        query?: string[] | undefined;
        platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
        method?: string | undefined;
        topic?: string | undefined;
    }, {
        query?: string[] | undefined;
        platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
        method?: string | undefined;
        topic?: string | undefined;
    }>>;
    websets: z.ZodOptional<z.ZodObject<{
        feature: z.ZodOptional<z.ZodEnum<["monitors", "webhooks", "enrichments", "imports", "websets", "events", "searches", "items"]>>;
        operation: z.ZodOptional<z.ZodEnum<["create", "update", "delete", "list", "get", "cancel"]>>;
        includeExamples: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
        includeExamples?: boolean | undefined;
    }, {
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
        includeExamples?: boolean | undefined;
    }>>;
    changelog: z.ZodOptional<z.ZodObject<{
        version: z.ZodOptional<z.ZodString>;
        changeType: z.ZodOptional<z.ZodEnum<["breaking", "feature", "fix", "deprecation", "enhancement"]>>;
        dateRange: z.ZodOptional<z.ZodObject<{
            start: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            start?: string | undefined;
            end?: string | undefined;
        }, {
            start?: string | undefined;
            end?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        version?: string | undefined;
        changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    }, {
        version?: string | undefined;
        changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    operation: "get_docs" | "search_docs" | "list_examples" | "get_example" | "search_examples" | "get_integration" | "list_integrations" | "search_integrations" | "get_websets_docs" | "search_websets" | "get_changelog" | "get_latest_changes" | "search_changes";
    examples?: {
        query?: string[] | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
        name?: string | undefined;
    } | undefined;
    integrations?: {
        query?: string[] | undefined;
        platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
        method?: string | undefined;
        topic?: string | undefined;
    } | undefined;
    websets?: {
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
        includeExamples?: boolean | undefined;
    } | undefined;
    docs?: {
        paths?: string[] | undefined;
        category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
        query?: string[] | undefined;
    } | undefined;
    changelog?: {
        version?: string | undefined;
        changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    operation: "get_docs" | "search_docs" | "list_examples" | "get_example" | "search_examples" | "get_integration" | "list_integrations" | "search_integrations" | "get_websets_docs" | "search_websets" | "get_changelog" | "get_latest_changes" | "search_changes";
    examples?: {
        query?: string[] | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
        name?: string | undefined;
    } | undefined;
    integrations?: {
        query?: string[] | undefined;
        platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
        method?: string | undefined;
        topic?: string | undefined;
    } | undefined;
    websets?: {
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
        includeExamples?: boolean | undefined;
    } | undefined;
    docs?: {
        paths?: string[] | undefined;
        category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
        query?: string[] | undefined;
    } | undefined;
    changelog?: {
        version?: string | undefined;
        changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
        dateRange?: {
            start?: string | undefined;
            end?: string | undefined;
        } | undefined;
    } | undefined;
}>;
export declare class UnifiedExaTool {
    private docsTool;
    private examplesTool;
    private integrationsTool;
    private websetsTool;
    private changelogTool;
    constructor();
    private getDocsTool;
    private getExamplesTool;
    private getIntegrationsTool;
    private getWebsetsTool;
    private getChangelogTool;
    static getDefinition(): {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            operation: z.ZodEnum<["get_docs", "search_docs", "list_examples", "get_example", "search_examples", "get_integration", "list_integrations", "search_integrations", "get_websets_docs", "search_websets", "get_changelog", "get_latest_changes", "search_changes"]>;
        } & {
            docs: z.ZodOptional<z.ZodObject<{
                paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                category: z.ZodOptional<z.ZodEnum<["api", "concepts", "guides", "admin", "reference"]>>;
                query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                paths?: string[] | undefined;
                category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
                query?: string[] | undefined;
            }, {
                paths?: string[] | undefined;
                category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
                query?: string[] | undefined;
            }>>;
            examples: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                useCase: z.ZodOptional<z.ZodEnum<["research", "rag", "news", "analysis", "recruiting", "hallucination-detection"]>>;
                language: z.ZodOptional<z.ZodEnum<["python", "typescript", "javascript"]>>;
                query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                query?: string[] | undefined;
                useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
                language?: "python" | "typescript" | "javascript" | undefined;
                name?: string | undefined;
            }, {
                query?: string[] | undefined;
                useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
                language?: "python" | "typescript" | "javascript" | undefined;
                name?: string | undefined;
            }>>;
            integrations: z.ZodOptional<z.ZodObject<{
                platform: z.ZodOptional<z.ZodEnum<["python-sdk", "js-sdk", "typescript-sdk", "langchain", "llamaindex", "crewai", "openai", "vercel", "ibm-watsonx", "openrouter"]>>;
                method: z.ZodOptional<z.ZodString>;
                topic: z.ZodOptional<z.ZodString>;
                query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                query?: string[] | undefined;
                platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
                method?: string | undefined;
                topic?: string | undefined;
            }, {
                query?: string[] | undefined;
                platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
                method?: string | undefined;
                topic?: string | undefined;
            }>>;
            websets: z.ZodOptional<z.ZodObject<{
                feature: z.ZodOptional<z.ZodEnum<["monitors", "webhooks", "enrichments", "imports", "websets", "events", "searches", "items"]>>;
                operation: z.ZodOptional<z.ZodEnum<["create", "update", "delete", "list", "get", "cancel"]>>;
                includeExamples: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
                operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
                includeExamples?: boolean | undefined;
            }, {
                feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
                operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
                includeExamples?: boolean | undefined;
            }>>;
            changelog: z.ZodOptional<z.ZodObject<{
                version: z.ZodOptional<z.ZodString>;
                changeType: z.ZodOptional<z.ZodEnum<["breaking", "feature", "fix", "deprecation", "enhancement"]>>;
                dateRange: z.ZodOptional<z.ZodObject<{
                    start: z.ZodOptional<z.ZodString>;
                    end: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    start?: string | undefined;
                    end?: string | undefined;
                }, {
                    start?: string | undefined;
                    end?: string | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                version?: string | undefined;
                changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
                dateRange?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
            }, {
                version?: string | undefined;
                changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
                dateRange?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            operation: "get_docs" | "search_docs" | "list_examples" | "get_example" | "search_examples" | "get_integration" | "list_integrations" | "search_integrations" | "get_websets_docs" | "search_websets" | "get_changelog" | "get_latest_changes" | "search_changes";
            examples?: {
                query?: string[] | undefined;
                useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
                language?: "python" | "typescript" | "javascript" | undefined;
                name?: string | undefined;
            } | undefined;
            integrations?: {
                query?: string[] | undefined;
                platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
                method?: string | undefined;
                topic?: string | undefined;
            } | undefined;
            websets?: {
                feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
                operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
                includeExamples?: boolean | undefined;
            } | undefined;
            docs?: {
                paths?: string[] | undefined;
                category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
                query?: string[] | undefined;
            } | undefined;
            changelog?: {
                version?: string | undefined;
                changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
                dateRange?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
            } | undefined;
        }, {
            operation: "get_docs" | "search_docs" | "list_examples" | "get_example" | "search_examples" | "get_integration" | "list_integrations" | "search_integrations" | "get_websets_docs" | "search_websets" | "get_changelog" | "get_latest_changes" | "search_changes";
            examples?: {
                query?: string[] | undefined;
                useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
                language?: "python" | "typescript" | "javascript" | undefined;
                name?: string | undefined;
            } | undefined;
            integrations?: {
                query?: string[] | undefined;
                platform?: "python-sdk" | "js-sdk" | "typescript-sdk" | "langchain" | "llamaindex" | "crewai" | "openai" | "vercel" | "ibm-watsonx" | "openrouter" | undefined;
                method?: string | undefined;
                topic?: string | undefined;
            } | undefined;
            websets?: {
                feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
                operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
                includeExamples?: boolean | undefined;
            } | undefined;
            docs?: {
                paths?: string[] | undefined;
                category?: "api" | "concepts" | "guides" | "admin" | "reference" | undefined;
                query?: string[] | undefined;
            } | undefined;
            changelog?: {
                version?: string | undefined;
                changeType?: "feature" | "breaking" | "fix" | "deprecation" | "enhancement" | undefined;
                dateRange?: {
                    start?: string | undefined;
                    end?: string | undefined;
                } | undefined;
            } | undefined;
        }>;
    };
    execute(args: z.infer<typeof UnifiedExaToolSchema>): Promise<string>;
    private handleGetDocs;
    private handleSearchDocs;
    private handleListExamples;
    private handleGetExample;
    private handleSearchExamples;
    private handleGetIntegration;
    private handleListIntegrations;
    private handleSearchIntegrations;
    private handleGetWebsetsDocs;
    private handleSearchWebsets;
    private handleGetChangelog;
    private handleGetLatestChanges;
    private handleSearchChanges;
    private formatError;
    private getOperationHelp;
}
export { UnifiedExaToolSchema };
