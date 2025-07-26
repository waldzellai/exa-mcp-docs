# Initial Refactor: Example Retrieval and Implementation Specification

## Executive Summary

This specification defines a comprehensive workflow for retrieving, synthesizing, and implementing working code examples from the official Exa SDK repositories into the EXA MCP Documentation Server. The goal is to transform the current documentation-focused examples tool into a practical implementation assistant that provides complete, runnable code examples that serve as templates for MCP clients to adapt and customize.

## Problem Statement

Current state:
- Examples tool returns documentation pages with explanations, not runnable code
- MCP clients (AI assistants) need working implementations as starting points
- Official SDK repositories contain tested, working examples
- No automated process to keep examples synchronized

Desired state:
- Examples tool serves complete, runnable implementations as templates
- MCP clients can retrieve, understand, and adapt these templates for users' specific needs
- Code is sourced from official repositories (source of truth)
- Examples include setup instructions, dependencies, and cost optimization
- Automated workflow for updates

## Design Philosophy

**Templates, Not Prescriptions**: The examples served by this tool are designed to be:
- **Starting points** that MCP clients can modify, combine, and extend
- **Reference implementations** showing best practices and patterns
- **Adaptable templates** that can be customized for specific use cases
- **Learning resources** that demonstrate proper API usage

MCP clients using this tool should treat examples as malleable templates that can be:
- Modified to fit the user's exact requirements
- Combined with other examples to create complex solutions
- Simplified or expanded based on user expertise
- Integrated with existing codebases seamlessly

## Workflow Architecture

### Phase 1: Retrieval Orchestration

**Workflow Pattern**: MCP Orchestrate with parallel execution

```dsl
# RETRIEVAL ORCHESTRATION
# Fetch examples from official SDK repositories in parallel

=> $py_examples = mcp__github__search_code(
    q="repo:exa-labs/exa-py path:examples extension:py",
    per_page=50
)

=> $js_examples = mcp__github__search_code(
    q="repo:exa-labs/exa-js path:examples extension:js extension:ts",
    per_page=50
)

# Get repository metadata for versioning
=> $py_repo = mcp__github__get_repository(owner="exa-labs", repo="exa-py")
=> $js_repo = mcp__github__get_repository(owner="exa-labs", repo="exa-js")

# Priority examples retrieval
@ example in PRIORITY_EXAMPLES -> $contents[] = mcp__github__get_file_contents(
    owner=$example.owner,
    repo=$example.repo,
    path=$example.path,
    mode="full"
)
```

**Priority Examples List**:
```yaml
PRIORITY_EXAMPLES:
  - owner: exa-labs
    repo: exa-py
    path: examples/rag/Exa_RAG.py
    category: rag
    
  - owner: exa-labs
    repo: exa-py
    path: examples/research/sync_example.py
    category: research
    
  - owner: exa-labs
    repo: exa-py
    path: examples/basic_search.py
    category: search
    
  - owner: exa-labs
    repo: exa-py
    path: examples/chat_completion.py
    category: integration
    
  - owner: exa-labs
    repo: exa-js
    path: examples/zod_answer_example.ts
    category: typescript
```

### Phase 2: Synthesis Workflow

**Workflow Pattern**: MCP Chain with transformation pipeline

```bash
# SYNTHESIS CHAIN
# Process raw examples into structured format

# Step 1: Extract and parse
extract_metadata | input=$contents, extract_patterns=["imports", "api_key", "main_function"]

# Step 2: Enhance with context
enhance_example | 
  input=$previous.result,
  add_sections=["prerequisites", "setup", "cost_estimate", "common_errors"]

# Step 3: Generate variations
generate_variations |
  input=$previous.result,
  variations=["async", "error_handling", "pagination"]

# Step 4: Format for serving
format_for_mcp |
  input=$previous.result,
  output_format="structured_json"
```

**Synthesis Rules**:

1. **Metadata Extraction**:
   ```typescript
   interface ExampleMetadata {
     title: string;
     description: string;
     category: UseCase;
     language: 'python' | 'javascript' | 'typescript';
     dependencies: string[];
     apiEndpoints: string[];
     estimatedCost: CostEstimate;
     lastUpdated: string;
     sourceUrl: string;
   }
   ```

2. **Enhancement Template**:
   ```markdown
   # {title}
   
   ## Template Overview
   This example demonstrates {core_functionality}. Feel free to adapt, modify, or extend this code to meet your specific requirements.
   
   ## Prerequisites
   - {dependencies}
   - API Key setup: {api_key_instructions}
   
   ## Complete Implementation
   ```{language}
   {full_code}
   ```
   
   ## Customization Points
   - **Search Parameters**: Modify {customizable_params} to adjust behavior
   - **Response Processing**: The {processing_function} can be adapted for your data structure
   - **Error Handling**: Extend {error_handler} for your specific error cases
   - **Integration**: This example can be combined with {compatible_examples}
   
   ## Setup Instructions
   1. Install dependencies: {install_command}
   2. Set environment variables: {env_setup}
   3. Run: {run_command}
   
   ## Cost Optimization
   - Estimated cost: {cost_per_1000}
   - Tips: {optimization_tips}
   
   ## Common Adaptations
   - {adaptation_1}: {how_to_adapt_1}
   - {adaptation_2}: {how_to_adapt_2}
   ```

3. **Variation Generation**:
   - Base example → Async version
   - Base example → Error handling version
   - Base example → Batched/paginated version

### Phase 3: Implementation Recipe

**Workflow Pattern**: MCP Recipe with validation

```json
{
  "name": "implement-examples",
  "description": "Integrate processed examples into MCP server",
  "steps": [
    {
      "action": "create_example_store",
      "operations": [
        "mkdir -p exa-mcp-docs/data/examples",
        "create examples-manifest.json",
        "create category-index.json"
      ]
    },
    {
      "action": "write_examples",
      "parallel": true,
      "operations": [
        "write_structured_json",
        "write_markdown_backup",
        "update_manifest"
      ]
    },
    {
      "action": "update_tools",
      "operations": [
        "modify examples-tool.ts",
        "add getCompleteExample method",
        "add getExampleVariations method",
        "update tool response formatting"
      ]
    },
    {
      "action": "validate",
      "operations": [
        "test example loading",
        "verify JSON structure",
        "check code syntax",
        "validate dependencies"
      ]
    }
  ]
}
```

## Implementation Details

### 1. Example Store Structure

```
exa-mcp-docs/
├── data/
│   └── examples/
│       ├── manifest.json
│       ├── categories.json
│       ├── python/
│       │   ├── rag-basic.json
│       │   ├── rag-streaming.json
│       │   ├── research-sync.json
│       │   └── research-async.json
│       └── javascript/
│           ├── search-basic.json
│           ├── answer-structured.json
│           └── research-zod.json
```

### 2. Enhanced Examples Tool

```typescript
// Modified examples-tool.ts
export class ExaExamplesTool extends BaseTool {
  private exampleStore: ExampleStore;
  
  async execute(args: ExaExamplesArgs): Promise<string> {
    // New behavior: return complete implementations as adaptable templates
    if (args.example) {
      return this.getCompleteExample(args.example, args.includeVariations);
    }
    
    if (args.useCase) {
      return this.getExamplesByUseCase(args.useCase, {
        complete: true,
        includeSetup: true,
        includeCosts: true,
        includeAdaptationGuide: true
      });
    }
  }
  
  private async getCompleteExample(
    name: string, 
    includeVariations: boolean = false
  ): Promise<string> {
    const example = await this.exampleStore.get(name);
    
    return this.formatCompleteExample(example, {
      includePrerequisites: true,
      includeFullCode: true,
      includeCustomizationPoints: true,
      includeSetup: true,
      includeCostEstimates: true,
      includeVariations: includeVariations,
      includeCommonAdaptations: true,
      adaptationContext: {
        message: "This is a template implementation. Modify as needed for your specific use case.",
        customizableElements: example.customizationPoints,
        compatibleExamples: example.relatedExamples
      }
    });
  }
}
```

### 3. Automated Update Workflow

**Weekly Sync Recipe**:
```yaml
schedule: "weekly"
workflow:
  - check_for_updates:
      compare: ["commit_hash", "file_modified_date"]
  - fetch_changed_examples:
      filter: "modified_since_last_sync"
  - reprocess_examples:
      maintain_customizations: true
  - validate_and_deploy:
      run_tests: true
      rollback_on_failure: true
```

## Validation Criteria

### Retrieval Phase
- ✓ All priority examples successfully fetched
- ✓ Repository metadata captured for versioning
- ✓ No rate limit violations
- ✓ Fallback for missing examples

### Synthesis Phase
- ✓ All examples have complete metadata
- ✓ Code is syntactically valid
- ✓ Dependencies correctly identified
- ✓ Cost estimates calculated
- ✓ Setup instructions complete

### Implementation Phase
- ✓ Examples load without errors
- ✓ Tool returns complete implementations
- ✓ Response time acceptable
- ✓ All categories populated

## Success Metrics

1. **Developer Experience**
   - Time to working code: Minimized
   - Copy-paste success rate: 100%
   - Setup clarity: No support questions

2. **Content Quality**
   - Examples run without modification: 95%+
   - Include error handling: 100%
   - Cost optimization tips: 100%

3. **Maintenance**
   - Sync with upstream: Weekly
   - Breaking change detection: Automated
   - Version tracking: Complete

## Rollout Plan

### Phase 1: Manual Pilot
- Manually execute retrieval workflow
- Process 5 priority examples
- Validate synthesis output
- Test with single example in tool

### Phase 2: Full Implementation
- Process all priority examples
- Implement enhanced tool methods
- Create example store
- Internal testing

### Phase 3: Automation
- Implement sync workflow
- Set up monitoring
- Document maintenance procedures
- Deploy to production

## Risk Mitigation

1. **GitHub API Rate Limits**
   - Cache all retrieved content
   - Implement exponential backoff
   - Use conditional requests

2. **Example Breaking Changes**
   - Version pinning option
   - Compatibility notes
   - Automated testing

3. **Storage Growth**
   - Limit example history to 3 versions
   - Compress archived examples
   - Monitor storage usage

## Future Enhancements

1. **Interactive Examples**
   - In-browser execution via CodeSandbox
   - Customizable parameters
   - Live API response preview

2. **Example Playground**
   - Combine multiple examples
   - Custom workflow builder
   - Share example combinations

3. **Community Examples**
   - User-submitted examples
   - Voting and curation
   - Integration with Discord

## MCP Client Usage Patterns

The enhanced examples tool enables MCP clients to:

1. **Retrieve and Adapt**
   ```
   User: "I need to search for recent AI news and summarize it"
   MCP Client: 
   - Retrieves basic search example
   - Adapts date filters for "recent"
   - Adds news category filter
   - Integrates summarization logic
   - Produces custom solution
   ```

2. **Combine Templates**
   ```
   User: "Build a research agent that finds and analyzes competitors"
   MCP Client:
   - Retrieves company research example
   - Retrieves competitor finder example
   - Merges approaches into unified solution
   - Adds custom analysis logic
   ```

3. **Progressive Enhancement**
   ```
   User: "Start simple, then add error handling and caching"
   MCP Client:
   - Provides basic implementation first
   - Retrieves error handling variation
   - Adds caching layer from patterns
   - Maintains working code throughout
   ```

## Conclusion

This workflow transforms the EXA examples tool from a documentation reader into a practical implementation assistant that provides adaptable templates. By leveraging official SDK examples and applying intelligent synthesis, MCP clients receive complete, working code that they can customize, combine, and extend to create tailored solutions for users' specific needs. The examples serve as starting points for creativity, not rigid prescriptions to follow.