import { z } from 'zod';
import { BaseTool, DocumentationFile, SearchResult } from './base-tool.js';

const ExaExamplesSchema = z.object({
  example: z.string().optional(),
  useCase: z.enum(['research', 'rag', 'news', 'analysis', 'recruiting', 'hallucination-detection']).optional(),
  language: z.enum(['python', 'typescript', 'javascript']).optional(),
  query: z.array(z.string()).optional()
});

export type ExaExamplesArgs = z.infer<typeof ExaExamplesSchema>;

export class ExaExamplesTool extends BaseTool {
  static readonly schema = ExaExamplesSchema;

  async execute(args: ExaExamplesArgs): Promise<string> {
    try {
      // If specific example is requested
      if (args.example) {
        const result = this.getExampleByName(args.example);
        return this.formatResults([result]);
      }

      // If use case is specified
      if (args.useCase) {
        const results = this.getExamplesByUseCase(args.useCase);
        
        // If also have query, search within use case
        if (args.query && args.query.length > 0) {
          const searchResults = this.searchDocumentation(args.query, 'examples');
          const filteredResults = this.filterByUseCase(searchResults, args.useCase);
          return this.formatSearchResults(filteredResults);
        }
        
        return this.formatResults(results);
      }

      // If language is specified
      if (args.language) {
        const results = this.getExamplesByLanguage(args.language);
        return this.formatResults(results);
      }

      // If query is specified
      if (args.query && args.query.length > 0) {
        const searchResults = this.searchDocumentation(args.query, 'examples');
        return this.formatSearchResults(searchResults);
      }

      // No specific request - return overview
      return this.getExamplesOverview();
    } catch (error) {
      return `Error processing examples request: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  private getExampleByName(name: string): DocumentationFile {
    this.ensureDocumentationLoaded();
    // Try exact match first
    let targetPath = `examples/${name}.md`;
    let doc = this.docs.get(targetPath);
    
    if (doc) return doc;

    // Try fuzzy matching
    const exampleDocs = this.getDocumentationByCategory('examples');
    for (const example of exampleDocs) {
      if (example.path.includes(name) || example.title.toLowerCase().includes(name.toLowerCase())) {
        return example;
      }
    }

    // Not found - return error doc
    return {
      path: `examples/${name}.md`,
      content: `Example not found: ${name}\n\nAvailable examples:\n${this.listAvailableExamples().join('\n')}`,
      title: 'Example Not Found',
      category: 'error',
      lastModified: new Date().toISOString()
    };
  }

  private getExamplesByUseCase(useCase: string): DocumentationFile[] {
    this.ensureDocumentationLoaded();
    const useCaseMap: Record<string, string[]> = {
      'research': ['exa-researcher', 'exa-research', 'company-analyst'],
      'rag': ['exa-rag', 'rag-in-langgraph'],
      'news': ['recent-news-summarizer', 'hacker-news-clone', 'websets-news-monitor'],
      'analysis': ['company-analyst', 'niche-company-finder'],
      'recruiting': ['exa-recruiting-agent', 'job-search'],
      'hallucination-detection': ['hallucination-detector', 'identifying-hallucinations']
    };

    const keywords = useCaseMap[useCase] || [useCase];
    const results: DocumentationFile[] = [];

    for (const [, doc] of this.docs) {
      if (doc.category === 'examples') {
        for (const keyword of keywords) {
          if (doc.path.includes(keyword) || doc.title.toLowerCase().includes(keyword)) {
            results.push(doc);
            break;
          }
        }
      }
    }

    return results;
  }

  private getExamplesByLanguage(language: string): DocumentationFile[] {
    this.ensureDocumentationLoaded();
    const languageMap: Record<string, string[]> = {
      'python': ['python', 'py'],
      'typescript': ['typescript', 'ts'],
      'javascript': ['javascript', 'js']
    };

    const keywords = languageMap[language] || [language];
    const results: DocumentationFile[] = [];

    for (const [, doc] of this.docs) {
      if (doc.category === 'examples') {
        for (const keyword of keywords) {
          if (doc.path.includes(keyword) || doc.content.toLowerCase().includes(keyword)) {
            results.push(doc);
            break;
          }
        }
      }
    }

    return results;
  }

  private filterByUseCase(searchResults: SearchResult[], useCase: string): SearchResult[] {
    const useCaseMap: Record<string, string[]> = {
      'research': ['exa-researcher', 'exa-research', 'company-analyst'],
      'rag': ['exa-rag', 'rag-in-langgraph'],
      'news': ['recent-news-summarizer', 'hacker-news-clone', 'websets-news-monitor'],
      'analysis': ['company-analyst', 'niche-company-finder'],
      'recruiting': ['exa-recruiting-agent', 'job-search'],
      'hallucination-detection': ['hallucination-detector', 'identifying-hallucinations']
    };

    const keywords = useCaseMap[useCase] || [useCase];
    
    return searchResults.filter(result => {
      for (const keyword of keywords) {
        if (result.path.includes(keyword) || result.title.toLowerCase().includes(keyword)) {
          return true;
        }
      }
      return false;
    });
  }

  private formatSearchResults(results: SearchResult[]): string {
    if (results.length === 0) {
      return 'No examples found matching your search query.';
    }

    let output = `# Example Search Results (${results.length} found)\n\n`;
    
    for (const result of results.slice(0, 5)) {
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

  private getExamplesOverview(): string {
    const examples = this.getDocumentationByCategory('examples');
    
    let output = '# Exa Code Examples\n\n';
    output += 'Comprehensive collection of code examples and implementations for Exa API.\n\n';
    
    output += '## Featured Examples\n\n';
    
    const featuredExamples = [
      'exa-researcher',
      'exa-rag',
      'company-analyst',
      'recent-news-summarizer',
      'exa-recruiting-agent'
    ];

    for (const exampleName of featuredExamples) {
      const example = examples.find(e => e.path.includes(exampleName));
      if (example) {
        output += `### ${example.title}\n`;
        output += `**Path:** ${example.path}\n`;
        output += `${this.extractDescription(example.content)}\n\n`;
      }
    }

    output += '## All Examples\n\n';
    for (const example of examples) {
      output += `- [${example.title}](${example.path})\n`;
    }

    output += '\n## Usage\n\n';
    output += 'To access specific examples:\n';
    output += '- Use `example` parameter with the example name\n';
    output += '- Use `useCase` to filter by use case (research, rag, news, etc.)\n';
    output += '- Use `language` to filter by programming language\n';
    output += '- Use `query` to search across all examples\n';

    return output;
  }

  private extractDescription(content: string): string {
    const lines = content.split('\n');
    let inDescription = false;
    let description = '';
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        inDescription = true;
        continue;
      }
      
      if (inDescription) {
        if (line.trim() === '') continue;
        if (line.startsWith('#')) break;
        
        description += line + '\n';
        if (description.length > 200) {
          description = description.substring(0, 200) + '...';
          break;
        }
      }
    }
    
    return description.trim() || 'No description available.';
  }

  private listAvailableExamples(): string[] {
    const examples = this.getDocumentationByCategory('examples');
    return examples.map(e => e.path);
  }

  getResearchExamples(): DocumentationFile[] {
    return this.getExamplesByUseCase('research');
  }

  getRagExamples(): DocumentationFile[] {
    return this.getExamplesByUseCase('rag');
  }

  getNewsExamples(): DocumentationFile[] {
    return this.getExamplesByUseCase('news');
  }

  getAnalysisExamples(): DocumentationFile[] {
    return this.getExamplesByUseCase('analysis');
  }
}