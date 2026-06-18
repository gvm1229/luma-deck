# 06. Security and Safety Directive for AI Agents

## Trust Boundaries

- Do not commit secrets, API keys, tokens, passwords, credentials, private certificates, session cookies, or private runtime state.
- Do not expose private environment values in documentation, logs, test fixtures, screenshots, or commit messages.
- Do not edit files outside this repository unless the user explicitly asks.
- Treat the Slidev reference clone and embedded `slidev/` checkout as read-only unless the user explicitly asks for changes.
- Be careful with personal data, customer data, proprietary content, and regulated data.

## Generated and Local State

Never intentionally commit generated, dependency, IDE, cache, build output, local runtime files, or assistant state unless the repository explicitly tracks them.

Local-only examples for LumaDeck:

- `slidev/`
- `node_modules/`
- `dist/`, `build/`, `.output/`
- `.vite/`, `.cache/`, coverage output
- `.env`, `.env.*` except safe templates such as `.env.example`
- logs, crash dumps, local databases
- `.omx/`
- `.agents/work/`, `.agents/prompt-assets/`

Before staging or committing, check `git status --short` and verify that generated or private files are not included.

## External References

- Do not copy private or machine-specific configuration from reference projects.
- Do not import plugins, services, dependencies, or architecture from a reference without confirming fit.
- If a reference path is machine-local, prefer documenting the resolution rule rather than relying on the absolute path in runtime config.

## Destructive Operation Safety

- Never run destructive git commands such as `git reset --hard`, `git checkout -- <path>`, branch deletion, or plain force-push unless explicitly requested.
- Do not delete user changes just because they are unrelated.
- If unrelated local changes exist, leave them untouched.
- If a branch rewrite is explicitly requested, use `--force-with-lease`, never plain `--force`.
- Ask before deleting files, dropping database data, running destructive migrations, removing cloud resources, or broad cleanup scripts.

## Binary and Asset Safety

- Treat binary assets, media, design files, databases, archives, generated decks, and exports as potentially containing user work.
- Do not modify or regenerate binary assets unless the user explicitly asks or the repository workflow requires it.
- If binary asset changes are already present and unrelated to the task, do not revert or restage them.

## Network and Production Safety

- Do not deploy, publish packages, send emails, charge payments, modify production data, or change external service state unless the user explicitly requests it.
- Prefer dry-run, preview, staging, or read-only modes before production operations.
- Report exactly what would change before irreversible or externally visible operations.
