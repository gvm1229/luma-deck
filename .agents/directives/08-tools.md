# 08. Tools Directive for AI Agents

This directive governs local tools, package commands, browser/editor automation, and fallback behavior.

## Tool Selection

- Prefer repository-local scripts, package manager commands, and documented tooling over ad hoc commands.
- Use read-only inspection before modifying unfamiliar files.
- Use modifying tools only when the user asks for changes or the task clearly requires them.
- Prefer official SDKs, CLIs, and APIs over brittle UI automation when available.

## Expected Local Tooling

The project is not scaffolded yet. Once scaffolded, prefer:

- Node.js for runtime and CLI work.
- TypeScript for source code.
- `pnpm` first if the project aligns with Slidev's ecosystem; otherwise follow the package manager actually present in the repository.
- Slidev CLI through the embedded/local Slidev checkout or installed package scripts.

## Common Tool Categories

Use the relevant configured tools for:

- Source search and navigation.
- Tests, type checks, linting, formatting, builds, and package scripts.
- Browser inspection and screenshots for web UI verification.
- Slidev preview/build/export verification.
- Official docs or local source inspection for version-sensitive APIs.

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
