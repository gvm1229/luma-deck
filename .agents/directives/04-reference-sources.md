# 04. Reference Sources Directive for AI Agents

Use this directive to choose sources for Slidev, LumaDeck architecture, and implementation details.

## Source Precedence

For LumaDeck behavior:

1. Current repository files.
2. `AGENTS.md` and `.agents/directives/`.
3. Durable docs under `Docs/`.
4. Restored session notes under `.omx/state/` as local historical context only.

For Slidev behavior:

1. `Docs/slidev-context.md` for task-to-feature routing.
2. Embedded checkout at `slidev/` if present.
3. Known local reference clone at `C:\Users\user\Documents\slidev` if present.
4. Official Slidev documentation and source repository.
5. Package docs and release notes.

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

## Slidev Capability Routing

Before editing a deck, classify the request and inspect the matching Slidev docs or local files:

| Request | References |
| --- | --- |
| Syntax, frontmatter, notes | `docs/guide/syntax.md`, `docs/features/block-frontmatter.md`, `docs/features/frontmatter-merging.md` |
| Layouts and components | `docs/builtin/layouts.md`, `docs/builtin/components.md`, `docs/guide/layout.md`, `docs/guide/component.md` |
| Clicks and animations | `docs/guide/animations.md`, `docs/features/click-marker.md`, `docs/features/shiki-magic-move.md` |
| UnoCSS and styling | `docs/custom/config-unocss.md`, `docs/custom/config-shortcuts.md`, `docs/features/slide-scope-style.md` |
| Code slides and live coding | `docs/features/twoslash.md`, `docs/features/monaco-editor.md`, `docs/features/monaco-run.md`, `docs/features/monaco-write.md`, `docs/features/import-snippet.md` |
| Diagrams, media, icons | `docs/features/mermaid.md`, `docs/features/plantuml.md`, `docs/features/icons.md`, `docs/features/bundle-remote-assets.md` |
| Shared deck layers | `docs/features/global-layers.md`, `docs/custom/directory-structure.md` |
| Presenter, remote, recording, export | `docs/builtin/cli.md`, `docs/guide/exporting.md`, `docs/guide/hosting.md`, `docs/features/remote-access.md`, `docs/features/recording.md`, `docs/features/drawing.md` |

## Usage Rules

- Prefer local source inspection before broad web research.
- Prefer official docs and source when behavior is version-sensitive.
- Do not blindly copy Slidev internals into LumaDeck; use adapters and wrapper code first.
- For deck edits, prefer Slidev-native syntax, layouts, components, click directives, UnoCSS, and config before custom Vue/CSS.
- Record durable architecture decisions in `Docs/architecture.md` or `Docs/decisions.md`.
- If a reference path is unavailable, state that clearly and use the next source in precedence order.
