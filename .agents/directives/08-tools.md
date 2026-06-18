# 08. Tools Directive for AI Agents

This directive governs local tools, package commands, browser/editor automation, and fallback behavior.

## Tool Selection

- Prefer repository-local scripts, package manager commands, and documented tooling over ad hoc commands.
- Use read-only inspection before modifying unfamiliar files.
- Use modifying tools only when the user asks for changes or the task clearly requires them.
- Prefer official SDKs, CLIs, and APIs over brittle UI automation when available.

## Expected Local Tooling

The project is scaffolded. Prefer:

- Node.js for runtime and CLI work.
- TypeScript for source code.
- `pnpm` package scripts.
- `pnpm lumadeck <command>` for project operations.
- Slidev CLI through the LumaDeck wrapper unless inspecting Slidev behavior directly.

## Common Tool Categories

Use the relevant configured tools for:

- Source search and navigation.
- Tests, type checks, linting, formatting, builds, and package scripts.
- Browser inspection and screenshots for web UI verification.
- Slidev preview/build/export verification.
- Official docs or local source inspection for version-sensitive APIs.

## LumaDeck Commands

- `pnpm lumadeck init <name>` creates `projects/<name>/`.
- `pnpm lumadeck validate <name>` validates `projects/<name>/deck.json`.
- `pnpm lumadeck render <name> --force` regenerates `projects/<name>/slides.md`.
- `pnpm lumadeck dev <name>` starts Slidev for `projects/<name>/slides.md`.
- Pass Slidev dev flags directly after the project name, for example `pnpm lumadeck dev <name> --host 127.0.0.1 --port 3040`. Be careful with an extra standalone `--`: if it reaches Slidev, options such as `--port` may be ignored and the server can fall back to port `3030`.
- `pnpm lumadeck build <name>` builds static HTML for the project.
- Explicit file paths still work for examples and focused tests.

## Slidev Port Recovery

- Slidev restarts the dev server when config files such as `uno.config.ts` change.
- During config-triggered restart, Slidev/Vite uses strict port binding. If another process already owns the target port, the restart can fail with `Port 3030 is already in use`.
- Before restarting or changing ports, check active listeners with `Get-NetTCPConnection -LocalPort 3030,3031,<chosen-port> -State Listen` and inspect the owning process. Terminate only the matching stale Slidev/Node process for the current deck unless the user explicitly asks for broader cleanup.

## First Checks

Before relying on a tool, check:

- The tool is installed or configured.
- The tool is connected to the intended project, workspace, environment, or account.
- The command will operate on the expected path, branch, package, or runtime.
- The operation is read-only unless a write is intended and approved.

## Failure Recovery

If a tool fails:

1. Read the error.
2. Check configuration, current directory, credentials, package manager, and expected runtime.
3. Retry only with a changed input or a narrower query.
4. Use a documented fallback if available.
5. Report exactly which check failed if blocked.

## Modifying External State

Ask before destructive or broad operations:

- Deleting, moving, renaming, or bulk editing assets.
- Running cleanup scripts.
- Deploying, publishing packages, or changing remote services.
- Reimporting, regenerating, or overwriting binary artifacts.

After modifying external state, verify with a separate read-only check.
