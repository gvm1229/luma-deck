# AGENTS.md

This is the canonical agent manifest for the LumaDeck project. AI assistants, coding agents, and automation tools should read this file before acting.

Detailed directives live under `.agents/directives/`. Tool-specific config directories should only hold tool-local settings.

## Project Context

- Project: `LumaDeck`
- Repo/folder/package name: `luma-deck`
- CLI command name: `lumadeck`
- Primary stack: TypeScript, Node.js, Slidev, Vue, Vite, Markdown, YAML frontmatter, UnoCSS-compatible utility styling
- Product type: AI-assisted HTML/JavaScript presentation generation tool
- Purpose: Support live authoring of Slidev HTML/Vue presentations through a Codex session, with Deck JSON as an optional starter representation
- Default response language: Korean
- Default human documentation language: Korean
- Default new code comment language: Korean, unless surrounding code clearly uses another language

## Core Product Direction

LumaDeck should be a clean wrapper and live authoring workflow around Slidev, not a casual fork of Slidev core.

Preferred source-repo pipeline:

```text
Deck JSON -> validation -> Slidev Markdown -> Slidev dev/build/export
```

Preferred live deck workflow:

```text
User edit request -> active Codex session edits projects/<name>/slides.md/components/styles -> Slidev dev server hot reload -> final HTML build
```

LumaDeck does not call external LLM APIs and should not require API keys. The active Codex subscription/session is the AI layer. If AI is unavailable, users can directly edit the generated Slidev Markdown, Vue components, and styles.

Key remembered decision:

- Visual-first authoring v1의 현재 실행 계획은 `Docs/plans/PLAN_VISUAL_STUDIO_V1_GRIPGUN.md`를 기준으로 삼는다.
- Pragmata 2P GripGun은 projectile actor가 아니라 server-authoritative single Line Trace 구현이다. 관련 발표 자료에서 물리 projectile 비행을 실제 동작처럼 표현하지 않고, Blueprint CDO/runtime 미검증 수치를 단정하지 않는다.
- Keep a full Slidev checkout inside this project as `slidev/`, but treat it as local-only and gitignored.
- Use the embedded Slidev checkout as an internal runtime/reference engine.
- Build LumaDeck-owned code outside `slidev/`.
- Avoid modifying embedded Slidev unless explicitly asked; prefer adapters, generators, layouts, components, styles, and wrapper scripts.
- Treat this repository as the LumaDeck source repo, not a personal deck tracker.
- Keep all individual deck authoring projects under gitignored `projects/<name>/`.
- When the user names a deck project, resolve it through `projects/<name>/` unless they provide an explicit file path.
- For deck work, edit `projects/<name>/slides.md`, `projects/<name>/components/`, and `projects/<name>/styles/` first. Do not edit generated/source repo examples unless the user asks.
- Before deck work, read `Docs/slidev-context.md` and run a Slidev capability pass: map the request to built-in Slidev syntax, layouts, components, click/animation tools, UnoCSS config, diagrams, code features, or export tools before adding custom Vue/CSS.

## Deck Branch and Worktree Model

완성 덱은 `main`에 병합하지 않고 프로젝트별 `deck/<project-name>` 브랜치와 별도 worktree에서 보존한다.

현재 구조:

| Deck project | Branch | Worktree |
| --- | --- | --- |
| `prag-init-presentation` | `deck/prag-init-presentation` | `C:/Workspace/WebProjects/luma-deck-worktrees/prag-init-presentation` |
| `pragmata-2p-beta` | `deck/pragmata-2p-beta` | `C:/Workspace/WebProjects/luma-deck-worktrees/pragmata-2p-beta` |
| `pragmata-2p-final` | `deck/pragmata-2p-final` | `C:/Workspace/WebProjects/luma-deck-worktrees/pragmata-2p-final` |
| `pragmata-2p-gripgun-prototype` | `deck/pragmata-2p-gripgun-prototype` | `C:/Workspace/WebProjects/luma-deck-worktrees/pragmata-2p-gripgun-prototype` |

운영 규칙:

- 코어 개발과 공통 문서 변경은 `main` worktree에서 수행한다.
- 덱 편집은 대응하는 deck worktree에서 수행하고 해당 `deck/*` 브랜치에만 커밋한다.
- worktree 전환은 `git switch`가 아니라 작업 디렉터리 이동으로 처리한다.
- 각 deck 브랜치는 `main` 코어를 포함한다. 최신 코어가 필요하면 해당 worktree에서 `git merge main` 또는 승인된 선형화 작업을 수행한다.
- deck 브랜치를 `main`으로 병합하지 않는다.
- 각 worktree의 `projects/<name>/images/`는 실제 로컬 파일로 유지하지만 Git에는 추적하지 않는다.
- `images/`, `dist/`, `node_modules/`, `.vite/`, `artifacts/`, `coverage/`와 기타 생성 산출물은 deck 브랜치에서도 제외한다.
- 이미지 복원 규칙은 각 프로젝트의 `ASSETS.md`를 따른다. 덱 소스의 상대 이미지 경로를 유지한다.
- 새로운 덱을 보존할 때는 `main`에서 `deck/<project-name>` 브랜치와 별도 worktree를 만들고, 해당 프로젝트의 소형 편집 소스만 최초 `git add -f`로 등록한다.

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
- [`Docs/slidev-context.md`](Docs/slidev-context.md) - Slidev capability map for deck editing and feature routing

User-authored directives under `.agents/directives/` take precedence over tool-local config on conflict.

## Human Documentation

Human-readable project documentation should live under `Docs/` unless a root document is conventional.

Common documents:

- `README.md` - project overview, setup, and usage notes
- `Docs/architecture.md` - durable architecture notes and implementation reasoning
- `Docs/decisions.md` - important decisions and tradeoffs
- `Docs/slidev-context.md` - Slidev feature routing map for agents
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
| Local deck projects | `projects/<name>/` | No | Gitignored live authoring workspaces |
| Human project docs | `Docs/` | Yes | Human-facing documentation |
| Embedded Slidev checkout | `slidev/` | No | Local-only engine/reference clone |
| OMX session state | `.omx/` | No | Local assistant/session state |

Avoid creating miscellaneous root-level `.md` files. Prefer `Docs/` unless a root document is conventional for the repository.

## Repository Expectations

Track project-authored source, config, docs, tests, scripts, and directive files.

Do not intentionally commit generated, dependency, cache, build output, IDE state, local runtime output, or agent scratch files such as:

- `node_modules/`
- `slidev/`
- `projects/`
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
