# Websets Tool Method Signature Fix - End State Specification

## Overview
The websets-tool.ts currently has a method signature override issue that violates the Liskov Substitution Principle. This fix ensures proper inheritance while maintaining functionality.

## Current Problem

```typescript
// In base-tool.ts
abstract class BaseExaTool extends ExaTool {
  protected searchDocumentation(
    query: string,
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[]
}

// In websets-tool.ts (INCORRECT)
class WebsetsTool extends BaseExaTool {
  protected override searchDocumentation(
    query: string,
    options?: { 
      limit?: number; 
      minScore?: number; 
      feature?: string;  // Adding extra parameter violates LSP
    }
  ): DocumentationFile[]
}
```

## Solution Architecture

### Option 1: Composition Pattern (Recommended)

```typescript
// websets-tool.ts
class WebsetsTool extends BaseExaTool {
  // Use base search for standard queries
  protected searchDocumentation(
    query: string,
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[] {
    return super.searchDocumentation(query, options);
  }
  
  // Add specialized search method for feature-specific queries
  protected searchByFeature(
    query: string,
    feature: string,
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[] {
    // First filter by feature
    const featureDocs = this.filterByFeature(feature);
    
    // Then search within filtered docs
    return this.searchInDocuments(query, featureDocs, options);
  }
  
  private filterByFeature(feature: string): DocumentationFile[] {
    const featureMap: Record<string, string[]> = {
      'monitors': ['monitors/', 'monitoring/', 'alerts/'],
      'webhooks': ['webhooks/', 'integrations/webhooks/'],
      'enrichments': ['enrichments/', 'data-enrichment/'],
      'imports': ['imports/', 'data-imports/'],
      'websets': ['websets/', 'collections/'],
      'events': ['events/', 'event-handling/'],
      'searches': ['search/', 'querying/'],
      'items': ['items/', 'data-items/']
    };
    
    const patterns = featureMap[feature] || [];
    return this.documentationFiles.filter(doc => 
      patterns.some(pattern => doc.path.includes(pattern))
    );
  }
  
  // Tool method implementation
  async execute(args: ExecuteArgs): Promise<ToolResponse> {
    const { feature, query, operation, includeExamples } = args;
    
    let results: DocumentationFile[];
    
    if (feature) {
      // Use feature-specific search
      results = this.searchByFeature(query || '', feature, {
        limit: args.limit,
        minScore: args.minScore
      });
    } else {
      // Use standard search
      results = this.searchDocumentation(query || '', {
        limit: args.limit,
        minScore: args.minScore
      });
    }
    
    return this.formatResults(results, { includeExamples });
  }
}
```

### Option 2: Generic Options Pattern

```typescript
// base-tool.ts - Updated base class
interface SearchOptions {
  limit?: number;
  minScore?: number;
  [key: string]: any; // Allow extensions
}

abstract class BaseExaTool extends ExaTool {
  protected searchDocumentation(
    query: string,
    options?: SearchOptions
  ): DocumentationFile[] {
    // Base implementation ignores unknown options
    const { limit = 10, minScore = 0.1 } = options || {};
    // ... search logic
  }
}

// websets-tool.ts
interface WebsetsSearchOptions extends SearchOptions {
  feature?: string;
}

class WebsetsTool extends BaseExaTool {
  protected searchDocumentation(
    query: string,
    options?: SearchOptions // Still compatible with base
  ): DocumentationFile[] {
    const websetsOptions = options as WebsetsSearchOptions;
    
    if (websetsOptions?.feature) {
      // Handle feature-specific search
      const filtered = this.filterByFeature(websetsOptions.feature);
      return this.searchInDocuments(query, filtered, websetsOptions);
    }
    
    // Delegate to base implementation
    return super.searchDocumentation(query, options);
  }
}
```

### Option 3: Strategy Pattern (Most Extensible)

```typescript
// search-strategies.ts
interface SearchStrategy {
  search(
    query: string,
    documents: DocumentationFile[],
    options?: SearchOptions
  ): DocumentationFile[];
}

class StandardSearchStrategy implements SearchStrategy {
  search(query: string, documents: DocumentationFile[], options?: SearchOptions) {
    // Standard search implementation
  }
}

class FeatureSearchStrategy implements SearchStrategy {
  constructor(private feature: string) {}
  
  search(query: string, documents: DocumentationFile[], options?: SearchOptions) {
    // Filter by feature first
    const filtered = this.filterByFeature(documents);
    // Then apply query search
    return new StandardSearchStrategy().search(query, filtered, options);
  }
  
  private filterByFeature(documents: DocumentationFile[]): DocumentationFile[] {
    // Feature filtering logic
  }
}

// websets-tool.ts
class WebsetsTool extends BaseExaTool {
  private searchStrategies = new Map<string, SearchStrategy>();
  
  constructor() {
    super();
    this.initializeStrategies();
  }
  
  private initializeStrategies() {
    this.searchStrategies.set('standard', new StandardSearchStrategy());
    
    const features = ['monitors', 'webhooks', 'enrichments', 'imports'];
    features.forEach(feature => {
      this.searchStrategies.set(feature, new FeatureSearchStrategy(feature));
    });
  }
  
  protected searchDocumentation(
    query: string,
    options?: SearchOptions
  ): DocumentationFile[] {
    // Maintain base class compatibility
    const strategy = this.searchStrategies.get('standard')!;
    return strategy.search(query, this.documentationFiles, options);
  }
  
  // Public method for tool execution
  async executeSearch(args: WebsetsSearchArgs): Promise<DocumentationFile[]> {
    const strategy = args.feature 
      ? this.searchStrategies.get(args.feature) || this.searchStrategies.get('standard')!
      : this.searchStrategies.get('standard')!;
      
    return strategy.search(args.query, this.documentationFiles, {
      limit: args.limit,
      minScore: args.minScore
    });
  }
}
```

## Implementation Steps

1. **Choose Pattern**: Composition pattern (Option 1) is recommended for simplicity
2. **Refactor Tool**: 
   - Remove the override of `searchDocumentation`
   - Add new method `searchByFeature`
   - Update `execute` method to use appropriate search
3. **Update Tests**: Ensure tests cover both search paths
4. **Document API**: Update tool documentation with new search capabilities

## Benefits

### Before
- Violates Liskov Substitution Principle
- Type safety issues when using base class references
- Confusion about method contracts
- Potential runtime errors

### After
- Clean separation of concerns
- Type-safe method signatures
- Extensible for future features
- Maintains backward compatibility
- Clear API contracts

## Code Example - Final Implementation

```typescript
// websets-tool.ts - Complete implementation
import { BaseExaTool } from './base-tool.js';
import { DocumentationFile, ToolResponse } from '../types.js';

interface WebsetsExecuteArgs {
  query?: string;
  feature?: string;
  operation?: string;
  includeExamples?: boolean;
  limit?: number;
  minScore?: number;
}

export class WebsetsTool extends BaseExaTool {
  name = 'exaWebsets';
  description = 'Access Exa Websets API documentation and features';
  
  protected category = 'websets';
  
  // Feature-specific paths
  private readonly featurePaths: Record<string, string[]> = {
    'monitors': ['monitors/', 'monitoring/', 'alerts/'],
    'webhooks': ['webhooks/', 'integrations/webhooks/'],
    'enrichments': ['enrichments/', 'data-enrichment/'],
    'imports': ['imports/', 'data-imports/'],
    'websets': ['websets/', 'collections/'],
    'events': ['events/', 'event-handling/'],
    'searches': ['search/', 'querying/'],
    'items': ['items/', 'data-items/']
  };
  
  // Maintains base class contract
  protected searchDocumentation(
    query: string,
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[] {
    return super.searchDocumentation(query, options);
  }
  
  // New method for feature-specific search
  private searchDocumentationByFeature(
    query: string,
    feature: string,
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[] {
    // Get paths for this feature
    const featurePaths = this.featurePaths[feature] || [];
    
    if (featurePaths.length === 0) {
      // Unknown feature, fall back to standard search
      return this.searchDocumentation(query, options);
    }
    
    // Filter documents by feature paths
    const featureDocuments = this.documentationFiles.filter(doc =>
      featurePaths.some(path => doc.path.includes(path))
    );
    
    // Search within filtered documents
    if (!query) {
      // No query, return all feature documents
      return featureDocuments.slice(0, options?.limit || 10);
    }
    
    // Perform search on filtered set
    return this.performSearch(query, featureDocuments, options);
  }
  
  // Helper method to search within a document set
  private performSearch(
    query: string,
    documents: DocumentationFile[],
    options?: { limit?: number; minScore?: number }
  ): DocumentationFile[] {
    const { limit = 10, minScore = 0.1 } = options || {};
    
    const scored = documents
      .map(doc => ({
        doc,
        score: this.calculateRelevanceScore(query, doc)
      }))
      .filter(item => item.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    
    return scored.map(item => item.doc);
  }
  
  // Main execution method
  async execute(args: WebsetsExecuteArgs): Promise<ToolResponse> {
    const { query = '', feature, operation, includeExamples = false } = args;
    
    try {
      let results: DocumentationFile[];
      
      // Route to appropriate search method
      if (feature) {
        results = this.searchDocumentationByFeature(query, feature, {
          limit: args.limit,
          minScore: args.minScore
        });
      } else if (operation) {
        // Search for operation-specific docs
        results = this.searchDocumentation(`${operation} ${query}`, {
          limit: args.limit,
          minScore: args.minScore
        });
      } else {
        // Standard search
        results = this.searchDocumentation(query, {
          limit: args.limit,
          minScore: args.minScore
        });
      }
      
      // Format results
      return {
        success: true,
        data: {
          results: results.map(doc => ({
            title: doc.title,
            path: doc.path,
            content: includeExamples ? doc.content : doc.content.substring(0, 500),
            category: doc.category
          })),
          totalResults: results.length,
          searchCriteria: {
            query,
            feature,
            operation
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Search failed',
          code: 'SEARCH_ERROR'
        }
      };
    }
  }
  
  // Schema for MCP
  get schema() {
    return {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for Websets documentation'
        },
        feature: {
          type: 'string',
          enum: Object.keys(this.featurePaths),
          description: 'Specific Websets feature to search within'
        },
        operation: {
          type: 'string',
          enum: ['create', 'update', 'delete', 'list', 'get', 'cancel'],
          description: 'Specific operation type'
        },
        includeExamples: {
          type: 'boolean',
          description: 'Include full code examples in results'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results',
          default: 10
        },
        minScore: {
          type: 'number',
          description: 'Minimum relevance score',
          default: 0.1
        }
      }
    };
  }
}
```

## Testing

```typescript
describe('WebsetsTool', () => {
  let tool: WebsetsTool;
  
  beforeEach(() => {
    tool = new WebsetsTool();
  });
  
  it('should maintain base class search compatibility', () => {
    const results = tool['searchDocumentation']('test query');
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
  });
  
  it('should search by feature', async () => {
    const result = await tool.execute({
      query: 'create',
      feature: 'monitors'
    });
    
    expect(result.success).toBe(true);
    expect(result.data.results.every(r => 
      r.path.includes('monitor')
    )).toBe(true);
  });
  
  it('should handle unknown features gracefully', async () => {
    const result = await tool.execute({
      query: 'test',
      feature: 'unknown-feature'
    });
    
    expect(result.success).toBe(true);
    // Should fall back to standard search
    expect(result.data.results.length).toBeGreaterThan(0);
  });
});
```