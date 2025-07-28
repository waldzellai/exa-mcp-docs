# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Development
```bash
# Build and watch for changes
npm run dev

# Start the MCP server
npm start
# or
node dist/index.js
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Documentation Scraping
```bash
# Scrape latest documentation from docs.exa.ai
npm run scrape

# Update documentation and commit changes
npm run update-docs
```

## Architecture Overview

This is an MCP (Model Context Protocol) server that provides AI assistants with offline-first access to Exa.ai's documentation. The server exposes 5 specialized tools through the MCP protocol.

### Core Components

1. **MCP Server** (`src/index.ts`): Main entry point that initializes the MCP server, registers tools, and handles requests.

2. **Base Tool** (`src/tools/base-tool.ts`): Abstract base class providing common functionality:
   - Documentation loading from `.exa-docs/` directory
   - Search capabilities with relevance scoring
   - Path-based retrieval with fuzzy matching
   - Content truncation for large files

3. **Tool Implementations** (in `src/tools/`):
   - `docs-tool.ts`: API documentation, concepts, and guides
   - `examples-tool.ts`: Code examples and implementations
   - `integrations-tool.ts`: SDK documentation and framework integrations
   - `websets-tool.ts`: Websets API documentation
   - `changelog-tool.ts`: Version history and API changes

4. **Tutorial System** (`src/tutorial/` and `src/tutorials/`): Interactive tutorial engine with:
   - Progress tracking and state management
   - Content loading and formatting
   - MCP integration for tutorial commands

### Documentation Structure

The `.exa-docs/` directory contains pre-scraped documentation organized by category:
- API reference documentation
- Code examples
- Integration guides
- Websets documentation
- Changelogs

### Key Design Patterns

1. **Offline-First**: All documentation is pre-scraped and stored locally for fast access without network calls.

2. **Tool Specialization**: Each tool focuses on a specific documentation type with tailored search and retrieval logic.

3. **Fuzzy Path Matching**: When exact paths aren't found, the system suggests similar paths using Levenshtein distance.

4. **Content Truncation**: Large documents are truncated intelligently at line boundaries with overflow indicators.

5. **Search Relevance**: Multi-factor scoring considering title matches, content frequency, and category relevance.

## Testing Strategy

Tests are organized by tool in `src/tools/__tests__/`:
- Each tool has dedicated test coverage
- Tests verify both successful operations and error handling
- Mock file system operations are used for isolation
- Test fixtures in `__fixtures__/` provide sample data

## TypeScript Configuration

The project uses strict TypeScript settings with:
- Target: ES2022
- Module: ESNext
- Strict mode enabled
- All additional type safety flags enabled

Built with tsup for ESM output with source maps.