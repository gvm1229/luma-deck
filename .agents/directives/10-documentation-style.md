# 10. Documentation Style Directive for AI Agents

This directive governs human-readable project documents written or updated by AI agents.

Use Korean as the default language for agent replies, commit prose, human-readable project documents, and new code comments unless the user explicitly requests another language or surrounding code/documents clearly require a different one.

## Applies To

Apply this style to human-readable documents such as:

- Changelogs and change summaries.
- Setup, usage, and troubleshooting guides.
- Logic, architecture, and decision documents.
- Design, QA, release, or operations notes.
- Findings, retrospectives, debugging notes, and implementation notes.
- Any other document the user explicitly asks to create or update for human reading.

## Style Rules

- Prefer short headings, bullets, tables, and checklists over long prose.
- Lead with what changed, what decision was made, or what action is needed.
- Separate verified facts from assumptions when the distinction matters.
- Keep names, paths, UI labels, class names, function names, API names, and technical identifiers exact.
- Avoid filler, self-congratulation, hidden agent process, or raw investigation logs.
- Include only context that helps a human act, remember, or verify.

## Korean Style Rules

Write human-readable documents in concise Korean:

- Prefer short headings, bullets, tables, and checklists over long prose.
- Use plain noun phrases or concise verb-noun endings where possible, such as `추가`, `정리`, `검증`, `확인`, `보강`, `제거`, `적용`.
- Avoid polite or conversational endings such as `~합니다`, `~해요`, `~했습니다`, `~됩니다`.
- Avoid verbose explanatory filler. Include only context that helps the user act, remember, or verify.
- Keep variable names, function names, class names, file paths, Unreal terms, and tool names in English when that is clearer.
- Do not translate technical identifiers into awkward Korean transliterations.
- Use Korean for explanatory text, but keep exact UI labels, asset names, paths, and code identifiers unchanged.

## Document Shape

For changelogs:

- Lead with what changed.
- Group related files, systems, or features together.
- Keep entries short and scannable.

For logic or architecture documents:

- State the decision or rule first.
- Include the minimum example needed to understand or reproduce the logic.
- Prefer durable implementation reasoning over transcript-style notes.

For manual task documents:

- Include target name, path, screen, property, expected value, and verification step when known.
- Keep steps direct and executable.

## Exceptions

Use another language or style only when the user explicitly requests it, when an external audience requires it, or when an existing document has a strong established convention.
