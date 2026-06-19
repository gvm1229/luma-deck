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
- For Korean presentation decks, avoid leaving broad English explanatory copy in slide text or speaker notes. Translate or rewrite explanatory content into natural Korean unless the English term is an exact asset name, Unreal/Slidev/API term, code identifier, UI label, or quoted source.

## Presentation Style Rules

For presentation decks and speaker notes:

- Use a friendly, informative Korean tone.
- Keep slide text readable and summary-oriented; avoid turning slides into scripts.
- Write speaker notes as presenter guidance, not as text to read verbatim.
- Prefer natural spoken Korean over stiff report prose.
- Preserve enough context in notes for the presenter to explain the slide without guessing.
- For image-centric slides, let the visual carry the main point and keep the notes focused on what to emphasize verbally.
- When a deck presents team member work, distinguish the presenter's own work from other members' work in the notes.

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
