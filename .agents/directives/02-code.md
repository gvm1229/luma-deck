# 02. Code Directive for AI Agents

This directive applies to implementation work in LumaDeck.

## Project Coding Direction

- Build LumaDeck-owned code outside the gitignored `slidev/` checkout.
- Treat `slidev/` as local reference/runtime source unless the user explicitly asks to modify it.
- Prefer TypeScript for LumaDeck implementation.
- Prefer Node.js-compatible CLI and generator code.
- Prefer explicit data transforms over opaque prompt-only behavior.
- Keep the pipeline easy to inspect:

```text
prompt -> Deck JSON -> validate -> Slidev Markdown -> render/export
```

## Coding Rules

- Prefer the minimum code that solves the requested problem clearly.
- Avoid over-engineering, speculative extension points, and broad rewrites.
- Match existing code style, naming, formatting, module boundaries, and framework conventions once project code exists.
- Use existing helpers, services, abstractions, and design-system components before creating new ones.
- Remove newly-unused imports, variables, functions, files, and dependencies introduced by your change.
- Mention pre-existing dead code when relevant, but do not delete it unless asked.
- Use early returns or guard clauses when they make error handling clearer.
- Add comments only where they explain non-obvious intent, constraints, or domain rules.

## Slidev Boundaries

- Generate Slidev Markdown and project-local layouts/components/styles before editing Slidev internals.
- Use Slidev frontmatter for layout/theme decisions where possible.
- Preserve compatibility with Slidev Markdown, Vue components, Vite, and UnoCSS-style utility classes.
- Remember that Slidev PPTX export is image-based; do not promise fully editable PowerPoint output without a separate implementation.

## Dependencies

- Prefer dependencies already used by the project once package files exist.
- Prefer the Slidev ecosystem and Vite-compatible packages when they fit.
- Add a dependency only when it meaningfully reduces risk or complexity.
- Before adding a dependency, check license, maintenance status, package size, runtime impact, security posture, and compatibility with the current stack.
- Update lockfiles only when dependency changes require it.
- Do not run global installs or change system-wide toolchains unless the user explicitly asks.

## Source Verification

- For project-specific behavior, inspect this repository first.
- For Slidev behavior, inspect the embedded `slidev/` checkout if present; otherwise inspect the known local clone at `C:\Users\user\Documents\slidev` when available.
- For third-party API behavior that is uncertain, prefer official docs or local installed source over memory.
- Do not invent unavailable classes, functions, modules, schema fields, event names, or config keys.
- If a symbol or API cannot be found locally or in official references, ask for the missing context before implementing against it.

## Testing and Checks

- Choose verification proportional to risk.
- Run focused tests, linters, type checks, format checks, build checks, or smoke checks when they are available and appropriate.
- Until package scripts exist, verify setup/documentation work with file inspection and placeholder searches.
- Do not run expensive full builds, deployments, destructive migrations, or long end-to-end suites unless the user asks or the repository policy allows it.
- If a necessary verification step cannot run locally, explain the exact command or manual action the user should run.

## Comments and Documentation in Code

When adding or modifying comments in code:

- Use Korean comments unless the surrounding codebase clearly uses English comments.
- Keep comments minimal and literal about variable/function names.
- Prefer single-line `//` comments.
- Avoid multi-line comment blocks for ordinary explanations.
- Do not add comments that merely say code was moved, deprecated, or removed; remove obsolete code instead.
- Avoid polite or long sentence endings in Korean comments.
- Do not end Korean comments with punctuation.
