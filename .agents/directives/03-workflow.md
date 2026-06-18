# 03. Workflow Directive for AI Agents

This directive governs branches, commits, staging, push safety, and documentation workflow.

## Branch Strategy

Use the repository's established branch model. If no model exists, use this conservative default:

- `main` - stable baseline
- short-lived feature, fix, documentation, or agent branches

Daily work rules:

- Do ordinary work on the current task branch unless the user asks to switch.
- Do not commit directly to the stable branch for normal feature work unless this repository intentionally uses trunk-based development.
- Before branch-changing commands, run `git status --short --branch` and make sure uncommitted work will not be lost.
- Do not delete branches unless the user explicitly requests deletion.

## Remote and Push Rules

- Use remote name `origin` unless the repository already has a different intentional remote configuration.
- Before pushing, verify remotes with `git remote -v`.
- If no remote is configured, ask the user for the intended repository URL before pushing.
- Never force-push unless the user explicitly requests rewritten history.
- If force-push is explicitly requested, use `--force-with-lease`, never plain `--force`.
- Do not publish private, generated, large, or local-only files.

## Commit Message Rules

Before committing, inspect recent human-authored commit style when Git history exists:

```bash
git log -5 --format=full
```

Match the established human style when it exists. If no style exists, use Conventional Commits:

```text
<type>: <short description>
```

For non-trivial commits, use concise file-scoped body bullets:

```text
<type>: <short description>

- path/to/file:
  change summary
- path/to/other-file:
  change summary
```

Rules:

- Keep the subject concise.
- Use Korean for prose commit messages unless the user explicitly requests another language.
- Do not include `Co-Authored-By`, tool-generated trailers, marketing text, or hidden agent metadata unless the user explicitly asks.
- Do not include secrets, environment values, private URLs, or local machine paths.

## Commit Types

Use the dominant intent:

| Type | Use |
| --- | --- |
| `feat` | New user-facing feature or capability |
| `fix` | Bug fix or regression fix |
| `docs` | Documentation-only changes |
| `style` | Formatting-only changes with no behavior impact |
| `refactor` | Code restructuring without feature or bug-fix intent |
| `perf` | Performance improvement |
| `test` | Test-only changes |
| `build` | Build config, project setup, dependency, tooling, or automation changes |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance that does not fit another type |
| `delete` | Intentional removal of unused code, assets, docs, config, or placeholders |
| `revert` | Reverting a previous commit |

## Commit Grouping and Staging

- Do not group unrelated changes into one commit.
- Stage only files needed for the current commit.
- Keep generated files, lockfiles, code, docs, and assets separated when they represent different concerns.
- If unrelated local changes already exist, leave them untouched and mention them when relevant.
- Before staging or committing, run `git status --short`.

## Amend and Rewrite Safety

- Preserve changelists, authorship, and dates when the task is only to amend commit messages.
- Push rewritten history only when explicitly requested.
- Use `--force-with-lease` for approved history rewrites.

## Documentation Workflow

- Human-facing docs live under `Docs/` or the repository's chosen docs folder.
- AI-specific directives live under `.agents/directives/`.
- Keep `AGENTS.md` as the canonical manifest that points to component directive documents.
- Update `README.md` only for project overview, setup, usage, and user-facing repository information.
- Prefer updating an existing relevant docs file before creating a new one.
- Avoid miscellaneous root-level markdown files unless the repository explicitly allows them.
- Treat `.agents/work/` as temporary scratch space only.
