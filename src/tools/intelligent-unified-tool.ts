/**
 * Intelligent Unified Exa Documentation Tool
 * 
 * Experimental feature designed for MCP clients using less capable language models.
 * Provides built-in natural language processing to ensure consistent behavior
 * across different AI providers and model capabilities.
 * 
 * Note: This is typically unnecessary when using advanced models like Claude or GPT-4,
 * as they can effectively translate natural language to structured tool calls.
 */

import { z } from 'zod';
import { UnifiedExaTool, UnifiedExaToolSchema } from './unified-exa-tool.js';

interface QueryPattern {
  patterns: string[];
  operation: string;
  paramExtractor?: (query: string) => any;
}

export class IntelligentUnifiedExaTool extends UnifiedExaTool {
  private queryPatterns: QueryPattern[] = [
    // Documentation patterns
    {
      patterns: ['how to', 'how do i', 'documentation for', 'docs about'],
      operation: 'search_docs',
      paramExtractor: (query: string) => ({
        docs: { query: this.extractKeywords(query) }
      })
    },
    {
      patterns: ['api reference', 'api docs', 'endpoint documentation'],
      operation: 'get_docs',
      paramExtractor: () => ({
        docs: { category: 'api' }
      })
    },
    
    // Example patterns
    {
      patterns: ['example', 'show me code', 'code sample', 'implementation'],
      operation: 'search_examples',
      paramExtractor: (query: string) => ({
        examples: { query: this.extractKeywords(query) }
      })
    },
    {
      patterns: ['list examples', 'all examples', 'available examples'],
      operation: 'list_examples',
      paramExtractor: () => ({})
    },
    
    // Integration patterns
    {
      patterns: ['integrate with', 'integration', 'use with', 'connect to'],
      operation: 'search_integrations',
      paramExtractor: (query: string) => {
        const platforms = ['langchain', 'llamaindex', 'crewai', 'python', 'javascript', 'typescript'];
        const found = platforms.find(p => query.toLowerCase().includes(p));
        return {
          integrations: found ? { platform: found } : { query: this.extractKeywords(query) }
        };
      }
    },
    
    // Websets patterns
    {
      patterns: ['websets', 'monitor', 'webhook', 'enrichment'],
      operation: 'get_websets_docs',
      paramExtractor: (query: string) => {
        const features = ['monitors', 'webhooks', 'enrichments', 'imports'];
        const found = features.find(f => query.toLowerCase().includes(f.slice(0, -1)));
        return {
          websets: found ? { feature: found } : {}
        };
      }
    },
    
    // Changelog patterns
    {
      patterns: ['latest changes', 'recent updates', 'what changed', "what's new"],
      operation: 'get_latest_changes',
      paramExtractor: () => ({})
    },
    {
      patterns: ['changelog', 'version history', 'release notes'],
      operation: 'get_changelog',
      paramExtractor: () => ({})
    }
  ];

  /**
   * Analyze a natural language query and convert it to structured parameters
   */
  async analyzeQuery(query: string): Promise<z.infer<typeof UnifiedExaToolSchema>> {
    const lowerQuery = query.toLowerCase();
    
    // Find matching pattern
    for (const pattern of this.queryPatterns) {
      if (pattern.patterns.some(p => lowerQuery.includes(p))) {
        const params = pattern.paramExtractor ? pattern.paramExtractor(query) : {};
        return {
          operation: pattern.operation as any,
          ...params
        };
      }
    }
    
    // Default to searching docs if no pattern matches
    return {
      operation: 'search_docs',
      docs: { query: this.extractKeywords(query) }
    };
  }

  /**
   * Execute with natural language query
   */
  async executeNatural(query: string): Promise<string> {
    try {
      const params = await this.analyzeQuery(query);
      return await this.execute(params);
    } catch (error) {
      // If analysis fails, provide helpful guidance
      return this.formatHelpfulError(query, error);
    }
  }

  /**
   * Extract meaningful keywords from a query
   */
  private extractKeywords(query: string): string[] {
    // Remove common words and extract meaningful terms
    const stopWords = ['how', 'do', 'i', 'to', 'the', 'a', 'an', 'for', 'with', 'about', 'show', 'me', 'get', 'find'];
    const words = query.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    return words;
  }

  /**
   * Format error with helpful suggestions
   */
  private formatHelpfulError(query: string, error: any): string {
    const suggestions = [
      "Try one of these query formats:",
      "- 'How do I use Exa search API?'",
      "- 'Show me examples of RAG implementation'",
      "- 'Integration with LangChain'",
      "- 'Latest changes in the API'",
      "- 'Websets monitor documentation'",
      "",
      "Or use specific operations:",
      "- operation: 'list_examples' to see all examples",
      "- operation: 'get_docs' with category: 'api' for API docs",
      "- operation: 'search_integrations' with platform: 'langchain'"
    ];

    return JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Query analysis failed',
      query: query,
      suggestions: suggestions
    }, null, 2);
  }

  /**
   * Get enhanced tool definition with natural language support
   */
  static getEnhancedDefinition() {
    const baseDefinition = UnifiedExaTool.getDefinition();
    return {
      ...baseDefinition,
      name: 'exa',
      description: `${baseDefinition.description}

INTELLIGENT MODE (Experimental): Designed for less capable language models.
This mode adds built-in natural language processing to help MCP clients that struggle with parameter extraction.

When enabled, you can send natural language queries directly:
- "How do I use the search API?"
- "Show me RAG examples in Python"
- "Latest API changes"
- "Integration with LangChain"

Note: This mode is typically unnecessary when using advanced models like Claude or GPT-4.`
    };
  }
}

// Extended schema for natural language input
export const NaturalQuerySchema = z.object({
  query: z.string().describe("Natural language query about Exa documentation")
});

export const EnhancedUnifiedExaToolSchema = z.union([
  UnifiedExaToolSchema,
  NaturalQuerySchema
]);