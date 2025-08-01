import { z } from 'zod';
import { BaseTool, DocumentationFile } from './base-tool.js';
declare const ExaIntegrationsSchema: z.ZodObject<{
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
}>;
export type ExaIntegrationsArgs = z.infer<typeof ExaIntegrationsSchema>;
export declare class ExaIntegrationsTool extends BaseTool {
    static readonly schema: z.ZodObject<{
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
    }>;
    execute(args: ExaIntegrationsArgs): Promise<string>;
    private getIntegrationsByPlatform;
    private getIntegrationsByTopic;
    private filterByMethod;
    private filterByPlatform;
    private filterIntegrationResults;
    private formatSearchResults;
    private extractPlatform;
    private getIntegrationsOverview;
    private extractDescription;
    getPythonSDK(): DocumentationFile[];
    getTypeScriptSDK(): DocumentationFile[];
    getLangChainIntegration(): DocumentationFile[];
    getLlamaIndexIntegration(): DocumentationFile[];
    getCrewAIIntegration(): DocumentationFile[];
    getOpenAIIntegration(): DocumentationFile[];
}
export {};
