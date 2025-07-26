# Exa Documentation MCP Server Specification

## Executive Summary

The Exa Documentation MCP Server is a Model Context Protocol (MCP) server designed to provide AI assistants with comprehensive, offline-first access to Exa.ai's complete knowledge base. Following the proven patterns of Mastra's MCP documentation server, this specification outlines a documentation server that pre-processes and locally stores Exa's documentation for fast, reliable access.

## Project Overview

### Vision
Create a best-in-class MCP server that transforms Exa's documentation ecosystem into an AI-accessible knowledge graph, enabling developers and AI assistants to seamlessly integrate Exa's search capabilities into their workflows.

### Core Objectives
1. **Complete Documentation Coverage**: Pre-processed local access to all Exa documentation
2. **Offline-First Architecture**: Documentation works without internet connectivity
3. **Intelligent Search**: Context-aware search across all documentation types
4. **Optional API Enhancement**: Enhanced features available with user's Exa API key
5. **Consolidated Tools**: 4-5 major tools that handle multiple sub-operations

## Architecture Design

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Exa MCP Documentation Server              │
├─────────────────────────────────────────────────────────────┤
│                         MCP Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐   │
│  │   Server    │  │   Tools     │  │   Resources       │   │
│  │   Setup     │  │   Registry  │  │   Management      │   │
│  └─────────────┘  └─────────────┘  └───────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Documentation Tools (5)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐   │
│  │  exaDocs    │  │ exaExamples │  │ exaIntegrations   │   │
│  └─────────────┘  └─────────────┘  └───────────────────┘   │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │ exaWebsets  │  │exaChangelog │                           │
│  └─────────────┘  └─────────────┘                           │
├─────────────────────────────────────────────────────────────┤
│              Documentation Processing Pipeline                │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐   │
│  │ LiveCrawl   │→ │  Processor  │→ │  Local Storage    │   │
│  │(Build-time) │  │   (MDX)     │  │   (Offline)       │   │
│  └─────────────┘  └─────────────┘  └───────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     Data Sources                              │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐   │
│  │ docs.exa.ai │  │GitHub Repos │  │  API Schemas      │   │
│  └─────────────┘  └─────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. MCP Server Core
- **Name**: `exa-docs-server`
- **Version**: Synchronized with Exa API versions
- **Protocol**: MCP v1.15.x or higher
- **Transport**: stdio (standard input/output)

#### 2. Documentation Categories

Based on the Exa documentation structure analysis:

- **API Reference** (`/reference/*`)
  - Core endpoints: search, contents, find-similar, answer, research
  - Authentication and setup
  - Rate limits and pricing
  - OpenAPI specifications

- **SDKs** (`/sdks/*`)
  - Python SDK documentation
  - TypeScript/JavaScript SDK documentation
  - Language-specific implementations
  - Code examples and patterns

- **Integration Guides** (`/integrations/*`)
  - LangChain integration
  - LlamaIndex integration
  - CrewAI integration
  - OpenAI wrapper
  - Vercel, IBM WatsonX integrations

- **Examples** (`/examples/*`)
  - Exa Researcher implementations
  - RAG quickstart guides
  - Demo applications
  - Use case implementations

- **Concepts** (`/concepts/*`)
  - How Exa search works
  - Neural vs keyword search
  - Index capabilities
  - LiveCrawl technology

- **Websets** (`/websets/*`)
  - Websets API documentation
  - Monitors and webhooks
  - Data enrichment
  - Batch operations

- **Administration** (`/admin/*`)
  - Team management
  - Security and compliance
  - Enterprise features

## Tool Specifications

Following the Mastra pattern of consolidated tools that handle multiple sub-operations, the Exa Documentation Server provides 5 major tools:

### 1. Documentation Tool (`exaDocs`)

**Purpose**: Comprehensive access to API reference, concepts, and guides

**Capabilities**:
- API endpoint documentation (search, contents, findSimilar, answer, research)
- Core concepts (neural vs keyword search, index capabilities, LiveCrawl)
- Authentication and setup guides
- Rate limits and pricing information
- FAQs and troubleshooting

**Input Schema**:
```typescript
{
  paths?: string[],      // Specific documentation paths
  category?: string,     // "api", "concepts", "guides", "admin"
  query?: string[]       // Keyword search across docs
}
```

**Features**:
- Path-based navigation with directory listing
- MDX content processing and formatting
- Smart suggestions for incorrect paths
- Multi-path batch retrieval
- Contextual cross-references

### 2. Examples Tool (`exaExamples`)

**Purpose**: Production-ready code examples and implementations

**Capabilities**:
- Complete application examples (Exa Researcher, RAG implementations)
- Use case implementations (news summarizer, company analysis)
- Demo applications
- Code snippets by category
- Jupyter notebook examples

**Input Schema**:
```typescript
{
  example?: string,      // Specific example name
  useCase?: string,      // "research", "rag", "news", "analysis"
  language?: string,     // "python", "typescript", "javascript"
  query?: string[]       // Search within examples
}
```

**Features**:
- Full source code retrieval
- Dependency listings
- Setup instructions
- Output examples
- Modification guides

### 3. Integrations Tool (`exaIntegrations`)

**Purpose**: SDK documentation and framework integrations

**Capabilities**:
- Python SDK complete reference
- TypeScript/JavaScript SDK documentation
- LangChain integration guide
- LlamaIndex integration guide
- CrewAI, OpenAI wrapper, Vercel integrations
- IBM WatsonX and other platform integrations

**Input Schema**:
```typescript
{
  platform?: string,     // "python-sdk", "js-sdk", "langchain", etc.
  method?: string,       // Specific method or feature
  topic?: string,        // Integration topic
  query?: string[]       // Search within integrations
}
```

**Features**:
- Method signatures and parameters
- Integration patterns
- Configuration examples
- Version compatibility
- Troubleshooting guides

### 4. Websets Tool (`exaWebsets`)

**Purpose**: Websets API documentation and features

**Note**: Websets features require an active Websets subscription to use in production

**Capabilities**:
- Websets API reference
- Monitor configuration and management
- Webhook setup and event handling
- Data enrichment pipelines
- Import/export operations
- Search agents configuration

**Input Schema**:
```typescript
{
  feature?: string,      // "monitors", "webhooks", "enrichments", "imports"
  operation?: string,    // "create", "update", "delete", "list"
  includeExamples?: boolean
}
```

**Features**:
- Complete API documentation
- Event type references
- Configuration schemas
- Webhook payload examples
- Best practices for Websets

### 5. Changelog Tool (`exaChangelog`)

**Purpose**: Version history and API changes

**Capabilities**:
- Latest API updates
- Breaking changes alerts
- New feature announcements
- Deprecation notices
- Migration guides between versions

**Input Schema**:
```typescript
{
  version?: string,      // Specific version or "latest"
  changeType?: string,   // "breaking", "feature", "fix", "deprecation"
  dateRange?: {
    start?: string,
    end?: string
  }
}
```

**Features**:
- Chronological change history
- Impact analysis for changes
- Migration code examples
- Version comparison
- RSS/notification integration

## Documentation Processing Pipeline

Following Mastra's offline-first pattern, all documentation is pre-scraped and committed to the repository:

### 1. Pre-Scraped Documentation Approach

**Documentation Sources**:
- Primary: Pre-scraped content from docs.exa.ai (stored in `.exa-docs/`)
- Secondary: GitHub repositories (exa-py, exa-js, exa-mcp-server)
- Tertiary: OpenAPI specifications and schemas

**Processing Strategy**:
```
┌─────────────────────────────────────────────────────────┐
│                 Documentation Pipeline                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1. Scraping Script (scripts/scrape-exa-docs.ts)        │
│     ├── Scrapes docs.exa.ai                             │
│     ├── Converts HTML → Markdown                        │
│     └── Saves to .exa-docs/                             │
│                                                          │
│  2. Build Process (npm run build)                       │
│     ├── Reads from .exa-docs/                           │
│     ├── Processes and indexes content                   │
│     └── Bundles with MCP server                         │
│                                                          │
│  3. Runtime (MCP Server)                                │
│     ├── Serves from bundled documentation               │
│     ├── No network calls required                       │
│     └── Full offline functionality                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2. Project Structure

```
exa-docs-server/
├── .exa-docs/                    # Pre-scraped documentation
│   ├── changelog/                # Changelog updates
│   │   ├── auto-search-as-default.md
│   │   ├── contents-endpoint-status-changes.md
│   │   ├── livecrawl-preferred-option.md
│   │   └── markdown-contents-as-default.md
│   ├── examples/                 # Code examples
│   │   ├── company-analyst.md
│   │   ├── demo-exa-powered-writing-assistant.md
│   │   ├── demo-hallucination-detector.md
│   │   ├── demo-websets-news-monitor.md
│   │   ├── exa-mcp.md
│   │   ├── exa-rag.md
│   │   ├── exa-recruiting-agent.md
│   │   ├── exa-researcher.md
│   │   ├── exa-researcher-python.md
│   │   ├── getting-started-with-exa-in-instructor.md
│   │   ├── getting-started-with-rag-in-langgraph.md
│   │   ├── identifying-hallucinations-with-exa.md
│   │   ├── job-search-with-exa.md
│   │   ├── live-demo-hacker-news-clone.md
│   │   ├── niche-company-finder-with-phrase-filters.md
│   │   └── recent-news-summarizer.md
│   ├── integrations/             # Integration guides
│   │   ├── crew-ai-docs.md
│   │   ├── ibm-watsonx-docs.md
│   │   ├── langchain-docs.md
│   │   ├── llamaIndex-docs.md
│   │   ├── openrouter.md
│   │   └── vercel.md
│   ├── reference/                # API reference documentation
│   │   ├── answer.md
│   │   ├── chat-completions.md
│   │   ├── contents-retrieval-with-exa-api.md
│   │   ├── crawling-subpages-with-exa.md
│   │   ├── crewai.md
│   │   ├── exa-research.md
│   │   ├── exas-capabilities-explained.md
│   │   ├── faqs.md
│   │   ├── find-similar-links.md
│   │   ├── get-contents.md
│   │   ├── getting-started.md
│   │   ├── how-exa-search-works.md
│   │   ├── langchain.md
│   │   ├── llamaindex.md
│   │   ├── openai.md
│   │   ├── openai-responses-api-with-exa.md
│   │   ├── openapi-spec.md
│   │   ├── quickstart.md
│   │   ├── rag-quickstart.md
│   │   ├── rate-limits.md
│   │   ├── research/
│   │   │   ├── create-a-task.md
│   │   │   ├── get-a-task.md
│   │   │   └── list-tasks.md
│   │   ├── search.md
│   │   ├── security.md
│   │   ├── setting-up-team.md
│   │   ├── should-we-use-livecrawl.md
│   │   ├── the-exa-index.md
│   │   ├── tool-calling-with-claude.md
│   │   └── tool-calling-with-gpt4o.md
│   ├── sdks/                     # SDK documentation
│   │   ├── cheat-sheet.md
│   │   ├── python-sdk-specification.md
│   │   └── typescript-sdk-specification.md
│   ├── websets/                  # Websets documentation
│   │   ├── api/
│   │   │   ├── events/
│   │   │   │   ├── get-an-event.md
│   │   │   │   ├── list-all-events.md
│   │   │   │   └── types.md
│   │   │   ├── get-started.md
│   │   │   ├── how-it-works.md
│   │   │   ├── imports/
│   │   │   │   ├── create-an-import.md
│   │   │   │   ├── delete-import.md
│   │   │   │   ├── get-import.md
│   │   │   │   ├── list-imports.md
│   │   │   │   └── update-import.md
│   │   │   ├── monitors/
│   │   │   │   ├── create-a-monitor.md
│   │   │   │   ├── delete-monitor.md
│   │   │   │   ├── get-monitor.md
│   │   │   │   ├── list-monitors.md
│   │   │   │   ├── runs/
│   │   │   │   │   ├── get-monitor-run.md
│   │   │   │   │   └── list-monitor-runs.md
│   │   │   │   └── update-monitor.md
│   │   │   ├── overview.md
│   │   │   ├── webhooks/
│   │   │   │   ├── attempts/
│   │   │   │   │   └── list-webhook-attempts.md
│   │   │   │   ├── create-a-webhook.md
│   │   │   │   ├── delete-a-webhook.md
│   │   │   │   ├── get-a-webhook.md
│   │   │   │   ├── list-webhooks.md
│   │   │   │   ├── update-a-webhook.md
│   │   │   │   └── verifying-signatures.md
│   │   │   └── websets/
│   │   │       ├── cancel-a-running-webset.md
│   │   │       ├── create-a-webset.md
│   │   │       ├── delete-a-webset.md
│   │   │       ├── enrichments/
│   │   │       │   ├── cancel-a-running-enrichment.md
│   │   │       │   ├── create-an-enrichment.md
│   │   │       │   ├── delete-an-enrichment.md
│   │   │       │   └── get-an-enrichment.md
│   │   │       ├── get-a-webset.md
│   │   │       ├── items/
│   │   │       │   ├── delete-an-item.md
│   │   │       │   ├── get-an-item.md
│   │   │       │   └── list-all-items-for-a-webset.md
│   │   │       ├── list-all-websets.md
│   │   │       ├── searches/
│   │   │       │   ├── cancel-a-running-search.md
│   │   │       │   ├── create-a-search.md
│   │   │       │   └── get-a-search.md
│   │   │       └── update-a-webset.md
│   │   ├── dashboard/
│   │   │   ├── exclude-results.md
│   │   │   ├── get-started.md
│   │   │   ├── import-from-csv.md
│   │   │   ├── integrations.md
│   │   │   ├── walkthroughs/
│   │   │   │   ├── Creating-enrichments.md
│   │   │   │   ├── Exploring-your-results.md
│   │   │   │   ├── Managing-Team-Members.md
│   │   │   │   ├── Prompting.md
│   │   │   │   └── Sharing-and-Downloading-Your-Results.md
│   │   │   └── websets-example-queries.md
│   │   ├── faq.md
│   │   └── overview.md
│   └── metadata.json             # Scraping metadata
├── scripts/
│   ├── scrape-exa-docs.ts       # Documentation scraping script
│   └── update-docs.ts            # Wrapper for updating docs
├── src/
│   ├── tools/
│   │   ├── docs-tool.ts          # Main documentation access
│   │   ├── examples-tool.ts      # Code examples tool
│   │   ├── integrations-tool.ts  # Integration guides
│   │   ├── websets-tool.ts       # Websets documentation
│   │   └── changelog-tool.ts     # Version history
│   ├── server.ts                 # MCP server setup
│   └── index.ts                  # Main entry point
├── package.json
└── README.md
```

### 3. Scraping Implementation

**Scraping Script Configuration**:
```typescript
interface ScrapingConfig {
  baseUrl: string;
  outputDir: string;
  routes: RouteConfig[];
  rateLimit: number;
  maxRetries: number;
}

const config: ScrapingConfig = {
  baseUrl: 'https://docs.exa.ai',
  outputDir: '.exa-docs',
  rateLimit: 2000, // ms between requests
  maxRetries: 3,
  routes: [
    // Changelog
    { path: '/changelog/auto-search-as-default', type: 'page' },
    { path: '/changelog/contents-endpoint-status-changes', type: 'page' },
    { path: '/changelog/livecrawl-preferred-option', type: 'page' },
    { path: '/changelog/markdown-contents-as-default', type: 'page' },
    
    // Examples - all individual pages
    { path: '/examples/company-analyst', type: 'page' },
    { path: '/examples/demo-exa-powered-writing-assistant', type: 'page' },
    { path: '/examples/demo-hallucination-detector', type: 'page' },
    { path: '/examples/demo-websets-news-monitor', type: 'page' },
    { path: '/examples/exa-mcp', type: 'page' },
    { path: '/examples/exa-rag', type: 'page' },
    { path: '/examples/exa-recruiting-agent', type: 'page' },
    { path: '/examples/exa-researcher', type: 'page' },
    { path: '/examples/exa-researcher-python', type: 'page' },
    { path: '/examples/getting-started-with-exa-in-instructor', type: 'page' },
    { path: '/examples/getting-started-with-rag-in-langgraph', type: 'page' },
    { path: '/examples/identifying-hallucinations-with-exa', type: 'page' },
    { path: '/examples/job-search-with-exa', type: 'page' },
    { path: '/examples/live-demo-hacker-news-clone', type: 'page' },
    { path: '/examples/niche-company-finder-with-phrase-filters', type: 'page' },
    { path: '/examples/recent-news-summarizer', type: 'page' },
    
    // Integrations
    { path: '/integrations/crew-ai-docs', type: 'page' },
    { path: '/integrations/ibm-watsonx-docs', type: 'page' },
    { path: '/integrations/langchain-docs', type: 'page' },
    { path: '/integrations/llamaIndex-docs', type: 'page' },
    { path: '/integrations/openrouter', type: 'page' },
    { path: '/integrations/vercel', type: 'page' },
    
    // API Reference
    { path: '/reference/answer', type: 'page' },
    { path: '/reference/chat-completions', type: 'page' },
    { path: '/reference/contents-retrieval-with-exa-api', type: 'page' },
    { path: '/reference/crawling-subpages-with-exa', type: 'page' },
    { path: '/reference/crewai', type: 'page' },
    { path: '/reference/exa-research', type: 'page' },
    { path: '/reference/exas-capabilities-explained', type: 'page' },
    { path: '/reference/faqs', type: 'page' },
    { path: '/reference/find-similar-links', type: 'page' },
    { path: '/reference/get-contents', type: 'page' },
    { path: '/reference/getting-started', type: 'page' },
    { path: '/reference/how-exa-search-works', type: 'page' },
    { path: '/reference/langchain', type: 'page' },
    { path: '/reference/llamaindex', type: 'page' },
    { path: '/reference/openai', type: 'page' },
    { path: '/reference/openai-responses-api-with-exa', type: 'page' },
    { path: '/reference/openapi-spec', type: 'page' },
    { path: '/reference/quickstart', type: 'page' },
    { path: '/reference/rag-quickstart', type: 'page' },
    { path: '/reference/rate-limits', type: 'page' },
    { path: '/reference/research/create-a-task', type: 'page' },
    { path: '/reference/research/get-a-task', type: 'page' },
    { path: '/reference/research/list-tasks', type: 'page' },
    { path: '/reference/search', type: 'page' },
    { path: '/reference/security', type: 'page' },
    { path: '/reference/setting-up-team', type: 'page' },
    { path: '/reference/should-we-use-livecrawl', type: 'page' },
    { path: '/reference/the-exa-index', type: 'page' },
    { path: '/reference/tool-calling-with-claude', type: 'page' },
    { path: '/reference/tool-calling-with-gpt4o', type: 'page' },
    
    // SDKs
    { path: '/sdks/cheat-sheet', type: 'page' },
    { path: '/sdks/python-sdk-specification', type: 'page' },
    { path: '/sdks/typescript-sdk-specification', type: 'page' },
    
    // Websets - comprehensive API documentation
    { path: '/websets/overview', type: 'page' },
    { path: '/websets/faq', type: 'page' },
    { path: '/websets/api/overview', type: 'page' },
    { path: '/websets/api/get-started', type: 'page' },
    { path: '/websets/api/how-it-works', type: 'page' },
    
    // Websets API sections
    { path: '/websets/api/events/get-an-event', type: 'page' },
    { path: '/websets/api/events/list-all-events', type: 'page' },
    { path: '/websets/api/events/types', type: 'page' },
    
    { path: '/websets/api/imports/create-an-import', type: 'page' },
    { path: '/websets/api/imports/delete-import', type: 'page' },
    { path: '/websets/api/imports/get-import', type: 'page' },
    { path: '/websets/api/imports/list-imports', type: 'page' },
    { path: '/websets/api/imports/update-import', type: 'page' },
    
    { path: '/websets/api/monitors/create-a-monitor', type: 'page' },
    { path: '/websets/api/monitors/delete-monitor', type: 'page' },
    { path: '/websets/api/monitors/get-monitor', type: 'page' },
    { path: '/websets/api/monitors/list-monitors', type: 'page' },
    { path: '/websets/api/monitors/update-monitor', type: 'page' },
    { path: '/websets/api/monitors/runs/get-monitor-run', type: 'page' },
    { path: '/websets/api/monitors/runs/list-monitor-runs', type: 'page' },
    
    { path: '/websets/api/webhooks/create-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/delete-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/get-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/list-webhooks', type: 'page' },
    { path: '/websets/api/webhooks/update-a-webhook', type: 'page' },
    { path: '/websets/api/webhooks/verifying-signatures', type: 'page' },
    { path: '/websets/api/webhooks/attempts/list-webhook-attempts', type: 'page' },
    
    { path: '/websets/api/websets/cancel-a-running-webset', type: 'page' },
    { path: '/websets/api/websets/create-a-webset', type: 'page' },
    { path: '/websets/api/websets/delete-a-webset', type: 'page' },
    { path: '/websets/api/websets/get-a-webset', type: 'page' },
    { path: '/websets/api/websets/list-all-websets', type: 'page' },
    { path: '/websets/api/websets/update-a-webset', type: 'page' },
    
    { path: '/websets/api/websets/enrichments/cancel-a-running-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/create-an-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/delete-an-enrichment', type: 'page' },
    { path: '/websets/api/websets/enrichments/get-an-enrichment', type: 'page' },
    
    { path: '/websets/api/websets/items/delete-an-item', type: 'page' },
    { path: '/websets/api/websets/items/get-an-item', type: 'page' },
    { path: '/websets/api/websets/items/list-all-items-for-a-webset', type: 'page' },
    
    { path: '/websets/api/websets/searches/cancel-a-running-search', type: 'page' },
    { path: '/websets/api/websets/searches/create-a-search', type: 'page' },
    { path: '/websets/api/websets/searches/get-a-search', type: 'page' },
    
    // Websets Dashboard
    { path: '/websets/dashboard/exclude-results', type: 'page' },
    { path: '/websets/dashboard/get-started', type: 'page' },
    { path: '/websets/dashboard/import-from-csv', type: 'page' },
    { path: '/websets/dashboard/integrations', type: 'page' },
    { path: '/websets/dashboard/websets-example-queries', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Creating-enrichments', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Exploring-your-results', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Managing-Team-Members', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Prompting', type: 'page' },
    { path: '/websets/dashboard/walkthroughs/Sharing-and-Downloading-Your-Results', type: 'page' }
  ]
};
```

**Scraping Features**:
1. **LiveCrawl Integration**: Uses Exa's own LiveCrawl API to fetch documentation
2. **Markdown Extraction**: LiveCrawl returns clean markdown content directly
3. **Metadata Preservation**: Tracks last scraped date and page modifications
4. **Batch Processing**: Efficiently crawls all documentation pages
5. **Error Handling**: Retries failed requests with logging

### 4. Search Implementation

**Local Search Strategy**:
- In-memory index loading on startup
- Keyword matching with scoring
- Path-based fuzzy matching
- Category filtering

**No External Dependencies**:
- All search happens locally
- No API calls required for basic documentation access
- Optional API key only for enhanced features

## Implementation Patterns

### Error Handling

```typescript
class ExaDocsError extends Error {
  constructor(
    message: string,
    public code: string,
    public category: string,
    public suggestion?: string
  ) {
    super(message);
  }
}

// Graceful degradation
// Fallback content
// Retry mechanisms
// User-friendly error messages
```

### Performance Optimization

- **Lazy Loading**: Load content on demand
- **Streaming**: Stream large documentation files
- **Compression**: Gzip content transfer
- **Caching**: Multi-level caching strategy
- **CDN Integration**: Edge caching for static content

### Security Considerations

- **API Key Management**: Secure storage and rotation
- **Rate Limiting**: Respect Exa API limits
- **Content Validation**: Sanitize user inputs
- **Access Control**: Optional authentication layer
- **Audit Logging**: Track usage patterns

## Integration Examples

### IDE Integration (Cursor/Windsurf)

```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-docs-server"],
      "env": {
        "EXA_API_KEY": "your-api-key-here"  // Optional: Enhanced features
      }
    }
  }
}
```

### Basic Usage (No API Key)
```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-docs-server"]
    }
  }
}
```

### Usage with AI Agents

MCP servers don't integrate directly into LLM provider APIs. Instead, they're used by MCP clients like Claude Desktop or Cursor.

Configure the Exa MCP server in your MCP client settings:

```json
// Example Claude Desktop configuration (~/.claude/claude_desktop_config.json)
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-docs-server"]
    }
  }
}
```

Once configured, you can ask your AI assistant questions about Exa, and it will use the documentation server to provide accurate answers.

## Optional Enhanced Features

When users OPTIONALLY provide their Exa API key, they can access these additional features (documentation remains fully accessible without any API key):

### 1. Live API Testing
- Execute example API calls with real data
- Show actual responses from Exa's API
- Display current usage against rate limits
- Test different endpoint parameters interactively

### Future Enhancements (Post-Launch)

Once core documentation serving is successful, consider:
- Interactive tutorials with progress tracking
- Retrieval orchestration patterns
- Team collaboration features

## Deployment Strategy

### Primary: NPM Package

**Installation Methods**:

1. **Via npx (recommended)**:
```bash
npx @exa/mcp-docs-server
```

2. **Global Installation**:
```bash
npm install -g @exa/mcp-docs-server
exa-docs-server
```

3. **Local Project Installation**:
```bash
npm install @exa/mcp-docs-server
```

**Package Structure**:
```
@exa/mcp-docs-server/
├── dist/
│   ├── index.js          # Main entry point
│   ├── stdio.js          # MCP stdio server
│   └── prepare-docs.js   # Documentation preparation script
├── docs/                 # Pre-processed documentation
├── package.json
└── README.md
```

### Secondary: Smithery Hosting

**Automated Installation**:
```bash
npx @smithery/cli install exa-docs --client cursor
```

**Benefits**:
- One-click installation for Cursor/Windsurf users
- Automatic configuration management
- Version update notifications
- Community discovery

**Smithery Configuration**:
```json
{
  "name": "exa-docs",
  "description": "Exa API Documentation Server",
  "author": "Exa Labs",
  "tools": ["exaDocs", "exaExamples", "exaIntegrations", "exaWebsets", "exaChangelog"],
  "categories": ["documentation", "api", "search"]
}

## Performance Metrics

### Target Metrics

- **Response Time**: < 100ms for cached content
- **Search Latency**: < 200ms for full-text search
- **Memory Usage**: < 512MB baseline
- **Concurrent Connections**: 1000+ supported
- **Cache Hit Rate**: > 80% for common queries

### Monitoring

- Request/response timing
- Cache performance
- Error rates
- Usage patterns
- Popular queries

## Update Workflow

### Manual Update Process

```bash
# 1. Run scraping script
npm run scrape

# 2. Review changes
git diff .exa-docs/

# 3. Commit updates
git add .exa-docs/
git commit -m "docs: update Exa documentation snapshot"

# 4. Push and release
git push
npm version patch
npm publish
```

### Automated Update (GitHub Action)

```yaml
name: Update Exa Documentation
on:
  schedule:
    - cron: '0 2 * * 1' # Weekly on Mondays at 2 AM
  workflow_dispatch:

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run scrape
      - name: Check for changes
        id: changes
        run: |
          if [[ -n $(git status -s .exa-docs/) ]]; then
            echo "changed=true" >> $GITHUB_OUTPUT
          fi
      - name: Create PR
        if: steps.changes.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v5
        with:
          title: 'docs: update Exa documentation'
          commit-message: 'docs: update Exa documentation snapshot'
          branch: update-exa-docs
```

## Implementation Timeline

### Phase 1: Core Documentation (Launch)
- [ ] 5 consolidated tools serving all documentation
- [ ] Offline-first architecture with pre-scraped content
- [ ] NPM package distribution
- [ ] IDE integration support (Cursor/Windsurf)
- [ ] Basic search functionality
- [ ] Automated weekly documentation updates

### Phase 2: Enhanced Features (Optional, based on adoption)
- API key integration for live features
- Smithery hosting setup
- Usage analytics
- Community feedback integration

## Success Criteria

### Primary Success Metric
**Documentation Access**: Users can successfully access any Exa documentation through their AI assistant without leaving their development environment.

### Key Performance Indicators
1. **Tool Response Time**: < 100ms for all documentation queries
2. **Search Accuracy**: > 90% relevance for first result
3. **Offline Reliability**: 100% functionality without internet
4. **Installation Success**: < 30 seconds from install to first use

### Quality Benchmarks
- Zero external dependencies for core functionality
- Complete documentation coverage (100% of public docs)
- Graceful handling of all error cases
- Clear path suggestions for navigation

## Technical Implementation Notes

### Build Process
1. **Documentation Scraping** (`scripts/scrape-exa-docs.ts`):
   - Scrape docs.exa.ai using configured routes
   - Convert HTML to Markdown using Turndown
   - Save to `.exa-docs/` with proper directory structure
   - Generate metadata.json with scraping info

2. **Server Implementation**:
   - Extend `@modelcontextprotocol/sdk` base classes
   - Implement 5 tool handlers with Zod schemas
   - Load documentation from `.exa-docs/` on startup
   - Implement in-memory search and caching

3. **Testing Strategy**:
   - Unit tests for each tool
   - Integration tests for MCP protocol
   - Performance tests for large documentation sets
   - Offline functionality verification

### Key Scripts

```json
{
  "scripts": {
    "build": "tsup",
    "scrape": "tsx scripts/scrape-exa-docs.ts",
    "update-docs": "npm run scrape && git add .exa-docs",
    "test": "vitest",
    "prepare": "npm run build"
  }
}
```

## Conclusion

The Exa Documentation MCP Server represents a focused, practical approach to making API documentation accessible through AI assistants. By following Mastra's proven patterns and prioritizing offline-first documentation serving, this server will:

1. **Provide Immediate Value**: Full documentation access from day one
2. **Ensure Reliability**: Offline-first architecture guarantees availability
3. **Minimize Complexity**: 5 consolidated tools that are easy to understand
4. **Enable Growth**: Optional API key unlocks enhanced features
5. **Support Community**: NPM + Smithery distribution for easy adoption

The key insight from Mastra's approach is that **simple, reliable documentation access is the foundation**. Everything else - interactive features, API playgrounds, collaboration tools - can come later if there's demand. By focusing on doing one thing exceptionally well (serving Exa's documentation offline through MCP), we create a tool that developers will actually use and rely on.

This specification provides a clear path to building a documentation server that serves the immediate needs of developers integrating Exa's search capabilities, while maintaining flexibility for future enhancements based on real user feedback.