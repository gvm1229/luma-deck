# 04. Reference Sources Directive for AI Agents

Use this directive to choose sources for Slidev, LumaDeck architecture, and implementation details.

## Source Precedence

For LumaDeck behavior:

1. Current repository files.
2. `AGENTS.md` and `.agents/directives/`.
3. Durable docs under `Docs/`.
4. Restored session notes under `.omx/state/` as local historical context only.

For Slidev behavior:

1. Embedded checkout at `slidev/` if present.
2. Known local reference clone at `C:\Users\user\Documents\slidev` if present.
3. Official Slidev documentation and source repository.
4. Package docs and release notes.

## Known Reference Project

- Slidev local clone: `C:\Users\user\Documents\slidev`
- Inspected commit: `a1609ffa877a4df90ad1bf34006a85f8281097ef`
- Inspected release: `v52.16.0`

Use local paths as references only; do not commit machine-specific absolute paths into runtime config.

## Slidev Areas of Interest

When implementing LumaDeck features, inspect relevant Slidev areas before guessing:

- Markdown/frontmatter parsing: `packages/parser/`
- Vue runtime, layouts, components, styles: `packages/client/`
- CLI, Vite server, build/export: `packages/slidev/`
- Shared types: `packages/types/`

## Usage Rules

- Prefer local source inspection before broad web research.
- Prefer official docs and source when behavior is version-sensitive.
- Do not blindly copy Slidev internals into LumaDeck; use adapters and wrapper code first.
- Record durable architecture decisions in `Docs/architecture.md` or `Docs/decisions.md`.
- If a reference path is unavailable, state that clearly and use the next source in precedence order.
