# Exa Documentation MCP Server

A Model Context Protocol (MCP) server that helps developers build powerful applications with Exa's neural search API. Get instant access to documentation, code examples, and integration guides directly through your AI assistant while coding.

## Why Use This?

**Build Faster with Exa**: Whether you're creating a research tool, news aggregator, competitive intelligence system, or RAG application, this server gives you instant access to everything you need to implement Exa's powerful search capabilities.

**Perfect for:**
- 🔍 Building semantic search into your applications
- 📰 Creating real-time news and content monitoring systems
- 🤖 Implementing RAG (Retrieval-Augmented Generation) pipelines
- 📊 Developing competitive intelligence and market research tools
- 🎯 Finding similar content and recommendations
- 📝 Building content curation and summarization tools

## How It Works

Your AI assistant automatically fetches the exact Exa documentation, code examples, and best practices you need while you're coding. Just ask natural questions about implementing Exa features, and get immediate, context-aware answers with working code examples.

## Features

- **Developer-Focused**: Get exactly what you need to build with Exa's API, when you need it
- **Complete Code Examples**: Production-ready examples for common use cases like news monitoring, research tools, and RAG
- **Smart Context Understanding**: Knows when you need API docs, code examples, or troubleshooting help
- **Framework Integration Guides**: Instant access to LangChain, LlamaIndex, Next.js, and other integration docs
- **Offline-First**: All documentation cached locally for fast, reliable access
- **Real-Time Updates**: Stay current with the latest API changes and new features

## How to Use: Simply Ask Natural Questions

The `exa_docs` tool automatically understands what you're looking for based on your natural language query. Just ask questions about Exa, and it will find the right documentation, examples, or integration guides.

### What You Can Ask About

**API Documentation & Concepts**
- How Exa's search endpoints work (search, contents, findSimilar, answer, research)
- Core concepts like neural vs keyword search, index capabilities, and LiveCrawl
- Authentication, setup guides, rate limits, and pricing

**Code Examples**
- Complete application examples (Exa Researcher, RAG implementations)
- Use case implementations (news summarizer, company analysis)
- Language-specific examples (Python, TypeScript/JavaScript)

**Integrations & SDKs**
- Python SDK complete reference
- TypeScript/JavaScript SDK documentation
- Framework integrations (LangChain, LlamaIndex, CrewAI)
- Platform integrations (Vercel, IBM WatsonX, OpenRouter)

**Websets API**
- Monitor configuration and management
- Webhook setup and event handling
- Data enrichment pipelines
- Complete Websets API reference

**Updates & Changes**
- Latest API updates and new features
- Breaking changes and migration guides
- Bug fixes and deprecation notices

## Installation

### NPM Package (Recommended)

```bash
# Run directly with npx
npx @waldzellai/exa-mcp-docs

# Or install globally
npm install -g @waldzellai/exa-mcp-docs
exa-mcp-docs
```

### MCP Client Configuration

#### Claude Desktop

Add to your Claude Desktop configuration (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@waldzellai/exa-mcp-docs"]
    }
  }
}
```

#### Cursor IDE

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@waldzellai/exa-mcp-docs"]
    }
  }
}
```

#### With Optional API Key

If you have an Exa API key (optional for enhanced features):

```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@waldzellai/exa-mcp-docs"],
      "env": {
        "EXA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage Examples

Simply ask natural questions about Exa, and the tool will understand what you need:

### Example Questions You Can Ask

**Getting Started**
- "How do I get started with Exa?"
- "What's the difference between neural and keyword search in Exa?"
- "How do I authenticate with the Exa API?"

**Code Examples**
- "Show me how to build a news summarizer with Exa"
- "I need Python code for semantic search"
- "How do I implement RAG with Exa?"

**Integrations**
- "How do I use Exa with LangChain?"
- "Show me the TypeScript SDK documentation"
- "I want to integrate Exa with my Next.js app"

**Advanced Features**
- "How do Websets work?"
- "Tell me about Exa's webhook capabilities"
- "What are the latest API changes?"

**Real-World Scenarios**
- "I'm building a competitor analysis tool - what Exa features should I use?"
- "Help me find recent news articles about AI companies"
- "I need to monitor mentions of my brand online"

### How It Works Behind the Scenes

The tool uses intelligent query interpretation to understand your natural language questions and automatically:
1. Identifies what type of information you need (documentation, examples, integrations, etc.)
2. Extracts relevant keywords and context from your question
3. Searches across all documentation to find the most relevant content
4. Returns comprehensive, contextual information to answer your question

This happens automatically - you don't need to specify operations or parameters. Just ask your question naturally!

## Advanced Usage (For Developers)

While the tool is designed to understand natural language queries automatically, developers can also use specific parameters for precise control:

### Tool Structure
```json
{
  "query": "Your natural language question about Exa"
}
```

### Direct Operation Access (Optional)
For specific needs, you can still use operation-based queries:
```json
{
  "operation": "search_docs",
  "docs": {
    "query": ["search", "API"]
  }
}
```

Available operations include:
- Documentation: `get_docs`, `search_docs`
- Examples: `list_examples`, `get_example`, `search_examples`
- Integrations: `get_integration`, `list_integrations`, `search_integrations`
- Websets: `get_websets_docs`, `search_websets`
- Changelog: `get_changelog`, `get_latest_changes`, `search_changes`

## Architecture

The server follows an offline-first architecture with intelligent query processing:

1. **Documentation Scraping**: Pre-scrapes all documentation from docs.exa.ai
2. **Local Storage**: Stores processed documentation in `.exa-docs/` directory
3. **Intelligent Query Processing**: Natural language queries are automatically interpreted to find the most relevant documentation
4. **Fast Access**: Serves documentation locally without network calls
5. **Context-Aware Search**: Searches across all documentation types based on query intent

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/exa-labs/exa-docs-server.git
cd exa-docs-server

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start
```

### Update Documentation

```bash
# Re-scrape latest documentation
npm run scrape

# Update documentation and commit changes
npm run update-docs
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Documentation Coverage

The server includes comprehensive documentation for:

- **API Reference**: All endpoint documentation
- **Examples**: 16 complete code examples
- **Integrations**: 6 platform and framework integrations
- **Websets**: Complete Websets API documentation
- **Changelogs**: Version history and API changes

## Requirements

- Node.js 18.0.0 or higher
- Compatible MCP client (Claude Desktop, Cursor, etc.)

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/exa-labs/exa-docs-server/issues
- Exa Documentation: https://docs.exa.ai
- MCP Protocol: https://modelcontextprotocol.io

## Contributing

Contributions are welcome! Please see CONTRIBUTING.md for guidelines.

---

Built with ❤️ by Exa Labs for the developer community.