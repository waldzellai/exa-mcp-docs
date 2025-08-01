export interface DocumentationFile {
    path: string;
    content: string;
    title: string;
    category: string;
    lastModified: string;
}
export interface SearchResult {
    path: string;
    title: string;
    content: string;
    relevanceScore: number;
    matches: string[];
}
export declare abstract class BaseTool {
    protected docsPath: string;
    protected docs: Map<string, DocumentationFile>;
    private docsLoaded;
    constructor(docsPath?: string);
    /**
     * Ensures documentation is loaded before any operations that require it.
     * This implements lazy loading to improve build performance.
     */
    protected ensureDocumentationLoaded(): void;
    protected loadDocumentation(): void;
    private loadDocsFromDirectory;
    private extractTitle;
    protected searchDocumentation(query: string[], category?: string): SearchResult[];
    protected getDocumentationByPath(paths: string[]): DocumentationFile[];
    private findSimilarPaths;
    private calculateSimilarity;
    protected truncateContent(content: string, maxLength: number): string;
    protected formatResults(results: DocumentationFile[] | SearchResult[]): string;
    protected getDocumentationByCategory(category: string): DocumentationFile[];
    protected listAvailablePaths(category?: string): string[];
}
