import { z } from 'zod';
import { BaseTool, DocumentationFile } from './base-tool.js';
declare const ExaExamplesSchema: z.ZodObject<{
    example: z.ZodOptional<z.ZodString>;
    useCase: z.ZodOptional<z.ZodEnum<["research", "rag", "news", "analysis", "recruiting", "hallucination-detection"]>>;
    language: z.ZodOptional<z.ZodEnum<["python", "typescript", "javascript"]>>;
    query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    query?: string[] | undefined;
    example?: string | undefined;
    useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
    language?: "python" | "typescript" | "javascript" | undefined;
}, {
    query?: string[] | undefined;
    example?: string | undefined;
    useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
    language?: "python" | "typescript" | "javascript" | undefined;
}>;
export type ExaExamplesArgs = z.infer<typeof ExaExamplesSchema>;
export declare class ExaExamplesTool extends BaseTool {
    static readonly schema: z.ZodObject<{
        example: z.ZodOptional<z.ZodString>;
        useCase: z.ZodOptional<z.ZodEnum<["research", "rag", "news", "analysis", "recruiting", "hallucination-detection"]>>;
        language: z.ZodOptional<z.ZodEnum<["python", "typescript", "javascript"]>>;
        query: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        query?: string[] | undefined;
        example?: string | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
    }, {
        query?: string[] | undefined;
        example?: string | undefined;
        useCase?: "research" | "rag" | "news" | "analysis" | "recruiting" | "hallucination-detection" | undefined;
        language?: "python" | "typescript" | "javascript" | undefined;
    }>;
    execute(args: ExaExamplesArgs): Promise<string>;
    private getExampleByName;
    private getExamplesByUseCase;
    private getExamplesByLanguage;
    private filterByUseCase;
    private formatSearchResults;
    private getExamplesOverview;
    private extractDescription;
    private listAvailableExamples;
    getResearchExamples(): DocumentationFile[];
    getRagExamples(): DocumentationFile[];
    getNewsExamples(): DocumentationFile[];
    getAnalysisExamples(): DocumentationFile[];
}
export {};
