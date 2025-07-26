# Implement Spec

Converts a specification document into actionable TODOs and checklist, implements it in a parallel git worktree, and provides merge guidance.

## Usage

```bash
/implement-spec <path-to-spec-file>
```

## Workflow

### Phase 1: Planning

1. **READ** the specification file provided as argument
2. **EXTRACT** requirements and create:
    - `TODOS.md`: Actionable implementation tasks
    - `CHECKLIST.md`: Completion verification criteria
3. **SAVE** both files in the worktree root for reference
4. **COMMIT** initial planning artifacts:
   ```bash
   git add TODOS.md CHECKLIST.md
   git commit -m "feat: initial spec implementation planning"
   ```

### Phase 2: Worktree Setup

1. **CREATE** new git worktree:
    ```bash
    git worktree add -b implement-spec-$(date +%s) ./trees/implement-spec-$(date +%s)
    ```
2. **COPY** necessary environment files (`.env`, `.env.local`, etc.) to worktree
3. **SETUP** development environment in worktree if needed
4. **COMMIT** worktree setup completion:
   ```bash
   git add .
   git commit -m "chore: setup isolated worktree for spec implementation"
   ```

### Phase 3: Implementation

1. **WORK** exclusively within the worktree directory
2. **FOLLOW** the TODO list systematically
3. **IMPLEMENT** all requirements from the specification
4. **TEST** implementation if testing is specified
5. **DOCUMENT** any deviations or additional considerations
6. **COMMIT REGULARLY** using these patterns:
   
   **After each TODO completion**:
   ```bash
   git add -A
   git commit -m "feat: complete [TODO_DESCRIPTION]"
   ```
   
   **Using MCP Git tools**:
   - Use `mcp__github__create_or_update_file` for individual file commits
   - Use `mcp__github__push_files` for batch commits
   - Use `mcp__github__create_branch` for feature branches within worktree
   
   **Commit message conventions**:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation updates
   - `refactor:` for code restructuring
   - `test:` for test additions/modifications
   - `chore:` for setup/maintenance tasks

7. **MID-IMPLEMENTATION CHECKPOINTS**:
   - Commit every 15-30 minutes of active development
   - Commit after completing each logical unit of work
   - Commit before switching contexts or taking breaks
   - Commit after successful test runs

### Phase 4: Verification

1. **REVIEW** the CHECKLIST.md against completed work
2. **MARK** each checklist item as complete/incomplete
3. **IDENTIFY** any gaps or missing requirements
4. **COMPLETE** any remaining work until checklist is 100% satisfied
5. **COMMIT** verification completion:
   ```bash
   git add CHECKLIST.md
   git commit -m "docs: mark implementation checklist as complete"
   ```

### Phase 5: Merge Decision

1. **PRESENT** completion summary to user:
    - Files created/modified
    - Checklist completion status
    - Any notable implementation decisions
    - **Git commit history** showing incremental progress
2. **ASK** user: "Implementation complete. Merge changes to main branch? (Y/n): "
3. **IF** user confirms:
    - Switch to main branch
    - Merge the implementation branch
    - Clean up worktree
    - **TAG** the release:
      ```bash
      git tag -a "spec-implement-$(date +%Y%m%d-%H%M)" -m "Completed spec implementation"
      ```
4. **IF** user declines:
    - Leave worktree for manual review
    - Provide instructions for manual merge
    - **PUSH** branch to remote for collaboration:
      ```bash
      git push origin implement-spec-[timestamp]
      ```

## Example

```bash
/implement-spec packages/evals/specs/docker-prioritization/cleanup-plan.md
```

This will:

1. Read the cleanup plan specification
2. Create TODOs for documentation cleanup tasks
3. Create checklist for verification
4. Set up parallel worktree
5. Execute all cleanup tasks
6. Verify completion against checklist
7. **Maintain detailed commit history** throughout the process
8. Prompt user for merge approval

## Output Files

In the worktree root:

- `TODOS.md`: Step-by-step implementation tasks
- `CHECKLIST.md`: Verification criteria
- `IMPLEMENTATION_NOTES.md`: Any deviations or additional context
- `COMMIT_LOG.md`: Summary of all commits made during implementation

## Git Commit Best Practices

### Frequency Guidelines
- **Every logical change**: Commit after completing each discrete task
- **Every 15-30 minutes**: During active development sessions
- **Before context switching**: Always commit before moving to different work
- **After tests pass**: Commit immediately when tests pass successfully

### Commit Message Template
```
[type]: [brief description]

[detailed explanation if needed]

Spec: [specification reference]
TODO: [TODO item number/title]
```

### Available Git Tools
- **Agent onboard**: Standard git CLI commands
- **MCP GitHub**: `mcp__github__*` tools for repository operations
- **MCP Git**: Platform-specific git integrations
- **Worktree management**: Built-in worktree creation and cleanup

## Safety Features

- All work happens in isolated git worktree
- User approval required before merging
- Main branch remains untouched until user confirms
- Worktree preserved if user declines merge for manual review
- **Complete commit history** maintained for audit trail and rollback capability