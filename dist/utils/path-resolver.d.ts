export declare class PathResolver {
    private static instance;
    private docsPath;
    static getInstance(): PathResolver;
    getDocsPath(): Promise<string>;
    private getPathCandidates;
    private findProjectRoot;
    private isValidDocsPath;
    private fileExists;
}
