# Exa Documentation MCP Server

A comprehensive Model Context Protocol (MCP) server providing AI assistants with complete, offline-first access to Exa.ai's documentation. This server enables developers to seamlessly integrate Exa's search capabilities into their workflows through their AI assistants.

## Features

- **Complete Documentation Coverage**: Access to all Exa API documentation, examples, integrations, and changelogs
- **Offline-First Architecture**: No internet connection required for basic functionality
- **5 Consolidated Tools**: Comprehensive tools for different documentation categories
- **Smart Search**: Context-aware search across all documentation types
- **Path-Based Navigation**: Direct access to specific documentation files
- **Pre-Scraped Content**: All documentation is pre-processed and bundled for fast access

## Tools

### 1. exaDocs
Access Exa API documentation, concepts, and guides
- API endpoint documentation (search, contents, findSimilar, answer, research)
- Core concepts (neural vs keyword search, index capabilities, LiveCrawl)
- Authentication and setup guides
- Rate limits and pricing information

### 2. exaExamples
Access production-ready code examples and implementations
- Complete application examples (Exa Researcher, RAG implementations)
- Use case implementations (news summarizer, company analysis)
- Demo applications and code snippets
- Language-specific examples (Python, TypeScript/JavaScript)

### 3. exaIntegrations
Access SDK documentation and framework integrations
- Python SDK complete reference
- TypeScript/JavaScript SDK documentation
- LangChain, LlamaIndex, CrewAI integrations
- Platform integrations (Vercel, IBM WatsonX, OpenRouter)

### 4. exaWebsets
Access Exa Websets API documentation and features
- Websets API complete reference
- Monitor configuration and management
- Webhook setup and event handling
- Data enrichment pipelines

### 5. exaChangelog
Access version history and API changes
- Latest API updates and new features
- Breaking changes alerts and migration guides
- Bug fixes and deprecation notices
- Chronological change history

## Installation

### NPM Package (Recommended)

```bash
# Run directly with npx
npx @exa/mcp-docs-server

# Or install globally
npm install -g @exa/mcp-docs-server
exa-docs-server
```

### MCP Client Configuration

#### Claude Desktop

Add to your Claude Desktop configuration (`~/.claude/claude_desktop_config.json`):

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

#### Cursor IDE

Add to your Cursor MCP configuration:

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

#### With Optional API Key

If you have an Exa API key (optional for enhanced features):

```json
{
  "mcpServers": {
    "exa-docs": {
      "command": "npx",
      "args": ["-y", "@exa/mcp-docs-server"],
      "env": {
        "EXA_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Usage Examples

### Basic Documentation Access

```
Ask your AI assistant: "How do I use Exa's search API?"
```

The assistant will use the exaDocs tool to provide comprehensive information about Exa's search functionality.

### Find Code Examples

```
Ask your AI assistant: "Show me examples of using Exa for RAG applications"
```

The assistant will use the exaExamples tool to find relevant RAG implementations.

### Integration Help

```
Ask your AI assistant: "How do I integrate Exa with LangChain?"
```

The assistant will use the exaIntegrations tool to provide LangChain integration documentation.

### Websets Information

```
Ask your AI assistant: "How do I set up Exa Websets monitors?"
```

The assistant will use the exaWebsets tool to provide monitor setup documentation.

### Check Latest Changes

```
Ask your AI assistant: "What are the latest changes to the Exa API?"
```

The assistant will use the exaChangelog tool to show recent API updates.

## Tool Parameters

### exaDocs
- `paths`: Array of specific documentation paths to retrieve
- `category`: Filter by category (api, concepts, guides, admin, reference)
- `query`: Array of keywords to search across documentation

### exaExamples
- `example`: Specific example name to retrieve
- `useCase`: Filter by use case (research, rag, news, analysis, recruiting, hallucination-detection)
- `language`: Filter by programming language (python, typescript, javascript)
- `query`: Array of keywords to search within examples

### exaIntegrations
- `platform`: Specific platform (python-sdk, js-sdk, langchain, llamaindex, crewai, openai, vercel, ibm-watsonx, openrouter)
- `method`: Specific method or feature
- `topic`: Integration topic
- `query`: Array of keywords to search within integrations

### exaWebsets
- `feature`: Specific feature (monitors, webhooks, enrichments, imports, websets, events, searches, items)
- `operation`: Specific operation (create, update, delete, list, get, cancel)
- `includeExamples`: Boolean to include full code examples

### exaChangelog
- `version`: Specific version or "latest"
- `changeType`: Filter by change type (breaking, feature, fix, deprecation, enhancement)
- `dateRange`: Object with start and end dates

## Architecture

The server follows an offline-first architecture:

1. **Documentation Scraping**: Pre-scrapes all documentation from docs.exa.ai
2. **Local Storage**: Stores processed documentation in `.exa-docs/` directory
3. **Fast Access**: Serves documentation locally without network calls
4. **Search Integration**: Provides local search across all documentation

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