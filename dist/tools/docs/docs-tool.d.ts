import { z } from 'zod';
import { BaseTool, DocumentationFile } from './base-tool.js';
declare const ExaDocsSchema: z.ZodObject<{
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
}>;
export type ExaDocsArgs = z.infer<typeof ExaDocsSchema>;
export declare class ExaDocsTool extends BaseTool {
    static readonly schema: z.ZodObject<{
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
    }>;
    execute(args: ExaDocsArgs): Promise<string>;
    private formatSearchResults;
    private getOverview;
    getApiReference(): DocumentationFile[];
    getConcepts(): DocumentationFile[];
    getGettingStarted(): DocumentationFile[];
    getAuthentication(): DocumentationFile[];
    getRateLimits(): DocumentationFile[];
    getFAQs(): DocumentationFile[];
}
export {};
