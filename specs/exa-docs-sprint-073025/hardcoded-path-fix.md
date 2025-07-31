# Hardcoded Path Fix - End State Specification

## Overview
The base-tool.ts contains a critical hardcoded absolute path that breaks portability and poses security risks. This fix implements a robust, cross-platform path resolution system.

## Current Problem

```typescript
// In base-tool.ts (CRITICAL ISSUE)
const docsPath = '/Users/b.c.nims/glassBead-MASTER/Exa/exa-docs-server/exa-mcp-docs/.exa-docs';
```

This hardcoded path:
- Only works on one specific machine
- Breaks for all other users
- Exposes internal file structure
- Cannot work in Docker containers
- Fails in CI/CD environments

## Solution Architecture

### 1. Dynamic Path Resolution

```typescript
// path-resolver.ts
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

export class PathResolver {
  private static instance: PathResolver;
  private docsPath: string | null = null;
  
  static getInstance(): PathResolver {
    if (!PathResolver.instance) {
      PathResolver.instance = new PathResolver();
    }
    return PathResolver.instance;
  }
  
  async getDocsPath(): Promise<string> {
    if (this.docsPath) {
      return this.docsPath;
    }
    
    // Resolution priority:
    // 1. Environment variable
    // 2. Relative to project root
    // 3. Relative to current file
    // 4. Search common locations
    
    const candidates = await this.getPathCandidates();
    
    for (const candidate of candidates) {
      if (await this.isValidDocsPath(candidate)) {
        this.docsPath = candidate;
        return candidate;
      }
    }
    
    throw new Error(
      'Could not locate .exa-docs directory. ' +
      'Please set EXA_DOCS_PATH environment variable or ensure .exa-docs exists in the project root.'
    );
  }
  
  private async getPathCandidates(): Promise<string[]> {
    const candidates: string[] = [];
    
    // 1. Environment variable (highest priority)
    if (process.env.EXA_DOCS_PATH) {
      candidates.push(path.resolve(process.env.EXA_DOCS_PATH));
    }
    
    // 2. Relative to CWD (for production)
    candidates.push(path.join(process.cwd(), '.exa-docs'));
    
    // 3. Relative to this file (for development)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    candidates.push(path.join(__dirname, '../../.exa-docs'));
    
    // 4. Common project structures
    const projectRoot = await this.findProjectRoot();
    if (projectRoot) {
      candidates.push(path.join(projectRoot, '.exa-docs'));
      candidates.push(path.join(projectRoot, 'exa-mcp-docs/.exa-docs'));
    }
    
    // 5. Docker/container paths
    candidates.push('/app/.exa-docs');
    candidates.push('/data/.exa-docs');
    
    return [...new Set(candidates)]; // Remove duplicates
  }
  
  private async findProjectRoot(): Promise<string | null> {
    let currentDir = process.cwd();
    
    while (currentDir !== path.parse(currentDir).root) {
      // Check for package.json or .git
      const hasPackageJson = await this.fileExists(path.join(currentDir, 'package.json'));
      const hasGit = await this.fileExists(path.join(currentDir, '.git'));
      
      if (hasPackageJson || hasGit) {
        return currentDir;
      }
      
      currentDir = path.dirname(currentDir);
    }
    
    return null;
  }
  
  private async isValidDocsPath(candidatePath: string): Promise<boolean> {
    try {
      const stats = await fs.stat(candidatePath);
      if (!stats.isDirectory()) {
        return false;
      }
      
      // Verify it contains expected structure
      const requiredDirs = ['api', 'concepts', 'examples'];
      for (const dir of requiredDirs) {
        const dirPath = path.join(candidatePath, dir);
        if (!await this.fileExists(dirPath)) {
          return false;
        }
      }
      
      return true;
    } catch {
      return false;
    }
  }
  
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
```

### 2. Configuration Management

```typescript
// config.ts
export interface ExaDocsConfig {
  docsPath: string;
  cachePath?: string;
  indexPath?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  features?: {
    search?: boolean;
    indexing?: boolean;
    caching?: boolean;
  };
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
    
    // Load from multiple sources
    const config = await this.mergeConfigs([
      await this.loadEnvConfig(),
      await this.loadFileConfig(),
      await this.loadDefaultConfig()
    ]);
    
    // Validate configuration
    this.validateConfig(config);
    
    this.config = config;
    return config;
  }
  
  private async loadEnvConfig(): Promise<Partial<ExaDocsConfig>> {
    return {
      docsPath: process.env.EXA_DOCS_PATH,
      cachePath: process.env.EXA_CACHE_PATH,
      indexPath: process.env.EXA_INDEX_PATH,
      logLevel: process.env.EXA_LOG_LEVEL as any
    };
  }
  
  private async loadFileConfig(): Promise<Partial<ExaDocsConfig>> {
    const configPaths = [
      path.join(process.cwd(), 'exa-docs.config.json'),
      path.join(process.cwd(), '.exa-docs.json'),
      path.join(os.homedir(), '.exa-docs/config.json')
    ];
    
    for (const configPath of configPaths) {
      try {
        const content = await fs.readFile(configPath, 'utf-8');
        return JSON.parse(content);
      } catch {
        // Continue to next path
      }
    }
    
    return {};
  }
  
  private async loadDefaultConfig(): Promise<ExaDocsConfig> {
    const pathResolver = PathResolver.getInstance();
    const docsPath = await pathResolver.getDocsPath();
    
    return {
      docsPath,
      cachePath: path.join(os.tmpdir(), 'exa-docs-cache'),
      indexPath: path.join(process.cwd(), '.exa-docs-index'),
      logLevel: 'info',
      features: {
        search: true,
        indexing: true,
        caching: true
      }
    };
  }
  
  private mergeConfigs(configs: Array<Partial<ExaDocsConfig>>): ExaDocsConfig {
    return configs.reduce((merged, config) => ({
      ...merged,
      ...Object.fromEntries(
        Object.entries(config).filter(([_, v]) => v !== undefined)
      ),
      features: {
        ...merged.features,
        ...config.features
      }
    })) as ExaDocsConfig;
  }
  
  private validateConfig(config: ExaDocsConfig) {
    if (!config.docsPath) {
      throw new Error('docsPath is required in configuration');
    }
    
    if (!path.isAbsolute(config.docsPath)) {
      config.docsPath = path.resolve(config.docsPath);
    }
    
    // Ensure paths exist or can be created
    this.ensurePathExists(config.cachePath!);
    this.ensurePathExists(path.dirname(config.indexPath!));
  }
  
  private ensurePathExists(dirPath: string) {
    try {
      fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.warn(`Could not create directory ${dirPath}:`, error);
    }
  }
}
```

### 3. Updated Base Tool

```typescript
// base-tool.ts - Fixed implementation
import { ExaTool } from '@mastra/mcp';
import { ConfigManager } from './config.js';
import { PathResolver } from './path-resolver.js';

export abstract class BaseExaTool extends ExaTool {
  protected documentationFiles: DocumentationFile[] = [];
  protected config: ExaDocsConfig;
  protected initialized = false;
  
  protected abstract category: string;
  
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    try {
      // Load configuration
      const configManager = ConfigManager.getInstance();
      this.config = await configManager.loadConfig();
      
      // Load documentation
      await this.loadDocumentation();
      
      this.initialized = true;
    } catch (error) {
      throw new Error(
        `Failed to initialize ${this.name}: ${error.message}\n` +
        `Ensure .exa-docs directory exists or set EXA_DOCS_PATH environment variable.`
      );
    }
  }
  
  protected async loadDocumentation(): Promise<void> {
    const categoryPath = path.join(this.config.docsPath, this.category);
    
    try {
      this.documentationFiles = await this.loadDocumentationFromPath(categoryPath);
      
      if (this.documentationFiles.length === 0) {
        console.warn(`No documentation found in ${categoryPath}`);
      } else {
        console.info(`Loaded ${this.documentationFiles.length} files for ${this.name}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to load documentation from ${categoryPath}: ${error.message}`
      );
    }
  }
  
  // Ensure initialization before any operation
  protected async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }
  
  protected async searchDocumentation(
    query: string,
    options?: SearchOptions
  ): Promise<DocumentationFile[]> {
    await this.ensureInitialized();
    // ... rest of search implementation
  }
}
```

### 4. Deployment Configuration

```yaml
# docker-compose.yml
version: '3.8'
services:
  exa-mcp-server:
    build: .
    environment:
      - EXA_DOCS_PATH=/app/docs
      - EXA_CACHE_PATH=/tmp/exa-cache
      - EXA_LOG_LEVEL=info
    volumes:
      - ./docs:/app/docs:ro
      - cache:/tmp/exa-cache
      
volumes:
  cache:
```

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy application files
COPY package*.json ./
COPY dist ./dist
COPY .exa-docs /app/docs

# Set default environment
ENV EXA_DOCS_PATH=/app/docs
ENV NODE_ENV=production

# Install dependencies
RUN npm ci --only=production

# Run as non-root user
USER node

ENTRYPOINT ["node", "dist/index.js"]
```

### 5. Development Setup

```json
// .env.example
EXA_DOCS_PATH=./.exa-docs
EXA_CACHE_PATH=./cache
EXA_INDEX_PATH=./.exa-docs-index
EXA_LOG_LEVEL=debug
```

```json
// exa-docs.config.json (optional)
{
  "docsPath": "./.exa-docs",
  "cachePath": "./cache",
  "logLevel": "info",
  "features": {
    "search": true,
    "indexing": true,
    "caching": true
  }
}
```

## Benefits

### Before
- Works only on one machine
- Breaks for all other developers
- Cannot deploy to production
- Security risk (exposes file paths)
- No configuration options

### After
- Works on any machine/OS
- Configurable via environment
- Docker/container ready
- Secure (no hardcoded paths)
- Multiple configuration options
- Clear error messages
- Graceful fallbacks

## Migration Guide

1. **Remove hardcoded path** from base-tool.ts
2. **Add path-resolver.ts** and **config.ts**
3. **Update base-tool.ts** to use PathResolver
4. **Add .env.example** for developers
5. **Update README** with configuration instructions
6. **Test on different platforms** (Windows, Mac, Linux)

## Testing

```typescript
describe('PathResolver', () => {
  let originalEnv: NodeJS.ProcessEnv;
  
  beforeEach(() => {
    originalEnv = { ...process.env };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
  
  it('should use environment variable when set', async () => {
    process.env.EXA_DOCS_PATH = '/custom/docs/path';
    
    const resolver = PathResolver.getInstance();
    const docsPath = await resolver.getDocsPath();
    
    expect(docsPath).toBe('/custom/docs/path');
  });
  
  it('should find docs relative to project root', async () => {
    delete process.env.EXA_DOCS_PATH;
    
    const resolver = PathResolver.getInstance();
    const docsPath = await resolver.getDocsPath();
    
    expect(docsPath).toContain('.exa-docs');
    expect(await fs.stat(docsPath)).toBeTruthy();
  });
  
  it('should throw clear error when docs not found', async () => {
    delete process.env.EXA_DOCS_PATH;
    jest.spyOn(fs, 'stat').mockRejectedValue(new Error('Not found'));
    
    const resolver = PathResolver.getInstance();
    
    await expect(resolver.getDocsPath()).rejects.toThrow(
      'Could not locate .exa-docs directory'
    );
  });
});
```

## Documentation Update

```markdown
# Configuration

The Exa MCP Documentation Server can be configured through:

1. **Environment Variables** (recommended for production)
   ```bash
   export EXA_DOCS_PATH=/path/to/.exa-docs
   export EXA_CACHE_PATH=/tmp/exa-cache
   export EXA_LOG_LEVEL=info
   ```

2. **Configuration File** (optional)
   Create `exa-docs.config.json` in your project root:
   ```json
   {
     "docsPath": "./.exa-docs",
     "logLevel": "debug"
   }
   ```

3. **Default Behavior**
   If no configuration is provided, the server will:
   - Search for `.exa-docs` in the current directory
   - Search in the project root (where package.json exists)
   - Use system temp directory for cache

## Docker Usage

```bash
docker run -v /my/docs:/app/docs -e EXA_DOCS_PATH=/app/docs exa-mcp-server
```
```