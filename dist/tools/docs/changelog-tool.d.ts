import { z } from 'zod';
import { BaseTool, DocumentationFile } from './base-tool.js';
declare const ExaChangelogSchema: z.ZodObject<{
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
}>;
export type ExaChangelogArgs = z.infer<typeof ExaChangelogSchema>;
export declare class ExaChangelogTool extends BaseTool {
    static readonly schema: z.ZodObject<{
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
    }>;
    execute(args: ExaChangelogArgs): Promise<string>;
    private getChangesByVersion;
    private getChangesByType;
    private getChangesByDateRange;
    private getLatestChanges;
    private extractDate;
    private extractChangeType;
    protected formatResults(results: DocumentationFile[]): string;
    private getChangelogOverview;
    private extractSummary;
    getBreakingChanges(): DocumentationFile[];
    getNewFeatures(): DocumentationFile[];
    getBugFixes(): DocumentationFile[];
    getDeprecations(): DocumentationFile[];
    getEnhancements(): DocumentationFile[];
    getRecentChanges(days?: number): DocumentationFile[];
}
export {};
