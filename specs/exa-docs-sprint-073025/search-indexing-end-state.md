# Search Indexing Implementation - End State Specification

## Overview
After implementing search indexing, the MCP server will have a high-performance, memory-efficient search system that provides near-instantaneous results across all documentation categories.

## Architecture

### 1. Index Structure
```typescript
interface SearchIndex {
  documents: Map<string, IndexedDocument>;
  invertedIndex: Map<string, Set<string>>; // term -> document IDs
  titleIndex: Map<string, Set<string>>;    // title terms -> document IDs
  categoryIndex: Map<string, Set<string>>; // category -> document IDs
  metadata: IndexMetadata;
}

interface IndexedDocument {
  id: string;
  path: string;
  title: string;
  category: string;
  content: string;
  summary: string; // First 200 chars
  termFrequency: Map<string, number>;
  lastModified: Date;
  size: number;
}
```

### 2. Indexing Pipeline

```typescript
class DocumentIndexer {
  private readonly stopWords = new Set(['the', 'is', 'at', 'which', 'on']);
  
  async indexDocuments(docsPath: string): Promise<SearchIndex> {
    // 1. Parallel document processing
    const documents = await this.loadDocumentsParallel(docsPath);
    
    // 2. Text processing pipeline
    for (const doc of documents) {
      const tokens = this.tokenize(doc.content);
      const stems = this.stemTokens(tokens);
      const filtered = this.removeStopWords(stems);
      doc.termFrequency = this.calculateTF(filtered);
    }
    
    // 3. Build inverted index
    const index = this.buildInvertedIndex(documents);
    
    // 4. Persist to disk
    await this.persistIndex(index);
    
    return index;
  }
}
```

### 3. Search Algorithm

```typescript
class SearchEngine {
  private index: SearchIndex;
  private cache: LRUCache<string, SearchResult[]>;
  
  search(query: string, options: SearchOptions): SearchResult[] {
    // Check cache first
    const cacheKey = `${query}-${JSON.stringify(options)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    // Process query
    const queryTerms = this.processQuery(query);
    
    // Calculate relevance scores
    const scores = new Map<string, number>();
    
    for (const term of queryTerms) {
      const docIds = this.index.invertedIndex.get(term) || new Set();
      
      for (const docId of docIds) {
        const doc = this.index.documents.get(docId)!;
        const tfIdf = this.calculateTFIDF(term, doc, this.index);
        const boost = this.getBoostFactor(term, doc, options);
        
        scores.set(docId, (scores.get(docId) || 0) + tfIdf * boost);
      }
    }
    
    // Sort by relevance
    const results = Array.from(scores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, options.limit || 10)
      .map(([docId]) => this.formatResult(docId));
    
    // Cache results
    this.cache.set(cacheKey, results);
    
    return results;
  }
  
  private getBoostFactor(term: string, doc: IndexedDocument, options: SearchOptions): number {
    let boost = 1.0;
    
    // Title match boost
    if (doc.title.toLowerCase().includes(term)) {
      boost *= 2.0;
    }
    
    // Category relevance boost
    if (options.category && doc.category === options.category) {
      boost *= 1.5;
    }
    
    // Recency boost
    const daysSinceModified = (Date.now() - doc.lastModified.getTime()) / (1000 * 60 * 60 * 24);
    boost *= Math.exp(-daysSinceModified / 365); // Decay over a year
    
    return boost;
  }
}
```

### 4. Index Management

```typescript
class IndexManager {
  private watcher: FSWatcher;
  private updateQueue: Set<string> = new Set();
  private updateTimer: NodeJS.Timeout | null = null;
  
  async initialize() {
    // Load or build index
    const indexPath = path.join(process.cwd(), '.exa-docs-index');
    
    if (await this.isIndexValid(indexPath)) {
      this.index = await this.loadIndex(indexPath);
    } else {
      this.index = await this.buildIndex();
    }
    
    // Watch for changes
    this.watchDocuments();
  }
  
  private watchDocuments() {
    this.watcher = chokidar.watch('.exa-docs/**/*.md', {
      persistent: true,
      ignoreInitial: true
    });
    
    this.watcher.on('change', (path) => this.queueUpdate(path));
    this.watcher.on('add', (path) => this.queueUpdate(path));
    this.watcher.on('unlink', (path) => this.handleRemoval(path));
  }
  
  private queueUpdate(docPath: string) {
    this.updateQueue.add(docPath);
    
    // Debounce updates
    if (this.updateTimer) clearTimeout(this.updateTimer);
    
    this.updateTimer = setTimeout(() => {
      this.processUpdates();
    }, 1000);
  }
}
```

## Performance Characteristics

### Before Implementation
- Search time: O(n*m) where n = number of documents, m = average document length
- Memory usage: Entire document set loaded into memory
- First search: 2-5 seconds
- Subsequent searches: 100-500ms

### After Implementation
- Search time: O(k log k) where k = number of matching documents
- Memory usage: ~20% of original (only index in memory)
- First search: 5-20ms
- Subsequent searches: 1-5ms (cache hits)
- Index build time: One-time 10-30 seconds
- Incremental updates: <100ms per document

## User Experience Improvements

1. **Instant Results**: Searches return in milliseconds, not seconds
2. **Better Relevance**: TF-IDF scoring with boost factors provides more accurate results
3. **Search Suggestions**: Index enables "did you mean?" functionality
4. **Faceted Search**: Category filtering happens at index level
5. **Fuzzy Matching**: Stemming and edit distance matching for typos

## Storage Requirements

- Index size: ~10-15% of original document size
- Stored in `.exa-docs-index/` directory
- Format: Binary MessagePack for fast serialization
- Compression: Zstandard compression reduces size by ~60%

## Integration Changes

### Tool Updates
```typescript
abstract class BaseExaTool extends ExaTool {
  protected searchEngine: SearchEngine;
  
  async initialize() {
    this.searchEngine = await SearchEngine.getInstance();
  }
  
  protected async searchDocumentation(
    query: string, 
    options?: SearchOptions
  ): Promise<DocumentationResponse> {
    const results = await this.searchEngine.search(query, {
      ...options,
      category: this.category
    });
    
    return this.formatResults(results);
  }
}
```

### API Consistency
- All existing tool methods maintain their signatures
- Search behavior is consistent but significantly faster
- No breaking changes for MCP clients

## Maintenance

1. **Index Rebuilding**: Automatic weekly rebuild or on-demand via `--rebuild-index` flag
2. **Health Checks**: Index integrity verification on startup
3. **Metrics**: Search performance metrics logged for monitoring
4. **Garbage Collection**: Removed documents automatically purged from index

## Future Enhancements

1. **Semantic Search**: Integration with embedding models for concept-based search
2. **Multi-language Support**: Tokenizers for non-English documentation
3. **Query Expansion**: Automatic synonym and related term inclusion
4. **Learning to Rank**: ML-based result ranking based on usage patterns