# Exa Interactive Tutorials v2.0 - Mastra-Inspired Design

## Executive Summary

This specification defines an enhanced interactive tutorial system for the Exa Documentation MCP Server, incorporating proven UX patterns from Mastra's course system. The key innovation is transforming the AI assistant from a content dumper into an interactive tutor that guides users through bite-sized, terminal-friendly learning experiences.

## Core Philosophy: Assistant-as-Tutor

The fundamental insight from Mastra's approach is that **the AI assistant should act as a personal tutor, not a documentation reader**. This means:

- **Progressive Disclosure**: One step at a time, not overwhelming content blocks
- **Interactive Guidance**: AI explains, demonstrates, and guides - not just displays
- **Terminal-Optimized**: Concise, emoji-rich formatting designed for CLI environments
- **Contextual Prompting**: Each step wrapped in tutoring context that instructs the AI how to behave

## Architecture Overview

### Core Components

1. **Tutorial Engine** - Content loading and progression management
2. **Content Wrapper** - Transforms raw content into tutoring prompts
3. **State Manager** - Local filesystem-based progress tracking
4. **MCP Tools** - Interactive navigation and status tools
5. **Terminal Formatter** - Emoji-rich, concise output formatting

### Design Principles

- **Offline-First**: Complete functionality without internet connectivity
- **Terminal-Friendly**: Designed for CLI environments with minimal text output
- **Stateful**: Progress persists across Claude Code sessions
- **Interactive**: Model acts as tutor, walking users through concepts
- **Modular**: Easy to extend with new tutorials and content
- **Consistent**: Follows Exa documentation server patterns

## Data Structures

### Tutorial State
```typescript
interface TutorialState {
  userId: string;           // Local UUID for this user
  currentTutorial: string;  // Current tutorial name
  tutorials: Tutorial[];    // All available tutorials
  lastAccessed: string;     // ISO timestamp
  version: string;          // State schema version
}

interface Tutorial {
  name: string;             // Tutorial identifier (kebab-case)
  title: string;            // Display name
  description: string;      // Brief description
  // Removed time estimates for alpha release
  difficulty: "beginner" | "intermediate" | "advanced";
  status: ProgressStatus;   // 0=not started, 1=in progress, 2=completed
  currentLesson: string;    // Current lesson name
  lessons: Lesson[];        // Tutorial lessons
  prerequisites: string[];  // Required knowledge/tutorials
}

interface Lesson {
  name: string;             // Lesson identifier (kebab-case)
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  currentStep: string;      // Current step name
  steps: Step[];            // Lesson steps
}

interface Step {
  name: string;             // Step identifier (kebab-case)
  title: string;            // Display title
  status: ProgressStatus;   // Progress status
  hasCode: boolean;         // Whether step includes code examples
  content?: string;         // Step content (loaded on demand)
}

type ProgressStatus = 0 | 1 | 2; // not started | in progress | completed
```

## Content Wrapping System

### The Tutoring Prompt

The core innovation is wrapping each tutorial step in a tutoring prompt that transforms the AI's behavior:

```typescript
const TUTORING_PROMPT = `
You are a skilled programming tutor helping someone learn Exa's search capabilities. Your role is to:

1. **Guide, don't dump**: Present step content in a conversational, teaching manner
2. **Write code for the user**: When examples are shown, write the actual code
3. **Explain as you go**: Briefly explain concepts before showing code
4. **Keep it concise**: This is a terminal environment - be brief but thorough
5. **Be encouraging**: Celebrate progress and provide clear next steps

The user is currently working through a tutorial step. Present the content below in a teaching manner, write any code examples for them, and guide them to use the \`nextExaTutorialStep\` tool when they're ready to continue.

Remember: You're a tutor, not a documentation reader. Make this interactive and engaging while keeping output concise for the terminal.
`;

function wrapContentInTutoringPrompt(content: string, stepInfo: Step): string {
  return `${TUTORING_PROMPT}

## Current Step: ${stepInfo.title}
${stepInfo.hasCode ? '💻 **Includes Code Examples**' : '📖 **Conceptual Step**'}

### Step Content:
${content}

---

When you've completed this step, ask me to "move to the next step" and I'll use the \`nextExaTutorialStep\` tool to continue.`;
}
```

### Terminal-Friendly Formatting

All tutorial output uses consistent, terminal-optimized formatting:

```typescript
interface TutorialFormatter {
  // Progress indicators
  statusEmoji: (status: ProgressStatus) => '⬜' | '🔶' | '✅';
  
  // Step headers
  stepHeader: (lesson: string, step: string) => string;
  // "📘 Lesson: Understanding Websets\n📝 Step: What Are Websets"
  
  // Progress summary
  progressSummary: (tutorial: Tutorial) => string;
  // "Progress: 3/7 steps completed (43%)"
  
  // Navigation hints
  navigationHints: () => string;
  // "Ready to continue? Ask me to 'move to the next step'"
}
```

## MCP Tools Specification

### 1. startExaTutorial

```typescript
{
  name: 'startExaTutorial',
  description: 'Start a tutorial or resume from last position. Shows available tutorials if none specified.',
  parameters: {
    tutorialName?: string  // Optional: specific tutorial to start
  }
}
```

**Enhanced Behavior**:
- **First-time users**: Show welcome message with tutorial overview
- **Returning users**: Offer to resume progress or start fresh
- **Tutorial selection**: Display tutorials with progress indicators and difficulty levels
- **Content wrapping**: Wrap first step in tutoring prompt for immediate guidance

**Output Format**:
```
🎓 Welcome to Exa Tutorials!

📚 Available Tutorials:

1. ✅ Getting Started with Exa (beginner) - Completed
2. 🔶 Websets: Curated Collections (intermediate) - 3/7 steps
3. ⬜ Research Endpoint (intermediate) - Not started
4. ⬜ Advanced Orchestrations (advanced) - Not started

Which tutorial would you like to start? Just tell me the name or number.
```

### 2. nextExaTutorialStep

```typescript
{
  name: 'nextExaTutorialStep',
  description: 'Advance to the next step in the current tutorial. Marks current step as completed.',
  parameters: {} // No parameters needed
}
```

**Enhanced Behavior**:
- **Step completion**: Mark current step as completed with celebration
- **Progress tracking**: Update lesson/tutorial status automatically
- **Content loading**: Load next step and wrap in tutoring prompt
- **Completion handling**: Handle lesson/tutorial completion with appropriate messages

**Output Format**:
```
🎉 Great job completing "What Are Websets"!

📘 Continuing: Websets: Curated Collections
📝 Next Step: How Websets Work (2/7)

[Wrapped step content follows...]
```

### 3. getExaTutorialStatus

```typescript
{
  name: 'getExaTutorialStatus',
  description: 'Show current tutorial progress and available navigation options.',
  parameters: {} // No parameters needed
}
```

**Enhanced Behavior**:
- **Concise overview**: Show current position and overall progress
- **Visual indicators**: Use emojis for quick status recognition
- **Navigation options**: Clear next steps for user
- **Completion celebration**: Acknowledge finished tutorials

**Output Format**:
```
📊 Tutorial Progress

🎯 Current: Websets: Curated Collections
📝 Step: How Websets Work (2/7 steps)
📈 Progress: 29% complete

📚 All Tutorials:
✅ Getting Started (100%)
🔶 Websets (29%)
⬜ Research Endpoint (0%)
⬜ Advanced Orchestrations (0%)

Ready to continue? Ask me to "move to the next step"
```

### 4. jumpToExaTutorialStep

```typescript
{
  name: 'jumpToExaTutorialStep',
  description: 'Jump to a specific tutorial, lesson, or step.',
  parameters: {
    tutorialName: string,
    lessonName?: string,
    stepName?: string
  }
}
```

**Enhanced Behavior**:
- **Flexible navigation**: Jump to any level (tutorial/lesson/step)
- **Progress preservation**: Mark intermediate steps as completed if jumping forward
- **Context setting**: Provide brief context about the jumped-to location
- **Content wrapping**: Wrap target step in tutoring prompt

### 5. resetExaTutorialProgress

```typescript
{
  name: 'resetExaTutorialProgress',
  description: 'Reset all tutorial progress. Requires confirmation.',
  parameters: {
    confirm?: boolean  // Required confirmation
  }
}
```

**Enhanced Behavior**:
- **Confirmation required**: Prevent accidental resets
- **Selective reset**: Option to reset specific tutorial vs all progress
- **Progress summary**: Show what will be lost before confirmation
- **Fresh start**: Clear welcome message after reset

## Content Strategy

### Tutorial Topics

1. **Getting Started with Exa** (beginner)
   - Welcome to Exa
   - Setting up your API key
   - Your first search
   - Understanding results

2. **Websets: Curated Collections** (intermediate)
   - Understanding Websets
   - Creating your first Webset
   - Searching with Websets

3. **Research Endpoint: Deep Analysis** (intermediate)
   - Research vs Search
   - Crafting research queries
   - Analyzing research results

4. **Advanced Orchestrations** (advanced)
   - Orchestration concepts
   - Multi-step workflows
   - Building custom orchestrations

### Content Guidelines

#### Step-by-Step Progression
- Clear learning objectives
- Builds on previous concepts
- Includes practical exercises

#### Code Examples
- Always include runnable code
- Explain each line when first introduced
- Show expected outputs
- Provide troubleshooting tips

#### Terminal Optimization
- Use emojis for visual hierarchy
- Keep explanations concise
- Break long content into digestible chunks
- Provide clear next actions

### Content Structure

#### Tutorial Metadata (`tutorial.json`)
```json
{
  "name": "getting-started",
  "title": "Getting Started with Exa",
  "description": "Learn the basics of Exa's search capabilities",
  "difficulty": "beginner",
  "prerequisites": [],
  "lessons": [
    {
      "name": "introduction",
      "title": "Introduction to Exa",
      "steps": [
        {
          "name": "welcome",
          "title": "Welcome to Exa",
          "hasCode": false
        },
        {
          "name": "setup",
          "title": "Setting up your API key",
          "hasCode": true
        }
      ]
    }
  ]
}
```

#### Step Content Format
```markdown
---
title: "Your First Search"
hasCode: true
---

# Your First Search

Now that you have your API key set up, let's perform your first search with Exa!

## What You'll Learn

In this step, you'll:
- Write your first search query
- Understand the search response
- Try different search parameters

## Let's Code Together

I'll walk you through creating a simple search. Here's the code:

```python
from exa_py import Exa

# Initialize the client
exa = Exa(api_key="your-api-key-here")

# Your first search
results = exa.search("latest AI developments")

# Let's see what we got
print(f"Found {len(results.results)} results")
print(f"First result: {results.results[0].title}")
```

## Understanding the Results

When you run this code, you'll get back a `SearchResponse` object that contains:
- `results`: List of search results
- `query`: The processed query
- `autoprompt_string`: Enhanced query (if autoprompt was used)

## Try This

Run the code above and observe the output. You should see something like:
```
Found 10 results
First result: "OpenAI Announces GPT-4 Turbo with Vision"
```

## Next Steps

Great! You've successfully performed your first Exa search. When you're ready to learn about understanding search results in detail, ask me to move to the next step.
```

## File System Structure

```
exa-docs-server/
├── tutorials/
│   ├── getting-started/
│   │   ├── tutorial.json
│   │   ├── 01-introduction/
│   │   │   ├── 01-welcome.md
│   │   │   ├── 02-setup.md
│   │   │   └── 03-first-search.md
│   │   └── 02-understanding-results/
│   │       └── 01-result-structure.md
│   ├── websets/
│   │   ├── tutorial.json
│   │   ├── 01-understanding-websets/
│   │   │   ├── 01-what-are-websets.md
│   │   │   ├── 02-how-websets-work.md
│   │   │   └── 03-webset-examples.md
│   │   ├── 02-creating-websets/
│   │   │   ├── 01-first-webset.md
│   │   │   └── 02-managing-content.md
│   │   └── 03-searching-websets/
│   │       ├── 01-basic-search.md
│   │       └── 02-advanced-patterns.md
│   ├── research-endpoint/
│   └── advanced-orchestrations/
└── .cache/
    └── exa-tutorials/
        ├── user-id
        └── state.json
```

## State Management

### Local Storage Strategy

Following Mastra's pattern but with enhanced resilience:

```typescript
interface StateManager {
  // Storage paths
  userIdPath: string;     // ~/.cache/exa-tutorials/user-id
  statePath: string;      // ~/.cache/exa-tutorials/state.json
  
  // Core operations
  loadState(): Promise<TutorialState | null>;
  saveState(state: TutorialState): Promise<void>;
  
  // Atomic operations
  updateProgress(tutorialName: string, lessonName: string, stepName: string): Promise<void>;
  markCompleted(tutorialName: string, lessonName: string, stepName: string): Promise<void>;
  
  // Error handling
  recoverFromCorruption(): Promise<TutorialState>;
  migrateStateVersion(oldState: any): Promise<TutorialState>;
}
```

### Progress Tracking

```typescript
interface ProgressTracker {
  // Status calculations
  calculateTutorialProgress(tutorial: Tutorial): number;
  calculateOverallProgress(state: TutorialState): number;
  
  // Next step logic
  findNextStep(tutorial: Tutorial): Step | null;
  findNextLesson(tutorial: Tutorial): Lesson | null;
  
  // Completion logic
  isStepComplete(step: Step): boolean;
  isLessonComplete(lesson: Lesson): boolean;
  isTutorialComplete(tutorial: Tutorial): boolean;
}
```

## Implementation Enhancements

### 1. Content Loading Pipeline

```typescript
class TutorialContentLoader {
  private contentCache: Map<string, string> = new Map();
  
  async loadStepContent(tutorialName: string, lessonName: string, stepName: string): Promise<string> {
    const cacheKey = `${tutorialName}/${lessonName}/${stepName}`;
    
    if (this.contentCache.has(cacheKey)) {
      return this.contentCache.get(cacheKey)!;
    }
    
    const content = await this.loadFromDisk(tutorialName, lessonName, stepName);
    this.contentCache.set(cacheKey, content);
    return content;
  }
  
  async wrapForTutoring(content: string, stepInfo: Step): Promise<string> {
    return wrapContentInTutoringPrompt(content, stepInfo);
  }
}
```

### 2. Terminal-Optimized Output

```typescript
class TutorialFormatter {
  static formatTutorialList(tutorials: Tutorial[]): string {
    return tutorials.map((tutorial, index) => {
      const status = this.getStatusEmoji(tutorial.status);
      const progress = this.calculateProgress(tutorial);
      return `${index + 1}. ${status} ${tutorial.title} (${tutorial.difficulty}, ${tutorial.estimatedTime}) - ${progress}`;
    }).join('\n');
  }
  
  static formatStepHeader(lesson: string, step: string): string {
    return `📘 Lesson: ${lesson}\n📝 Step: ${step}`;
  }
  
  static formatProgressSummary(tutorial: Tutorial): string {
    const completedSteps = this.countCompletedSteps(tutorial);
    const totalSteps = this.countTotalSteps(tutorial);
    const percentage = Math.round((completedSteps / totalSteps) * 100);
    return `Progress: ${completedSteps}/${totalSteps} steps completed (${percentage}%)`;
  }
}
```

### 3. Error Handling & Recovery

```typescript
class TutorialErrorHandler {
  // Graceful degradation
  async handleCorruptedState(): Promise<TutorialState> {
    logger.warn('Corrupted state detected, creating fresh state');
    return this.createFreshState();
  }
  
  // Content loading failures
  async handleMissingContent(tutorialName: string, lessonName: string, stepName: string): Promise<string> {
    return `# Content Not Found\n\nThe requested tutorial step could not be loaded. This may indicate:\n- Missing tutorial files\n- Corrupted installation\n\nPlease try:\n1. Restarting the tutorial\n2. Checking for updates\n3. Reporting this issue if it persists`;
  }
  
  // Navigation errors
  handleInvalidNavigation(requested: string, available: string[]): string {
    return `Tutorial "${requested}" not found.\n\nAvailable tutorials:\n${available.map(name => `- ${name}`).join('\n')}`;
  }
}
```

## Integration with Existing Systems

### 1. Documentation Server Integration

```typescript
// Tutorial tools extend existing documentation patterns
class TutorialTools extends BaseDocumentationTools {
  constructor(private docsServer: ExaDocsServer) {
    super();
  }
  
  // Cross-reference with documentation
  async enrichWithDocsReferences(stepContent: string): Promise<string> {
    // Add relevant documentation links
    // Reference API endpoints covered in the step
    // Link to examples and integration guides
  }
}
```

### 2. Orchestration Examples Integration

```typescript
// Connect tutorial content to real orchestration workflows
class OrchestrationTutorialBridge {
  async loadOrchestrationExample(exampleName: string): Promise<string> {
    // Load from /orchestrations/ directory
    // Adapt for tutorial step-by-step presentation
    // Break complex workflows into learnable chunks
  }
  
  async generateTutorialFromOrchestration(orchestrationPath: string): Promise<Tutorial> {
    // Auto-generate tutorial content from orchestration workflows
    // Create progressive complexity learning path
    // Extract key concepts and teaching points
  }
}
```

## Testing Strategy

### 1. Tutorial Flow Testing

```typescript
describe('Tutorial Flow', () => {
  test('complete tutorial progression', async () => {
    const state = await tutorialEngine.startTutorial('getting-started');
    
    // Test each step progression
    for (let i = 0; i < getTotalSteps('getting-started'); i++) {
      const stepContent = await tutorialEngine.nextStep();
      expect(stepContent).toContain('📘 Lesson:');
      expect(stepContent).toContain('📝 Step:');
    }
    
    // Verify completion
    const finalState = await tutorialEngine.getStatus();
    expect(finalState.tutorials[0].status).toBe(2); // completed
  });
});
```

### 2. Content Wrapping Testing

```typescript
describe('Content Wrapping', () => {
  test('tutoring prompt injection', async () => {
    const rawContent = '# Hello World\nThis is a test step.';
    const wrapped = await contentLoader.wrapForTutoring(rawContent, mockStep);
    
    expect(wrapped).toContain('You are a skilled programming tutor');
    expect(wrapped).toContain('nextExaTutorialStep');
    expect(wrapped).toContain(rawContent);
  });
});
```

### 3. Terminal Output Testing

```typescript
describe('Terminal Formatting', () => {
  test('progress indicators', () => {
    const output = TutorialFormatter.formatTutorialList(mockTutorials);
    expect(output).toMatch(/[⬜🔶✅]/); // Contains status emojis
    expect(output).toMatch(/\d+\. .+ \(beginner,/); // Proper format
  });
});
```

## Performance Considerations

### 1. Lazy Loading Strategy

```typescript
class LazyTutorialLoader {
  // Only load current step content, not entire tutorials
  async loadCurrentStep(state: TutorialState): Promise<string> {
    const current = this.getCurrentStep(state);
    return await this.loadStepContent(current);
  }
  
  // Pre-load next step for smooth transitions
  async preloadNextStep(state: TutorialState): Promise<void> {
    const next = this.getNextStep(state);
    if (next) {
      this.loadStepContent(next); // Background loading
    }
  }
}
```

### 2. Memory Management

```typescript
class TutorialMemoryManager {
  private readonly MAX_CACHED_STEPS = 10;
  private stepCache: LRUCache<string, string>;
  
  // Efficient caching of recently accessed steps
  // Automatic cleanup of old content
  // Memory usage monitoring
}
```

## Deployment Strategy

### 1. NPM Package Integration

```json
{
  "name": "@exa/mcp-docs-server",
  "version": "2.0.0",
  "bin": {
    "exa-docs-server": "./dist/index.js"
  },
  "scripts": {
    "prepare-tutorials": "tsx scripts/prepare-tutorials.ts",
    "build": "tsup && npm run prepare-tutorials"
  }
}
```

### 2. Tutorial Content Distribution

```
dist/
├── tutorials/          # Processed tutorial content
├── tools/             # MCP tool implementations
├── server.js          # Main server
└── index.js           # CLI entry point
```

## Future Enhancements

### 1. Web Dashboard Integration (Optional)

Following Mastra's pattern, optionally provide web-based progress tracking:

```typescript
interface WebDashboard {
  // Optional user registration
  registerUser(email: string): Promise<{deviceId: string, key: string}>;
  
  // Progress synchronization
  syncProgress(deviceId: string, state: TutorialState): Promise<void>;
  
  // Web view
  getProgressUrl(deviceId: string): string; // https://exa.ai/tutorials/{deviceId}
}
```

### 2. Community Features

```typescript
interface CommunityFeatures {
  // Tutorial sharing
  exportTutorialProgress(): Promise<string>;
  importTutorialProgress(data: string): Promise<void>;
  
  // Custom tutorials
  createCustomTutorial(definition: TutorialDefinition): Promise<Tutorial>;
  shareCustomTutorial(tutorial: Tutorial): Promise<string>;
}
```

### 3. Advanced Analytics

```typescript
interface TutorialAnalytics {
  // Usage tracking (opt-in)
  trackStepCompletion(tutorialName: string, stepName: string): void;
  trackDropoffPoints(): Promise<AnalyticsReport>;
  
  // Personalization
  suggestNextTutorial(completedTutorials: string[]): Promise<string>;
  adaptDifficultyLevel(userProgress: TutorialState): Promise<void>;
}
```

## Success Metrics

### 1. User Experience Metrics

- **Completion Rate**: % of users who complete started tutorials
- **Time to First Success**: Time from start to first completed step
- **Drop-off Points**: Where users abandon tutorials
- **Return Rate**: % of users who return to continue tutorials

### 2. Technical Performance

- **Response Time**: < 100ms for step navigation
- **Memory Usage**: < 256MB for tutorial system
- **Content Loading**: < 50ms for step content
- **State Persistence**: 100% reliability across sessions

### 3. Content Quality

- **Accuracy**: 0 errors in tutorial code examples
- **Completeness**: 100% coverage of core Exa features
- **Clarity**: User feedback on step clarity
- **Progression**: Logical skill building across tutorials

## Conclusion

This enhanced specification transforms the Exa tutorial system from a documentation reader into an interactive learning companion. By incorporating Mastra's proven patterns - especially the content wrapping system and terminal-optimized output - we create a tutorial experience that:

1. **Guides Rather than Dumps**: AI acts as a tutor, not a content displayer
2. **Optimizes for Terminal Use**: Concise, emoji-rich output that works in CLI environments
3. **Maintains Offline Capability**: All functionality works without internet connectivity
4. **Provides Progressive Learning**: Bite-sized steps that build upon each other
5. **Preserves State Reliably**: Robust local storage with corruption recovery

The key innovation is the content wrapping system that transforms raw tutorial content into tutoring prompts, instructing the AI to behave as an interactive guide rather than a passive information source. This single change, combined with terminal-optimized formatting, creates a fundamentally different and superior user experience for CLI-based learning.

The system maintains the offline-first, local-only approach of the original specification while dramatically improving the user experience through proven UX patterns from Mastra's successful implementation.