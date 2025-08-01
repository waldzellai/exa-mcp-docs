# Changelog

## [2.0.0] - 2025-08-01

### 🚀 Breaking Changes

#### Unified Tool Architecture
- **REPLACED** 5 separate tools (`exaDocs`, `exaExamples`, `exaIntegrations`, `exaWebsets`, `exaChangelog`) with a single unified tool `exa_docs`
- **NEW** Operation-based API: All functionality now accessed through a single tool with an `operation` parameter
- **SIMPLIFIED** Tool discovery: Instead of remembering 5 different tool names, users now work with one tool

### ✨ New Features

#### Intelligent Mode (Experimental - For Less Capable Models)
- **Built-in Natural Language Processing**: Enable with `EXA_INTELLIGENT_MODE=true` environment variable
- **Designed for Less Capable Models**: Helps MCP clients using smaller language models that struggle with tool parameter extraction
- **Consistent Query Interpretation**: Tool handles natural language internally, ensuring uniform behavior across different AI providers
- **Smart Parameter Inference**: Automatically extracts relevant parameters from queries
- **Helpful Error Messages**: Provides suggestions when queries can't be understood
- **Note**: Typically unnecessary when using advanced models like Claude or GPT-4

#### Progressive Disclosure
- **Operation Categories**: Cleanly organized into Documentation, Examples, Integrations, Websets, and Changelog operations
- **Descriptive Parameters**: Each parameter includes helpful descriptions
- **Better Discoverability**: All operations visible in one tool definition

### 🔧 Technical Improvements

- **Code Reusability**: Unified tool leverages existing tool implementations
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Backward Compatibility**: Intelligent mode maintains support for structured queries
- **Modular Architecture**: Easy to extend with new operations or intelligence features

### 📝 Available Operations

#### Documentation Operations
- `get_docs`: Retrieve specific documentation by path or category
- `search_docs`: Search across all documentation with keywords

#### Example Operations
- `list_examples`: List all available code examples
- `get_example`: Retrieve a specific example by name
- `search_examples`: Search examples by keywords, use case, or language

#### Integration Operations
- `get_integration`: Get documentation for a specific platform/SDK
- `list_integrations`: List all available integrations
- `search_integrations`: Search integration documentation

#### Websets Operations
- `get_websets_docs`: Get Websets API documentation
- `search_websets`: Search Websets features

#### Changelog Operations
- `get_changelog`: Get version history
- `get_latest_changes`: Get the most recent changes
- `search_changes`: Search changes by type or date range

### 🔄 Migration Guide

See [Migration Guide](specs/migration-guide.md) for detailed instructions on updating from v1.x to v2.0.

### 🐛 Fixes
- Improved error handling with more descriptive messages
- Better parameter validation using Zod schemas

### 🏗️ Infrastructure
- Updated to use `zod-to-json-schema` for proper JSON Schema generation
- Enhanced build configuration for cleaner module exports
- Removed tutorial-specific functionality from production build

---

## [1.0.2] - Previous Version

### Features
- 5 separate MCP tools for different documentation categories
- Offline-first documentation access
- Pre-scraped content for fast access