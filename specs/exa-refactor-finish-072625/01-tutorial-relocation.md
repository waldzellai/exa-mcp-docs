# Tutorial Content Relocation Specification

## Executive Summary

This specification defines the relocation of tutorial content from the root directory to the correct location within the exa-mcp-docs project structure, ensuring the tutorial system can properly load and serve interactive learning content.

## Problem Statement

The EXA tutorial content is currently located in multiple places:
- `/tutorials/` (root directory) - Partial content
- `/trees/implement-tutorial-system-1752668749/tutorials/` - Complete content
- Expected location by code: `/exa-mcp-docs/tutorials/`

This misalignment prevents the tutorial system from functioning despite being fully implemented.

## Proposed Solution

### Option 1: Move Content (Recommended)

Move the complete tutorial content from `/trees/implement-tutorial-system-1752668749/tutorials/` to `/exa-mcp-docs/tutorials/`.

**Advantages:**
- No code changes required
- Follows expected project structure
- Clean separation of concerns

**Implementation Steps:**
1. Create `/exa-mcp-docs/tutorials/` directory
2. Copy all content from `/trees/implement-tutorial-system-1752668749/tutorials/`
3. Verify tutorial.json files are intact
4. Remove obsolete tutorial directories

### Option 2: Update Content Loader Path

Modify the `TutorialContentLoader` to use a configurable path.

**Changes Required:**
```typescript
// In content-loader.ts
constructor(tutorialDir: string = process.env.EXA_TUTORIAL_DIR || '../tutorials') {
  this.tutorialDir = tutorialDir;
}
```

**Advantages:**
- More flexible configuration
- Supports different deployment scenarios

**Disadvantages:**
- Requires code changes
- Adds configuration complexity

## Directory Structure

### Expected Structure
```
exa-mcp-docs/
├── src/
│   ├── index.ts
│   ├── tools/
│   └── tutorial/
├── tutorials/
│   ├── getting-started/
│   │   ├── 01-introduction/
│   │   │   ├── 01-welcome.md
│   │   │   ├── 02-setup.md
│   │   │   └── 03-first-search.md
│   │   ├── 02-basic-search/
│   │   └── tutorial.json
│   ├── research-endpoint/
│   │   └── tutorial.json
│   ├── retrieval-orchestrations/
│   │   └── tutorial.json
│   └── websets/
│       └── tutorial.json
└── package.json
```

## Validation Criteria

1. **Path Resolution**: Tutorial content loads without file not found errors
2. **Content Integrity**: All markdown files and tutorial.json metadata intact
3. **Tutorial Discovery**: `listAvailableTutorials()` returns all four tutorials
4. **Step Loading**: Individual steps load with proper content wrapping

## Testing Plan

1. Unit tests for content loader with new path
2. Integration test loading each tutorial
3. Manual verification of tutorial flow
4. Verify no broken references in content

## Migration Script

```bash
#!/bin/bash
# Tutorial content migration script

SOURCE_DIR="trees/implement-tutorial-system-1752668749/tutorials"
TARGET_DIR="exa-mcp-docs/tutorials"

# Create target directory
mkdir -p "$TARGET_DIR"

# Copy tutorial content
cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"

# Verify migration
echo "Tutorials migrated:"
find "$TARGET_DIR" -name "tutorial.json" | wc -l
echo "Expected: 4"

# Clean up old locations (after verification)
# rm -rf tutorials/
# Keep trees/ version for reference
```

## Rollback Plan

If issues arise:
1. Remove `/exa-mcp-docs/tutorials/`
2. Revert to path configuration option
3. Update documentation with new path requirements

## Success Metrics

- Tutorial tools successfully discover all tutorials
- No file loading errors in tutorial system
- Tutorial progress tracking functions correctly
- All tutorial content accessible through MCP tools

## Timeline

- **Immediate**: Execute migration (5 minutes)
- **Verification**: Test tutorial loading (10 minutes)
- **Documentation**: Update README with structure (5 minutes)

Total estimated time: 20 minutes