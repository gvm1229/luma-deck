# AGENTS.md

This is the canonical agent manifest for the LumaDeck project. AI assistants, coding agents, and automation tools should read this file before acting.

Detailed directives live under `.agents/directives/`. Tool-specific config directories should only hold tool-local settings.

## Project Context

- Project: `LumaDeck`
- Repo/folder/package name: `luma-deck`
- CLI command name: `lumadeck`
- Primary stack: TypeScript, Node.js, Slidev, Vue, Vite, Markdown, YAML frontmatter, UnoCSS-compatible utility styling
- Product type: AI-assisted HTML/JavaScript presentation generation tool
- Purpose: Convert user prompts into structured deck data, generate Slidev Markdown, and render interactive HTML/Vue presentations through Slidev
- Default response language: Korean
- Default human documentation language: Korean
- Default new code comment language: Korean, unless surrounding code clearly uses another language

## Core Product Direction

LumaDeck should be a clean wrapper and generator around Slidev, not a casual fork of Slidev core.

Preferred pipeline:

```text
User prompt -> LLM analysis -> Deck JSON -> validation -> Slidev Markdown -> Slidev dev/build/export
```

Key remembered decision:

- Keep a full Slidev checkout inside this project as `slidev/`, but treat it as local-only and gitignored.
- Use the embedded Slidev checkout as an internal runtime/reference engine.
- Build LumaDeck-owned code outside `slidev/`.
- Avoid modifying embedded Slidev unless explicitly asked; prefer adapters, generators, layouts, components, styles, and wrapper scripts.

## User Directives

AI agents must read and follow the relevant directive documents before acting:

- [`.agents/directives/01-behavior.md`](.agents/directives/01-behavior.md) - agent persona, communication, planning, execution, and validation behavior
- [`.agents/directives/02-code.md`](.agents/directives/02-code.md) - coding rules, dependencies, framework boundaries, tests, and source verification
- [`.agents/directives/03-workflow.md`](.agents/directives/03-workflow.md) - branches, commits, staging, push safety, and documentation workflow
- [`.agents/directives/04-reference-sources.md`](.agents/directives/04-reference-sources.md) - Slidev reference source, official docs, examples, and source precedence
- [`.agents/directives/05-architecture-and-files.md`](.agents/directives/05-architecture-and-files.md) - repository layout, generated files, architecture notes, and known pitfalls
- [`.agents/directives/06-security-safety.md`](.agents/directives/06-security-safety.md) - trust boundaries, secrets, destructive operations, and binary file safety
- [`.agents/directives/07-external-knowledge.md`](.agents/directives/07-external-knowledge.md) - live knowledge sources, web research scope, source quality, and external knowledge handling
- [`.agents/directives/08-tools.md`](.agents/directives/08-tools.md) - local tooling, package manager expectations, browser/editor tools, and fallback behavior
- [`.agents/directives/09-session-coordination.md`](.agents/directives/09-session-coordination.md) - multi-session edit coordination using ignored active-session manifests
- [`.agents/directives/10-documentation-style.md`](.agents/directives/10-documentation-style.md) - concise human-readable Korean documentation style
- [`.agents/directives/11-large-assets.md`](.agents/directives/11-large-assets.md) - handling large, generated, binary, or externally stored assets

User-authored directives under `.agents/directives/` take precedence over tool-local config on conflict.

## Human Documentation

Human-readable project documentation should live under `Docs/` unless a root document is conventional.

Common documents:

- `README.md` - project overview, setup, and usage notes
- `Docs/architecture.md` - durable architecture notes and implementation reasoning
- `Docs/decisions.md` - important decisions and tradeoffs
- `Docs/large-assets.md` - assets kept out of normal source control, if applicable

## File Locations

| Kind | Location | Tracked? | Notes |
| --- | --- | --- | --- |
| Canonical agent manifest | `AGENTS.md` | Yes | Root entrypoint for agents |
| AI directives | `.agents/directives/` | Yes | User-authored canonical directives |
| Optional local skills | `.agents/skills/` | Optional | Project-owned reusable skills, such as `ship` |
| Reusable prompt templates | `.agents/prompts/` | Optional | Shared prompt text |
| Prompt reference assets | `.agents/prompt-assets/` | No by default | Images or other large prompt references |
| Agent working notes | `.agents/work/` | No | Scratch notes for complex tasks |
| Session manifests | `.agents/work/active-sessions/*.md` | No | Per-session edit intent |
| Human project docs | `Docs/` | Yes | Human-facing documentation |
| Embedded Slidev checkout | `slidev/` | No | Local-only engine/reference clone |
| OMX session state | `.omx/` | No | Local assistant/session state |

Avoid creating miscellaneous root-level `.md` files. Prefer `Docs/` unless a root document is conventional for the repository.

## Repository Expectations

Track project-authored source, config, docs, tests, scripts, and directive files.

Do not intentionally commit generated, dependency, cache, build output, IDE state, local runtime output, or agent scratch files such as:

- `node_modules/`
- `slidev/`
- `dist/`, `build/`, `.output/`
- `.vite/`, `.nuxt/`, `.cache/`, coverage output
- `.env`, `.env.*` except safe templates such as `.env.example`
- `.omx/`
- `.agents/work/`, `.agents/prompt-assets/`

## Tool-Specific Entry Points

If a tool requires its own root file, keep it as a thin redirect to this manifest.

Examples:

- `CLAUDE.md`: "Read `AGENTS.md` first."
- Tool-local config files: settings only; durable instructions belong here or under `.agents/directives/`.
