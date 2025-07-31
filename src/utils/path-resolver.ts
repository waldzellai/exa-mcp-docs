import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs/promises';

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
    
    const candidates = await this.getPathCandidates();
    
    for (const candidate of candidates) {
      if (await this.isValidDocsPath(candidate)) {
        this.docsPath = candidate;
        console.log(`Found .exa-docs at: ${candidate}`);
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
    
    // 2. Relative to CWD
    candidates.push(path.join(process.cwd(), '.exa-docs'));
    
    // 3. Relative to this file (for development)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    candidates.push(path.join(__dirname, '../../.exa-docs'));
    candidates.push(path.join(__dirname, '../../../.exa-docs'));
    
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
      // Check for package.json
      const hasPackageJson = await this.fileExists(path.join(currentDir, 'package.json'));
      if (hasPackageJson) {
        try {
          const packageJson = await fs.readFile(path.join(currentDir, 'package.json'), 'utf-8');
          const pkg = JSON.parse(packageJson);
          // Check if this is the exa-docs-server package
          if (pkg.name === '@exa/mcp-docs-server') {
            return currentDir;
          }
        } catch {
          // Continue searching
        }
      }
      
      // Check for .git
      const hasGit = await this.fileExists(path.join(currentDir, '.git'));
      if (hasGit) {
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
      const requiredDirs = ['api', 'examples'];
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