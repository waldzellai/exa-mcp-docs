import * as path from 'path';
import * as os from 'os';
import { PathResolver } from './path-resolver.js';
export class ConfigManager {
    static instance;
    config = null;
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    async loadConfig() {
        if (this.config) {
            return this.config;
        }
        const pathResolver = PathResolver.getInstance();
        const docsPath = await pathResolver.getDocsPath();
        this.config = {
            docsPath,
            cachePath: process.env.EXA_CACHE_PATH || path.join(os.tmpdir(), 'exa-docs-cache'),
            logLevel: process.env.EXA_LOG_LEVEL || 'info'
        };
        return this.config;
    }
}
