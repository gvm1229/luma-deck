# 07. External Knowledge Directive for AI Agents

This directive governs how AI agents use live project knowledge sources without copying them wholesale into the repository.

## Live Sources

Approved sources currently known:

- Local restored session context: `.omx/state/restored-presentation-session.md`
- Slidev local reference clone: `C:\Users\user\Documents\slidev`
- Official Slidev documentation and source repository when local source is missing or outdated
- Official documentation for any future dependency, SDK, or API added to LumaDeck

No product requirements system, design file, issue tracker, or team wiki is currently configured.

## When To Consult Live Sources

Fetch the relevant source before making decisions that depend on:

- Slidev parser, layout, CLI, Vite, build, or export behavior.
- Product requirements, acceptance criteria, roadmap, or release scope not captured in repo docs.
- Design intent, interaction behavior, visual specifications, or brand rules.
- API contracts, schema ownership, service dependencies, or deployment runbooks.
- Planning assumptions not already captured in repository docs.
- Any user request that mentions a live source by name.

## Web Research

Use web research when:

- The user explicitly asks to search, browse, verify, or find current information.
- The information is likely to be time-sensitive, such as current APIs, pricing, laws, security advisories, release notes, schedules, or product availability.
- Local repository evidence and approved live sources are insufficient.
- Official documentation, vendor references, standards, or primary sources are needed to avoid guessing.

Scope rules:

- Research only what is directly relevant to the user's task.
- Prefer official, primary, or authoritative sources over blogs, forums, summaries, and search snippets.
- For technical implementation guidance, prefer official docs, standards, package docs, source repositories, or release notes.
- Do not paste long copyrighted text into the repository or response; summarize only what is needed.
- Clearly distinguish sourced facts from inferences.
- Mention sources when web research materially affects a recommendation, implementation, or decision.

## Usage Rules

- Treat live sources as current: fetch the relevant page, ticket, file, or record when needed.
- Treat live sources as read-only unless the user explicitly asks to create, update, move, delete, comment, or publish.
- Prefer direct URLs or IDs from this directive or the user over broad workspace search.
- If a connector fails, report the connector issue clearly and use an approved fallback when available.
- If the user provides a newer source URL or ID, prefer it for that task and suggest updating this directive.
- When a decision materially depends on a live source, mention the title, ID, or URL used.

## Repository Copying Rules

- Do not commit full dumps or exports of private live sources.
- Summarize only the specific durable decisions, requirements, or implementation facts needed by the repository.
- Store durable summaries in `Docs/` only when the user asks or when the repository policy requires it.
- Do not commit connector cookies, exported credentials, local cache files, or private attachments.
