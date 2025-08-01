import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

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

export abstract class BaseTool {
  protected docsPath: string;
  protected docs: Map<string, DocumentationFile> = new Map();
  private docsLoaded: boolean = false;

  constructor(docsPath?: string) {
    if (docsPath) {
      this.docsPath = docsPath;
    } else {
      // Try to resolve the path relative to this file
      try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Go up to the project root and look for .exa-docs
        this.docsPath = path.join(__dirname, '../../../.exa-docs');
      } catch {
        // Fallback to current working directory
        this.docsPath = path.join(process.cwd(), '.exa-docs');
      }
    }
    // Remove eager loading - documentation will be loaded on first use
  }

  /**
   * Ensures documentation is loaded before any operations that require it.
   * This implements lazy loading to improve build performance.
   */
  protected ensureDocumentationLoaded(): void {
    if (!this.docsLoaded) {
      this.loadDocumentation();
      this.docsLoaded = true;
    }
  }

  protected loadDocumentation(): void {
    // Try multiple paths to find the documentation
    const pathsToTry = [
      this.docsPath,
      path.join(process.cwd(), '.exa-docs'),
      '/app/.exa-docs', // Docker/Smithery path
    ];

    // Try to add path relative to this file
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      pathsToTry.push(path.join(__dirname, '../../../.exa-docs'));
    } catch {
      // Ignore if we can't resolve the path
    }

    for (const tryPath of pathsToTry) {
      if (fs.existsSync(tryPath)) {
        this.docsPath = tryPath;
        // Found documentation at tryPath
        this.loadDocsFromDirectory(this.docsPath);
        return;
      }
    }

    // Documentation directory not found - will return empty results
  }

  private loadDocsFromDirectory(dir: string, category: string = ''): void {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        const subCategory = category ? `${category}/${file}` : file;
        this.loadDocsFromDirectory(filePath, subCategory);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(this.docsPath, filePath);
        const title = this.extractTitle(content);
        const docCategory = category || path.dirname(relativePath);
        
        this.docs.set(relativePath, {
          path: relativePath,
          content,
          title,
          category: docCategory,
          lastModified: stat.mtime.toISOString()
        });
      }
    }
  }

  private extractTitle(content: string): string {
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.substring(2).trim();
      }
    }
    return 'Untitled';
  }

  protected searchDocumentation(query: string[], category?: string): SearchResult[] {
    this.ensureDocumentationLoaded();
    const results: SearchResult[] = [];
    
    for (const [filePath, doc] of this.docs) {
      if (category && !doc.category.includes(category)) {
        continue;
      }
      
      const searchableContent = `${doc.title} ${doc.content}`.toLowerCase();
      const matches: string[] = [];
      let relevanceScore = 0;
      
      for (const term of query) {
        const lowerTerm = term.toLowerCase();
        if (searchableContent.includes(lowerTerm)) {
          matches.push(term);
          // Higher score for title matches
          if (doc.title.toLowerCase().includes(lowerTerm)) {
            relevanceScore += 10;
          }
          // Score for content matches
          const contentMatches = (searchableContent.match(new RegExp(lowerTerm, 'g')) || []).length;
          relevanceScore += contentMatches;
        }
      }
      
      if (matches.length > 0) {
        results.push({
          path: filePath,
          title: doc.title,
          content: this.truncateContent(doc.content, 2000),
          relevanceScore,
          matches
        });
      }
    }
    
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  protected getDocumentationByPath(paths: string[]): DocumentationFile[] {
    this.ensureDocumentationLoaded();
    const results: DocumentationFile[] = [];
    
    for (const requestedPath of paths) {
      // Try exact match first
      let found = false;
      for (const [filePath, doc] of this.docs) {
        if (filePath === requestedPath || filePath === `${requestedPath}.md`) {
          results.push(doc);
          found = true;
          break;
        }
      }
      
      // If not found, try fuzzy matching
      if (!found) {
        const fuzzyMatches = this.findSimilarPaths(requestedPath);
        if (fuzzyMatches.length > 0) {
          results.push({
            path: requestedPath,
            content: `Path not found: ${requestedPath}\n\nDid you mean:\n${fuzzyMatches.slice(0, 5).map(p => `- ${p}`).join('\n')}`,
            title: 'Path Not Found',
            category: 'error',
            lastModified: new Date().toISOString()
          });
        }
      }
    }
    
    return results;
  }

  private findSimilarPaths(target: string): string[] {
    this.ensureDocumentationLoaded();
    const allPaths = Array.from(this.docs.keys());
    const similarities = allPaths.map(path => ({
      path,
      score: this.calculateSimilarity(target, path)
    }));
    
    return similarities
      .filter(s => s.score > 0.3)
      .sort((a, b) => b.score - a.score)
      .map(s => s.path);
  }

  private calculateSimilarity(a: string, b: string): number {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    
    // Exact substring match
    if (bLower.includes(aLower)) return 0.9;
    
    // Levenshtein distance-based similarity
    const matrix: number[][] = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(0));
    
    for (let i = 0; i <= a.length; i++) matrix[0]![i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j]![0] = j;
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = aLower[i - 1] === bLower[j - 1] ? 0 : 1;
        matrix[j]![i] = Math.min(
          matrix[j - 1]![i]! + 1,
          matrix[j]![i - 1]! + 1,
          matrix[j - 1]![i - 1]! + cost
        );
      }
    }
    
    const maxLen = Math.max(a.length, b.length);
    return 1 - (matrix[b.length]![a.length]! / maxLen);
  }

  protected truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength);
    const lastNewline = truncated.lastIndexOf('\n');
    
    if (lastNewline > maxLength * 0.8) {
      return truncated.substring(0, lastNewline) + '\n\n*[Content truncated]*';
    }
    
    return truncated + '\n\n*[Content truncated]*';
  }

  protected formatResults(results: DocumentationFile[] | SearchResult[]): string {
    if (results.length === 0) {
      return 'No documentation found matching your query.';
    }
    
    let output = '';
    
    for (const result of results) {
      output += `## ${result.title}\n`;
      output += `**Path:** ${result.path}\n\n`;
      output += `${this.truncateContent(result.content, 2000)}\n\n`;
      output += '---\n\n';
    }
    
    return output.trim();
  }

  protected getDocumentationByCategory(category: string): DocumentationFile[] {
    this.ensureDocumentationLoaded();
    const results: DocumentationFile[] = [];
    
    for (const [, doc] of this.docs) {
      if (doc.category === category || doc.category.startsWith(`${category}/`)) {
        results.push(doc);
      }
    }
    
    return results.sort((a, b) => a.path.localeCompare(b.path));
  }

  protected listAvailablePaths(category?: string): string[] {
    this.ensureDocumentationLoaded();
    const paths: string[] = [];
    
    for (const [filePath, doc] of this.docs) {
      if (!category || doc.category.includes(category)) {
        paths.push(filePath);
      }
    }
    
    return paths.sort();
  }
}