import { z } from 'zod';
import { BaseTool, DocumentationFile, SearchResult } from './base-tool.js';

const ExaDocsSchema = z.object({
  paths: z.array(z.string()).optional(),
  category: z.enum(['api', 'concepts', 'guides', 'admin', 'reference']).optional(),
  query: z.array(z.string()).optional()
});

export type ExaDocsArgs = z.infer<typeof ExaDocsSchema>;

export class ExaDocsTool extends BaseTool {
  static readonly schema = ExaDocsSchema;

  async execute(args: ExaDocsArgs): Promise<string> {
    try {
      // If specific paths are requested
      if (args.paths && args.paths.length > 0) {
        const results = this.getDocumentationByPath(args.paths);
        return this.formatResults(results);
      }

      // If category is specified
      if (args.category) {
        const categoryResults = this.getDocumentationByCategory(args.category);
        
        // If also have query, search within category
        if (args.query && args.query.length > 0) {
          const searchResults = this.searchDocumentation(args.query, args.category);
          return this.formatSearchResults(searchResults);
        }
        
        return this.formatResults(categoryResults.slice(0, 10)); // Limit results
      }

      // If query is specified
      if (args.query && args.query.length > 0) {
        const searchResults = this.searchDocumentation(args.query);
        return this.formatSearchResults(searchResults);
      }

      // No specific request - return overview
      return this.getOverview();
    } catch (error) {
      return `Error processing documentation request: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private formatSearchResults(results: SearchResult[]): string {
    if (results.length === 0) {
      return 'No documentation found matching your search query.';
    }

    let output = `# Search Results (${results.length} found)\n\n`;
    
    for (const result of results.slice(0, 5)) { // Limit to top 5 results
      output += `## ${result.title}\n`;
      output += `**Path:** ${result.path}\n`;
      output += `**Relevance:** ${result.relevanceScore}\n`;
      output += `**Matches:** ${result.matches.join(', ')}\n\n`;
      output += `${result.content}\n\n`;
      output += '---\n\n';
    }

    if (results.length > 5) {
      output += `*Showing top 5 results of ${results.length} total matches*\n`;
    }

    return output.trim();
  }

  private getOverview(): string {
    const categories = new Map<string, number>();
    
    for (const [, doc] of this.docs) {
      const mainCategory = doc.category.split('/')[0];
      categories.set(mainCategory, (categories.get(mainCategory) || 0) + 1);
    }

    let output = '# Exa Documentation Overview\n\n';
    output += 'Welcome to the Exa API documentation server. This server provides comprehensive access to Exa\'s documentation.\n\n';
    output += '## Available Categories\n\n';

    for (const [category, count] of categories) {
      output += `- **${category}** (${count} documents)\n`;
    }

    output += '\n## Getting Started\n\n';
    output += 'To access specific documentation:\n';
    output += '- Use `paths` to request specific documentation files\n';
    output += '- Use `category` to browse by category (reference, examples, integrations, etc.)\n';
    output += '- Use `query` to search across all documentation\n\n';

    output += '## Popular Documentation\n\n';
    const popularDocs = [
      'reference/getting-started.md',
      'reference/quickstart.md',
      'reference/search.md',
      'reference/get-contents.md',
      'examples/exa-researcher.md'
    ];

    for (const docPath of popularDocs) {
      const doc = this.docs.get(docPath);
      if (doc) {
        output += `- [${doc.title}](${docPath})\n`;
      }
    }

    return output;
  }

  getApiReference(): DocumentationFile[] {
    return this.getDocumentationByCategory('reference');
  }

  getConcepts(): DocumentationFile[] {
    return this.getDocumentationByCategory('reference').filter(doc => 
      doc.path.includes('how-exa-search-works') || 
      doc.path.includes('the-exa-index') ||
      doc.path.includes('exas-capabilities-explained')
    );
  }

  getGettingStarted(): DocumentationFile[] {
    return this.getDocumentationByPath([
      'reference/getting-started.md',
      'reference/quickstart.md',
      'reference/rag-quickstart.md'
    ]);
  }

  getAuthentication(): DocumentationFile[] {
    return this.getDocumentationByPath([
      'reference/getting-started.md',
      'reference/security.md',
      'reference/setting-up-team.md'
    ]);
  }

  getRateLimits(): DocumentationFile[] {
    return this.getDocumentationByPath(['reference/rate-limits.md']);
  }

  getFAQs(): DocumentationFile[] {
    return this.getDocumentationByPath(['reference/faqs.md']);
  }
}