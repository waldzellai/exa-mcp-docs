# Error Handling Standardization - End State Specification

## Overview
After implementing standardized error handling, the MCP server will have a consistent, informative, and AI-friendly error management system across all tools.

## Error Type Hierarchy

```typescript
// Base error types
abstract class ExaError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly details?: unknown,
    public readonly recoverable: boolean = false
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      recoverable: this.recoverable,
      timestamp: new Date().toISOString()
    };
  }
}

// Specific error types
class DocumentNotFoundError extends ExaError {
  constructor(path: string, suggestions?: string[]) {
    super(
      `Document not found: ${path}`,
      'DOC_NOT_FOUND',
      404,
      { path, suggestions },
      true
    );
  }
}

class InvalidParameterError extends ExaError {
  constructor(param: string, value: unknown, expected: string) {
    super(
      `Invalid parameter '${param}': expected ${expected}, got ${typeof value}`,
      'INVALID_PARAM',
      400,
      { param, value, expected },
      true
    );
  }
}

class DocumentLoadError extends ExaError {
  constructor(path: string, reason: string) {
    super(
      `Failed to load document: ${reason}`,
      'DOC_LOAD_ERROR',
      500,
      { path, reason },
      false
    );
  }
}

class SearchError extends ExaError {
  constructor(query: string, reason: string) {
    super(
      `Search failed: ${reason}`,
      'SEARCH_ERROR',
      500,
      { query, reason },
      true
    );
  }
}

class ConfigurationError extends ExaError {
  constructor(issue: string, resolution?: string) {
    super(
      `Configuration error: ${issue}`,
      'CONFIG_ERROR',
      500,
      { issue, resolution },
      false
    );
  }
}
```

## Error Handling Middleware

```typescript
class ErrorHandler {
  private readonly logger: Logger;
  private readonly metrics: MetricsCollector;
  
  async handleError(error: unknown, context: ErrorContext): Promise<ErrorResponse> {
    // Normalize error
    const exaError = this.normalizeError(error);
    
    // Log error with context
    this.logger.error({
      error: exaError.toJSON(),
      context,
      stackTrace: error instanceof Error ? error.stack : undefined
    });
    
    // Record metrics
    this.metrics.recordError(exaError.code, context.tool);
    
    // Generate AI-friendly response
    return this.formatErrorResponse(exaError, context);
  }
  
  private normalizeError(error: unknown): ExaError {
    if (error instanceof ExaError) {
      return error;
    }
    
    if (error instanceof Error) {
      // Map known errors
      if (error.message.includes('ENOENT')) {
        const path = this.extractPath(error.message);
        return new DocumentNotFoundError(path);
      }
      
      if (error.message.includes('Invalid argument')) {
        return new InvalidParameterError('unknown', null, 'valid input');
      }
      
      // Default mapping
      return new ExaError(
        error.message,
        'UNKNOWN_ERROR',
        500,
        { originalError: error.name }
      );
    }
    
    // Non-Error thrown
    return new ExaError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500,
      { error: String(error) }
    );
  }
  
  private formatErrorResponse(error: ExaError, context: ErrorContext): ErrorResponse {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        tool: context.tool,
        operation: context.operation
      }
    };
    
    // Add recovery suggestions for AI
    if (error.recoverable) {
      response.error.suggestions = this.generateSuggestions(error);
    }
    
    // Add details for debugging (but not sensitive info)
    if (process.env.NODE_ENV !== 'production') {
      response.error.details = error.details;
    }
    
    return response;
  }
  
  private generateSuggestions(error: ExaError): string[] {
    const suggestions: string[] = [];
    
    switch (error.code) {
      case 'DOC_NOT_FOUND':
        suggestions.push('Check if the path is correct');
        suggestions.push('Use the search function to find the document');
        if (error.details?.suggestions?.length > 0) {
          suggestions.push(`Did you mean: ${error.details.suggestions[0]}?`);
        }
        break;
        
      case 'INVALID_PARAM':
        suggestions.push(`Provide a valid ${error.details?.expected}`);
        suggestions.push('Check the parameter documentation');
        break;
        
      case 'SEARCH_ERROR':
        suggestions.push('Try a simpler search query');
        suggestions.push('Check if the search syntax is correct');
        break;
    }
    
    return suggestions;
  }
}
```

## Tool Integration

```typescript
abstract class BaseExaTool extends ExaTool {
  protected errorHandler: ErrorHandler;
  
  constructor() {
    super();
    this.errorHandler = new ErrorHandler();
  }
  
  // Wrapper for all tool methods
  protected async executeWithErrorHandling<T>(
    operation: string,
    params: Record<string, unknown>,
    handler: () => Promise<T>
  ): Promise<ToolResponse<T>> {
    const context: ErrorContext = {
      tool: this.name,
      operation,
      params,
      timestamp: new Date()
    };
    
    try {
      // Validate parameters first
      this.validateParams(operation, params);
      
      // Execute operation
      const result = await handler();
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      const errorResponse = await this.errorHandler.handleError(error, context);
      return errorResponse as ToolResponse<T>;
    }
  }
  
  private validateParams(operation: string, params: Record<string, unknown>) {
    const schema = this.getOperationSchema(operation);
    
    for (const [key, config] of Object.entries(schema)) {
      const value = params[key];
      
      // Required check
      if (config.required && value === undefined) {
        throw new InvalidParameterError(key, value, 'required value');
      }
      
      // Type check
      if (value !== undefined && typeof value !== config.type) {
        throw new InvalidParameterError(key, value, config.type);
      }
      
      // Custom validation
      if (config.validate && !config.validate(value)) {
        throw new InvalidParameterError(key, value, config.description);
      }
    }
  }
}
```

## Standardized Tool Responses

```typescript
interface ToolResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    tool: string;
    operation: string;
    suggestions?: string[];
    details?: unknown;
  };
  metadata?: {
    executionTime: number;
    cacheHit?: boolean;
    documentsProcessed?: number;
  };
}

// Example implementation in docs-tool
class DocsTool extends BaseExaTool {
  async getDocumentation(args: GetDocumentationArgs): Promise<ToolResponse<DocumentationResult>> {
    return this.executeWithErrorHandling(
      'getDocumentation',
      args,
      async () => {
        const startTime = Date.now();
        
        // Tool logic here
        const docs = await this.loadDocumentation(args.path);
        
        if (!docs || docs.length === 0) {
          throw new DocumentNotFoundError(
            args.path,
            await this.findSimilarPaths(args.path)
          );
        }
        
        return {
          documents: docs,
          metadata: {
            executionTime: Date.now() - startTime,
            documentsProcessed: docs.length
          }
        };
      }
    );
  }
}
```

## Error Recovery Strategies

```typescript
class RecoveryManager {
  async attemptRecovery(error: ExaError, context: ErrorContext): Promise<RecoveryResult> {
    if (!error.recoverable) {
      return { recovered: false };
    }
    
    switch (error.code) {
      case 'DOC_NOT_FOUND':
        return this.recoverFromNotFound(error, context);
        
      case 'SEARCH_ERROR':
        return this.recoverFromSearchError(error, context);
        
      case 'DOC_LOAD_ERROR':
        return this.recoverFromLoadError(error, context);
        
      default:
        return { recovered: false };
    }
  }
  
  private async recoverFromNotFound(
    error: DocumentNotFoundError, 
    context: ErrorContext
  ): Promise<RecoveryResult> {
    // Try alternative paths
    const alternatives = [
      error.details.path.replace(/\.md$/, '.mdx'),
      error.details.path.replace(/\.mdx$/, '.md'),
      path.join(path.dirname(error.details.path), 'index.md')
    ];
    
    for (const alt of alternatives) {
      if (await this.documentExists(alt)) {
        return {
          recovered: true,
          result: await this.loadDocument(alt),
          message: `Found document at alternative path: ${alt}`
        };
      }
    }
    
    return { recovered: false };
  }
}
```

## Logging and Monitoring

```typescript
interface ErrorLog {
  timestamp: Date;
  tool: string;
  operation: string;
  errorCode: string;
  errorMessage: string;
  recoverable: boolean;
  recovered?: boolean;
  userId?: string;
  requestId: string;
  duration: number;
  stackTrace?: string;
}

class ErrorLogger {
  private readonly transport: LogTransport;
  
  async logError(log: ErrorLog) {
    // Structured logging
    await this.transport.error({
      ...log,
      level: 'error',
      service: 'exa-mcp-server',
      environment: process.env.NODE_ENV
    });
    
    // Alert on critical errors
    if (!log.recoverable && this.isCritical(log.errorCode)) {
      await this.sendAlert(log);
    }
  }
  
  private isCritical(errorCode: string): boolean {
    return ['CONFIG_ERROR', 'SYSTEM_ERROR', 'INIT_ERROR'].includes(errorCode);
  }
}
```

## User Experience

### Before
- Inconsistent error messages across tools
- Generic "Error: undefined" responses
- No guidance for recovery
- Silent failures in some cases
- AI models struggle to understand errors

### After
- Consistent error format across all tools
- Clear, descriptive error messages
- Actionable suggestions for recovery
- All errors properly logged and tracked
- AI-friendly error responses with recovery hints

## Testing Strategy

```typescript
describe('Error Handling', () => {
  it('should handle document not found errors gracefully', async () => {
    const result = await docsTool.getDocumentation({ path: 'non/existent.md' });
    
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('DOC_NOT_FOUND');
    expect(result.error?.suggestions).toContain('Use the search function to find the document');
  });
  
  it('should validate parameters before execution', async () => {
    const result = await docsTool.getDocumentation({ path: 123 as any });
    
    expect(result.success).toBe(false);
    expect(result.error?.code).toBe('INVALID_PARAM');
    expect(result.error?.message).toContain('expected string');
  });
  
  it('should attempt recovery for recoverable errors', async () => {
    // Create file.mdx but request file.md
    await fs.writeFile('test-docs/file.mdx', 'content');
    
    const result = await docsTool.getDocumentation({ path: 'test-docs/file.md' });
    
    expect(result.success).toBe(true);
    expect(result.data?.documents).toHaveLength(1);
  });
});
```

## Migration Guide

1. All tools extend new `BaseExaTool` class
2. Wrap operations in `executeWithErrorHandling`
3. Replace throw statements with specific error types
4. Update tests to check for new error format
5. Add parameter validation schemas