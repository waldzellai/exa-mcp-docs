import { z } from 'zod';
import { BaseTool, DocumentationFile } from './base-tool.js';
declare const ExaWebsetsSchema: z.ZodObject<{
    feature: z.ZodOptional<z.ZodEnum<["monitors", "webhooks", "enrichments", "imports", "websets", "events", "searches", "items"]>>;
    operation: z.ZodOptional<z.ZodEnum<["create", "update", "delete", "list", "get", "cancel"]>>;
    includeExamples: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    includeExamples: boolean;
    feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
    operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
}, {
    feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
    operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
    includeExamples?: boolean | undefined;
}>;
export type ExaWebsetsArgs = z.infer<typeof ExaWebsetsSchema>;
export declare class ExaWebsetsTool extends BaseTool {
    static readonly schema: z.ZodObject<{
        feature: z.ZodOptional<z.ZodEnum<["monitors", "webhooks", "enrichments", "imports", "websets", "events", "searches", "items"]>>;
        operation: z.ZodOptional<z.ZodEnum<["create", "update", "delete", "list", "get", "cancel"]>>;
        includeExamples: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        includeExamples: boolean;
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
    }, {
        feature?: "monitors" | "webhooks" | "enrichments" | "imports" | "websets" | "events" | "searches" | "items" | undefined;
        operation?: "create" | "update" | "delete" | "list" | "get" | "cancel" | undefined;
        includeExamples?: boolean | undefined;
    }>;
    execute(args: ExaWebsetsArgs): Promise<string>;
    private getWebsetsByFeature;
    private getWebsetsByOperation;
    private filterByOperation;
    protected formatResults(results: DocumentationFile[], includeExamples?: boolean): string;
    private extractFeature;
    private extractDescription;
    private getWebsetsOverview;
    getMonitors(): DocumentationFile[];
    getWebhooks(): DocumentationFile[];
    getEnrichments(): DocumentationFile[];
    getImports(): DocumentationFile[];
    getWebsets(): DocumentationFile[];
    getEvents(): DocumentationFile[];
    getCreateOperations(): DocumentationFile[];
    getUpdateOperations(): DocumentationFile[];
    getDeleteOperations(): DocumentationFile[];
    getListOperations(): DocumentationFile[];
    getGetOperations(): DocumentationFile[];
    getMonitorOperations(operation: string): DocumentationFile[];
    getWebhookOperations(operation: string): DocumentationFile[];
    getWebsetOperations(operation: string): DocumentationFile[];
}
export {};
