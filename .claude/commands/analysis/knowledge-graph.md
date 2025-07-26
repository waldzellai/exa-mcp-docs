# Knowledge Graph Builder with Memory Intelligence

Advanced knowledge graph construction using multi-agent orchestration and persistent memory via mem0 for semantic relationship discovery and evolution tracking.

## Variables

ROOT_PATH: $ARGUMENTS
DEPTH: "surface" | "comprehensive" | "architectural"
MEMORY_SCOPE: "session" | "project" | "global"
ORCHESTRATION_MODE: "parallel_agents" | "sequential_deep_dive" | "collaborative_synthesis"

## Core Philosophy

Transform static code analysis into **dynamic knowledge evolution** by combining real-time codebase analysis with persistent memory intelligence. Each knowledge graph session builds upon previous discoveries, creating an ever-evolving understanding of system architecture and relationships.

---

## Specialized Analysis Agents

### 🔍 **Code Structure Agent**
**Role**: Deep codebase analysis and pattern extraction
**Capabilities**:
- File structure and dependency mapping
- Function/class relationship analysis
- Import/export graph construction
- Code pattern identification

**MCP Tools**: File reading, directory traversal, code parsing

### 🧠 **Memory Intelligence Agent** 
**Role**: Persistent knowledge management and retrieval
**Capabilities**:
- Historical decision context retrieval
- Architectural evolution tracking
- Team knowledge and expertise mapping
- Pattern memory and reuse

**MCP Tools**: `mem0-mcp__add-memory`, `mem0-mcp__search-memories`

### 🔗 **Relationship Synthesis Agent**
**Role**: Cross-domain relationship discovery and mapping
**Capabilities**:
- Semantic relationship inference
- Hidden dependency detection
- Pattern correlation across modules
- Conceptual bridge identification

**MCP Tools**: Graph analysis, pattern matching

### 📊 **Knowledge Gap Agent**
**Role**: Missing knowledge identification and documentation analysis
**Capabilities**:
- Documentation coverage analysis
- Undocumented decision discovery
- Expertise gap identification
- Knowledge debt assessment

**MCP Tools**: Documentation analysis, git history analysis

### 🎯 **Context Enrichment Agent**
**Role**: External knowledge integration and validation
**Capabilities**:
- Best practice correlation
- Industry pattern matching
- Technology trend alignment
- Architectural validation

**MCP Tools**: `exa__web_search`, `context7__get-library-docs`, `github__search_code`

---

## Orchestration Patterns

### Parallel Knowledge Discovery
```typescript
interface ParallelKnowledgeOrchestration {
  initialization: {
    memory_context_retrieval: "Load existing knowledge about the codebase"
    agent_deployment: "Deploy all 5 specialized agents simultaneously"
    shared_knowledge_space: "Create collaborative memory workspace"
  }
  
  parallel_analysis: {
    code_structure_mapping: "Real-time file and dependency analysis"
    memory_pattern_retrieval: "Historical context and decision discovery"
    relationship_inference: "Cross-module semantic connection detection"
    gap_identification: "Missing knowledge and documentation analysis"
    context_enrichment: "External validation and best practice correlation"
  }
  
  synthesis: {
    knowledge_graph_construction: "Multi-dimensional relationship mapping"
    memory_persistence: "Store new discoveries for future sessions"
    insight_generation: "Emergent pattern and architectural insight discovery"
  }
}
```

### Sequential Deep Dive Analysis
```typescript
interface SequentialAnalysis {
  phase_1: "Code Structure Agent performs comprehensive mapping"
  phase_2: "Memory Intelligence Agent enriches with historical context"
  phase_3: "Relationship Synthesis Agent discovers hidden connections"
  phase_4: "Knowledge Gap Agent identifies missing elements"
  phase_5: "Context Enrichment Agent validates and enhances findings"
  synthesis: "Collaborative knowledge graph construction"
}
```

### Collaborative Knowledge Evolution
```typescript
interface CollaborativeEvolution {
  continuous_learning: "Each session builds upon previous knowledge"
  cross_validation: "Agents validate each other's discoveries"
  emergent_insights: "System-level understanding beyond individual analysis"
  memory_evolution: "Knowledge base grows and refines over time"
}
```

---

## Advanced Memory Integration

### Knowledge Persistence Strategy
```typescript
interface KnowledgeMemorySchema {
  architectural_decisions: {
    decision_id: string
    context: string
    rationale: string
    alternatives_considered: string[]
    impact_assessment: string
    timestamp: Date
    decision_maker: string
  }
  
  code_patterns: {
    pattern_id: string
    pattern_type: "structural" | "behavioral" | "creational"
    implementation_details: string
    usage_contexts: string[]
    evolution_history: string[]
    quality_metrics: object
  }
  
  team_expertise: {
    person_id: string
    expertise_areas: string[]
    code_ownership: string[]
    decision_involvement: string[]
    knowledge_depth: number
  }
  
  system_relationships: {
    relationship_id: string
    source_component: string
    target_component: string
    relationship_type: string
    strength: number
    discovery_method: string
    validation_status: string
  }
}
```

### Memory-Enhanced Analysis Workflows

#### Historical Context Integration
```bash
# Retrieve architectural evolution context
/knowledge-graph "authentication-system" --memory-scope=project

Memory Intelligence Agent:
- Searches mem0 for previous authentication decisions
- Retrieves team discussions and rationale
- Maps evolution of security patterns
- Identifies recurring architectural themes

Output: Context-rich knowledge graph with historical depth
```

#### Pattern Evolution Tracking
```bash
# Track how patterns evolve across the codebase
/knowledge-graph "error-handling-patterns" --depth=comprehensive

Process:
- Code Structure Agent: Maps current error handling implementations
- Memory Intelligence Agent: Retrieves historical error handling decisions
- Relationship Synthesis Agent: Identifies pattern evolution paths
- Context Enrichment Agent: Validates against industry best practices

Output: Pattern evolution timeline with decision rationale
```

#### Team Knowledge Mapping
```bash
# Map team expertise and code ownership
/knowledge-graph "team-knowledge-map" --orchestration=collaborative

Execution:
- Analyzes git history for code ownership patterns
- Retrieves stored team expertise from mem0
- Maps decision involvement and knowledge areas
- Identifies knowledge gaps and single points of failure

Output: Comprehensive team expertise and knowledge distribution map
```

---

## Graph Node Types

### Code Entities
- **Modules**: Files, classes, functions with semantic purpose
- **Dependencies**: Import relationships and coupling analysis
- **Patterns**: Recurring implementation strategies
- **Interfaces**: API boundaries and contracts

### Knowledge Entities  
- **Decisions**: Architectural choices with context and rationale
- **Expertise**: Team knowledge and ownership mapping
- **Evolution**: Change patterns and historical context
- **Gaps**: Missing documentation and knowledge debt

### Relationship Types
- **"implements_pattern"**: Code implementing specific patterns
- **"depends_on"**: Direct and transitive dependencies
- **"evolved_from"**: Historical evolution relationships
- **"decided_by"**: Decision ownership and context
- **"similar_to"**: Pattern and structural similarities
- **"validates"**: External validation and best practice alignment
- **"contradicts"**: Conflicting patterns or decisions

---

## Advanced Features

### Memory-Driven Insights
```typescript
interface MemoryDrivenAnalysis {
  pattern_reuse_detection: "Identify where successful patterns could be applied"
  decision_consistency_analysis: "Find conflicting architectural decisions"
  knowledge_gap_prioritization: "Rank documentation needs by impact"
  expertise_optimization: "Suggest knowledge sharing opportunities"
}
```

### Temporal Knowledge Analysis
```typescript
interface TemporalAnalysis {
  architectural_drift_detection: "Identify divergence from original decisions"
  pattern_lifecycle_tracking: "Monitor pattern adoption and deprecation"
  team_knowledge_evolution: "Track expertise development over time"
  decision_impact_assessment: "Measure long-term effects of architectural choices"
}
```

### Predictive Knowledge Intelligence
```typescript
interface PredictiveIntelligence {
  refactoring_opportunity_identification: "Predict beneficial refactoring targets"
  knowledge_debt_forecasting: "Anticipate future documentation needs"
  pattern_evolution_prediction: "Suggest pattern improvement directions"
  team_expertise_planning: "Identify future knowledge development needs"
}
```

---

## Implementation Workflows

### 1. **Comprehensive System Analysis**

```bash
/knowledge-graph "entire-system" --depth=architectural --memory-scope=global

Orchestration:
- Parallel deployment of all specialized agents
- Memory retrieval of all historical system knowledge
- Cross-module relationship discovery and validation
- External best practice correlation and validation
- Comprehensive knowledge graph with temporal depth

Output: Complete system understanding with historical context
```

### 2. **Focused Component Deep Dive**

```bash
/knowledge-graph "user-authentication" --orchestration=sequential --memory-scope=project

Process:
- Sequential deep analysis of authentication components
- Historical decision context retrieval from mem0
- Security pattern validation against industry standards
- Team expertise mapping for authentication domain
- Focused knowledge graph with actionable insights

Output: Component-specific knowledge with implementation guidance
```

### 3. **Knowledge Gap Assessment**

```bash
/knowledge-graph "documentation-gaps" --depth=comprehensive

Execution:
- Systematic analysis of code vs documentation coverage
- Memory retrieval of undocumented decisions and rationale
- Priority ranking of documentation needs by system impact
- Team expertise mapping for documentation assignment

Output: Prioritized documentation roadmap with ownership suggestions
```

---

## Memory Persistence Integration

### Automatic Knowledge Capture
```typescript
interface AutomaticCapture {
  discovery_persistence: "Automatically store new architectural insights"
  pattern_cataloging: "Build reusable pattern library in mem0"
  decision_documentation: "Capture decision context and rationale"
  expertise_tracking: "Update team knowledge profiles"
}
```

### Cross-Session Learning
```typescript
interface CrossSessionLearning {
  cumulative_intelligence: "Each analysis builds upon previous sessions"
  pattern_refinement: "Continuously improve pattern recognition"
  relationship_strengthening: "Reinforce validated relationships"
  knowledge_validation: "Cross-validate discoveries across sessions"
}
```

### Collaborative Knowledge Building
```typescript
interface CollaborativeKnowledge {
  team_contribution_integration: "Incorporate team feedback into knowledge base"
  decision_rationale_capture: "Store reasoning behind architectural choices"
  expertise_sharing: "Facilitate knowledge transfer between team members"
  institutional_memory: "Preserve organizational knowledge beyond individual tenure"
}
```

---

## Output Artifacts

### Interactive Knowledge Graph
- **Mermaid Diagrams**: Multi-layered visual representations
- **Interactive Exploration**: Clickable nodes with detailed context
- **Temporal Views**: Historical evolution visualization
- **Relationship Filtering**: Focus on specific relationship types

### Memory-Enhanced Reports
- **Architectural Decision Records**: Context-rich decision documentation
- **Pattern Catalog**: Reusable implementation patterns with usage guidance
- **Expertise Maps**: Team knowledge distribution and development paths
- **Knowledge Debt Assessment**: Prioritized documentation and knowledge needs

### Actionable Intelligence
- **Refactoring Recommendations**: Data-driven improvement suggestions
- **Knowledge Sharing Plans**: Targeted expertise development strategies
- **Documentation Roadmaps**: Prioritized documentation creation plans
- **Architectural Validation**: Consistency and best practice compliance reports

---

## Integration with Other Commands

### With Ulysses Protocol
```bash
# Use knowledge graph for problem context in debugging
/ulysses-protocol "API performance issues" --context-source=knowledge-graph
```

### With Pattern Synthesizer
```bash
# Enhance pattern discovery with knowledge graph relationships
/pattern-synthesizer "error-handling" --knowledge-context=graph
```

### With Implementation Variants
```bash
# Generate implementation options based on knowledge graph insights
/implementation-variants "authentication-refactor" --graph-guided=true
```

---

## Example Advanced Usage

### System Architecture Evolution Analysis
```bash
/knowledge-graph "microservices-migration" --depth=architectural --memory-scope=global

Results in:
- Complete migration decision history and rationale
- Service boundary evolution and optimization opportunities
- Team expertise mapping for migration execution
- Risk assessment based on historical patterns
- Implementation roadmap with knowledge-driven priorities
```

### Cross-Team Knowledge Synthesis
```bash
/knowledge-graph "api-design-patterns" --orchestration=collaborative --memory-scope=project

Produces:
- Unified API design pattern catalog across teams
- Decision consistency analysis and conflict resolution
- Best practice validation and improvement recommendations
- Knowledge sharing opportunities and expertise development plans
```

---

## Benefits for Development Teams

### For Individual Developers
- **Accelerated Onboarding**: Rich context about system architecture and decisions
- **Informed Decision Making**: Historical context and rationale for architectural choices
- **Pattern Reuse**: Discover and apply proven patterns from across the codebase
- **Knowledge Discovery**: Uncover hidden relationships and system insights

### For Teams
- **Institutional Memory**: Preserve and evolve organizational knowledge
- **Consistent Architecture**: Maintain architectural coherence across projects
- **Knowledge Sharing**: Facilitate expertise transfer and collaborative learning
- **Technical Debt Management**: Data-driven prioritization of refactoring efforts

### For Organizations
- **Architectural Governance**: Ensure consistency and quality across systems
- **Knowledge Asset Management**: Treat architectural knowledge as valuable IP
- **Risk Mitigation**: Identify and address knowledge gaps and dependencies
- **Innovation Acceleration**: Build upon proven patterns and successful decisions

---

## Meta-Learning and Evolution

The Knowledge Graph Builder continuously evolves through:

- **Pattern Recognition Improvement**: Enhanced ability to identify architectural patterns
- **Relationship Discovery Refinement**: Better detection of hidden system relationships  
- **Memory Organization Optimization**: Improved knowledge categorization and retrieval
- **Insight Generation Enhancement**: More sophisticated architectural intelligence
- **Team Adaptation**: Customization to team-specific patterns and preferences

Each knowledge graph session contributes to collective architectural intelligence, making the system more effective for all team members and future analysis sessions.

---

*"Knowledge graphs are not just about mapping what exists - they're about understanding why it exists, how it evolved, and where it should go next."*

**Status**: Ready for immediate implementation with mem0 MCP integration
**Architecture**: Designed for persistent knowledge evolution and collaborative intelligence
