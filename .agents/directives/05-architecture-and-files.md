# 05. Architecture and Files Directive for AI Agents

## Project Shape

- Project: `LumaDeck`
- Primary stack: TypeScript, Node.js, Slidev, Vue, Vite, Markdown, YAML frontmatter
- Product type: AI-assisted HTML/JavaScript presentation generation tool
- Main source directory: undecided; prefer `src/` for initial implementation unless the scaffold chooses a different convention
- Main test directory: undecided; prefer `test/` or colocated `*.test.ts` once tooling exists
- Main documentation directory: `Docs/`
- Main config files: to be created during scaffold, likely `package.json`, `tsconfig.json`, package manager lockfile, and test/lint configs

## Target Architecture

LumaDeck should preserve an inspectable generation pipeline:

```text
User prompt
-> LLM prompt analysis
-> Deck JSON
-> schema validation
-> Slidev Markdown
-> project-local layouts/components/styles
-> Slidev dev/build/export
```

Recommended future structure:

```text
luma-deck/
  src/
    cli/
    generator/
    schema/
    slidev/
  layouts/
  components/
  styles/
  examples/
  Docs/
  slidev/                 # gitignored embedded Slidev checkout
```

This structure may evolve, but keep LumaDeck-owned source outside `slidev/`.

## File Categories

| Kind | Location | Tracked? | Notes |
| --- | --- | --- | --- |
| Canonical agent manifest | `AGENTS.md` | Yes | Root index for all agents |
| AI directives | `.agents/directives/` | Yes | User-authored canonical directives |
| Reusable prompt templates | `.agents/prompts/` | Optional | Shared prompt text |
| Prompt reference assets | `.agents/prompt-assets/` | No by default | Large or binary prompt references |
| Agent working notes | `.agents/work/` | No | Scratch notes for complex work |
| Human project docs | `Docs/` | Yes | Human-readable guides and project docs |
| Architecture notes | `Docs/architecture.md` | Yes | Durable reasoning and decisions |
| Embedded Slidev checkout | `slidev/` | No | Local-only engine/reference clone |
| OMX session state | `.omx/` | No | Local assistant/session state |

Avoid creating new root-level documentation files unless the repository explicitly allows them.

## Generated and Local-Only Paths

Keep these out of Git:

- `slidev/`
- `node_modules/`
- `dist/`, `build/`, `.output/`
- `.vite/`, `.cache/`, coverage output
- `.env`, `.env.*` except safe templates such as `.env.example`
- `.omx/`
- `.agents/work/`
- `.agents/prompt-assets/`

## Architecture Rules

- Keep feature code near the relevant pipeline stage.
- Keep schema and validation explicit; do not let generated free-form Markdown be the only internal representation.
- Prefer small cohesive modules over broad framework-like abstractions.
- Build custom Slidev layouts/components/styles as project-owned extension points.
- Treat export limitations honestly; Slidev's PPTX export is image-based.
- Record durable decisions in `Docs/architecture.md` or `Docs/decisions.md`.

## Known Pitfalls

- Accidentally committing embedded `slidev/`.
- Editing Slidev core when a wrapper, layout, component, or generated Markdown change would suffice.
- Treating LLM output as trusted without schema validation.
- Promising editable PowerPoint output from Slidev's image-based PPTX export.
- Committing local `.omx/` session state or `.agents/work/` scratch files.
