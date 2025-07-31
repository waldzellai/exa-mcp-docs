import * as path from 'path';
import * as os from 'os';
import { PathResolver } from './path-resolver.js';

export interface ExaDocsConfig {
  docsPath: string;
  cachePath: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: ExaDocsConfig | null = null;
  
  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
  
  async loadConfig(): Promise<ExaDocsConfig> {
    if (this.config) {
      return this.config;
    }
    
    const pathResolver = PathResolver.getInstance();
    const docsPath = await pathResolver.getDocsPath();
    
    this.config = {
      docsPath,
      cachePath: process.env.EXA_CACHE_PATH || path.join(os.tmpdir(), 'exa-docs-cache'),
      logLevel: (process.env.EXA_LOG_LEVEL as any) || 'info'
    };
    
    return this.config;
  }
}