# Exa Interactive Tutorials Design

## Overview

This document specifies the design for implementing local-only interactive tutorials in the Exa Documentation MCP Server. The system provides guided, stateful learning experiences that persist across sessions without requiring internet connectivity or server registration.

## Architecture

### Core Components

1. **Tutorial Engine** - Manages tutorial content and user progression
2. **Local State Manager** - Handles progress persistence using filesystem
3. **Content Loader** - Reads tutorial content from local markdown files
4. **Progress Tracker** - Maintains lesson/step completion status
5. **MCP Tools** - Provides interactive commands for tutorial navigation

### Design Principles

- **Offline-First**: Complete functionality without internet connectivity
- **Stateful**: Progress persists across Claude Code sessions
- **Interactive**: Model acts as tutor, not just content provider
- **Modular**: Tutorial content easily extensible
- **Consistent**: Same UX patterns as other Exa tools

## Data Structures

### Tutorial State

```typescript
interface TutorialState {
  userId: string;           // Local UUID for this user
  currentTutorial: string;  // Current tutorial name
  tutorials: Tutorial[];    // All available tutorials
  lastAccessed: string;     // ISO timestamp
}

interface Tutorial {
  name: string;             // Tutorial identifier
  title: string;            // Display name
  description: string;      // Tutorial description
  status: ProgressStatus;   // 0=not started, 1=in progress, 2=completed
  currentLesson: string;    // Current lesson name
  lessons: Lesson[];        // Tutorial lessons
}

interface Lesson {
  name: string;             // Lesson identifier
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  currentStep: string;      // Current step name
  steps: Step[];            // Lesson steps
}

interface Step {
  name: string;             // Step identifier
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  content: string;          // Step content (loaded on demand)
}

type ProgressStatus = 0 | 1 | 2; // not started | in progress | completed
```

### File System Structure

```
exa-mcp-docs/
├── tutorials/
│   ├── getting-started/
│   │   ├── 01-introduction/
│   │   │   ├── 01-welcome.md
│   │   │   ├── 02-setup.md
│   │   │   └── 03-first-search.md
│   │   └── 02-advanced-search/
│   │       ├── 01-filters.md
│   │       └── 02-parameters.md
│   └── api-usage/
│       └── 01-basic-usage/
│           ├── 01-authentication.md
│           └── 02-search-types.md
└── .cache/
    └── tutorial-state.json
```

## Local State Management

### User Identity

- Generate UUID on first tutorial access
- Store in `~/.cache/exa-tutorials/user-id`
- Persist across all tutorial sessions

### Progress Persistence

- State file: `~/.cache/exa-tutorials/state.json`
- Atomic writes to prevent corruption
- Graceful fallback if state file is corrupted
- No server synchronization required

### Content Loading

- Tutorials scanned from `./tutorials/` directory
- Markdown files loaded on-demand for current step
- Directory structure determines tutorial hierarchy
- Numeric prefixes control ordering

## MCP Tools

### 1. startExaTutorial

```typescript
// Start a tutorial or resume from last position
parameters: {
  tutorialName?: string  // Optional: specific tutorial to start
}
```

**Behavior:**
- If no tutorial specified, show available tutorials
- If tutorial specified, start from first incomplete step
- If user has progress, offer to resume or restart

### 2. nextExaTutorialStep

```typescript
// Advance to next step in current tutorial
parameters: {} // No parameters needed
```

**Behavior:**
- Mark current step as completed
- Load next step in current lesson
- If lesson complete, advance to next lesson
- If tutorial complete, show completion message

### 3. getExaTutorialStatus

```typescript
// Show current tutorial progress
parameters: {} // No parameters needed
```

**Behavior:**
- Display current tutorial/lesson/step
- Show progress percentages
- List available tutorials
- Provide navigation options

### 4. jumpToExaTutorialStep

```typescript
// Jump to specific tutorial/lesson/step
parameters: {
  tutorialName: string,
  lessonName?: string,
  stepName?: string
}
```

**Behavior:**
- Navigate to specific position
- Update progress state
- Load requested step content

### 5. resetExaTutorialProgress

```typescript
// Reset all tutorial progress
parameters: {
  confirm?: boolean  // Required confirmation
}
```

**Behavior:**
- Clear all progress state
- Require explicit confirmation
- Preserve user ID for future sessions

## Content Format

### Tutorial Metadata

Each tutorial directory contains `tutorial.json`:

```json
{
  "name": "getting-started",
  "title": "Getting Started with Exa",
  "description": "Learn the basics of using Exa's search capabilities",
  "estimatedTime": "30 minutes",
  "difficulty": "beginner",
  "prerequisites": []
}
```

### Step Content

Markdown files with frontmatter:

```markdown
---
title: "Your First Search"
description: "Learn how to perform basic searches with Exa"
codeExample: true
---

# Your First Search

Welcome to your first Exa search! In this step, you'll learn how to...

## What You'll Learn

- How to construct basic search queries
- Understanding search results
- Common search patterns

## Try This

Let's start with a simple search:

```python
from exa_py import Exa

exa = Exa(api_key="your-api-key")
result = exa.search("latest AI developments")
```

## Next Steps

Once you've tried this example, use the `nextExaTutorialStep` tool to continue.
```

## Tutorial Content Strategy

### Tutorial Topics

1. **Getting Started with Exa**
   - Welcome and setup
   - Your first search
   - Understanding results
   - Basic parameters

2. **Websets: Curated Content Collections**
   - Understanding Websets
   - Creating your first Webset
   - Managing Webset content
   - Search patterns with Websets

3. **Research Endpoint: Deep Analysis**
   - Research vs regular search
   - Setting up research queries
   - Analyzing research results
   - Advanced research techniques

4. **Retrieval Orchestrations: Advanced Workflows**
   - What are retrieval orchestrations
   - Business intelligence workflows
   - Competitive analysis patterns
   - Technical research orchestrations
   - Building custom orchestrations

### Content Guidelines

- Each step should be completable in 2-5 minutes
- Include practical code examples
- Build incrementally on previous concepts
- Provide clear "what you'll learn" sections
- End each step with next step guidance
- Use real orchestration examples from `/orchestrations/` directory
- Show both simple and complex retrieval workflows
- Demonstrate multi-tool coordination patterns

## Implementation Plan

### Phase 1: Core Infrastructure

1. **State Management**
   - Local file system storage
   - UUID generation for users
   - Progress tracking data structures

2. **Content Loading**
   - Tutorial directory scanning
   - Markdown file parsing
   - Metadata extraction

3. **Basic MCP Tools**
   - `startExaTutorial`
   - `nextExaTutorialStep`
   - `getExaTutorialStatus`

### Phase 2: Enhanced Features

1. **Navigation Tools**
   - `jumpToExaTutorialStep`
   - `resetExaTutorialProgress`

2. **Content Enhancement**
   - Step content wrapping with prompts
   - Interactive code examples
   - Progress indicators

3. **Error Handling**
   - Graceful state corruption recovery
   - Missing content handling
   - User feedback for errors

### Phase 3: Content Development

1. **Tutorial Creation**
   - Write initial tutorial content
   - Create example code snippets
   - Test learning progression

2. **Orchestration Examples Integration**
   - Adapt orchestration workflows for tutorials
   - Create step-by-step breakdowns
   - Develop progressive complexity examples

3. **Integration Testing**
   - End-to-end tutorial flows
   - State persistence verification
   - Content loading validation

## Orchestration Examples Library

### Available Workflows (50 Examples)

The tutorials will leverage real orchestration workflows from `/orchestrations/`:

#### Business & Market Intelligence (10 workflows)
- Comprehensive Company Profile
- Brand Reputation Audit
- Market Overview & Sizing
- Investment & Financial Insights
- Executive Background Research
- And 5 more...

#### Competitive Analysis & Strategy (10 workflows)
- Competitor Identification & Profiling
- Product Feature & Pricing Comparison
- SWOT Analysis Aggregation
- Digital Presence Audit
- Market Share & Growth Insights
- And 5 more...

#### Knowledge & Academic Research (5 workflows)
- Topic Literature Review
- Fact-checking Workflow
- Historical Event Timeline
- Educational Resource Aggregation
- Comprehensive Q&A Resolution

#### Meta Frameworks (4 workflows)
- 10x Better Framework
- YC Idea Validator & Refinement Engine
- Technology Architecture Decision Engine
- Workflow Design Research Engine

#### Social Media & Community Insights (10 workflows)
- Reddit FAQ & Issue Analysis
- TikTok Trend Analysis
- YouTube Content Trends
- Influencer Identification
- Sentiment Analysis Across Platforms
- And 5 more...

#### Technical & Developer Research (7 workflows)
- Framework/Tool Comparison
- API Documentation Discovery
- Security Vulnerability Research
- Open Source Activity Scan
- Developer Hiring Trends
- And 2 more...

### Tutorial Integration Strategy

1. **Progressive Complexity**: Start with simple 2-tool workflows, build to complex multi-phase orchestrations
2. **Real Examples**: Use actual orchestration workflows as tutorial content
3. **Hands-on Practice**: Guide users through building their own orchestrations
4. **Pattern Recognition**: Teach common orchestration patterns and techniques

## Integration with Existing Exa Tools

### Tool Coordination

- Tutorial tools use same base classes as documentation tools
- Consistent error handling and response formatting
- Shared utilities for content processing

### Cross-References

- Tutorial content can reference documentation via `exaDocs` tool
- Examples can link to API reference via `exaIntegrations` tool
- Changelog references for version-specific features
- Orchestration examples reference specific MCP tools

### User Experience

- Tutorials complement documentation lookup
- Clear distinction between learning and reference modes
- Smooth transitions between tutorial and documentation
- Orchestration examples connect to live tool usage

## Success Metrics

### Functionality

- [ ] Complete tutorial flows work without internet
- [ ] Progress persists across sessions
- [ ] Content loading is fast and reliable
- [ ] Error handling is graceful

### User Experience

- [ ] Clear learning progression
- [ ] Helpful navigation between steps
- [ ] Consistent formatting and prompts
- [ ] Easy recovery from interruptions

### Technical

- [ ] Minimal resource usage
- [ ] Atomic state updates
- [ ] Efficient content loading
- [ ] Proper error boundaries

## Future Enhancements

### Optional Online Features

- Tutorial completion certificates
- Progress sharing/export
- Community-contributed tutorials
- Usage analytics (opt-in)

### Advanced Interactions

- Interactive code execution
- Hands-on exercises with validation
- Personalized learning paths
- Integration with external tools

### Content Expansion

- Video tutorial integration
- Interactive visualizations
- Real-world project guides
- Community tutorial marketplace

## Technical Considerations

### Performance

- Lazy loading of tutorial content
- Efficient state file updates
- Minimal memory footprint
- Fast directory scanning

### Security

- No sensitive data in state files
- Secure UUID generation
- Safe file system operations
- Input validation for all parameters

### Maintenance

- Automated content validation
- Version compatibility checks
- Clear migration paths for state format changes
- Comprehensive error logging

## Conclusion

This design provides a complete local-only interactive tutorial system that enhances the Exa Documentation MCP Server with guided learning experiences. The system maintains the offline-first philosophy while providing rich, stateful interactions that help users learn Exa's capabilities through hands-on practice.

The modular design allows for incremental implementation and future enhancements while maintaining consistency with the existing documentation tools. The local state management ensures reliable progress tracking without external dependencies, making it suitable for all user environments.