export interface ExaDocsConfig {
    docsPath: string;
    cachePath: string;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}
export declare class ConfigManager {
    private static instance;
    private config;
    static getInstance(): ConfigManager;
    loadConfig(): Promise<ExaDocsConfig>;
}
