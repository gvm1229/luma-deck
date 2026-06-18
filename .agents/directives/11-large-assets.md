# 11. Large Assets Directive for AI Agents

This directive governs requests to keep large, binary, generated, or externally stored assets out of normal Git history while leaving files on disk when appropriate.

## When To Apply

Apply this directive when the user asks to:

- Unstage an asset.
- Ignore an asset.
- Keep an asset out of Git history.
- Add an asset to a large-asset or external-storage list.
- Move a generated or binary artifact to external storage.
- Keep local media, datasets, design exports, archives, or build artifacts out of normal commits.

## Required Flow

1. Read active session manifests before editing tracked files.
2. Inspect the target paths with `git status --short -- <paths>`.
3. Confirm the files exist on disk when practical.
4. Check whether the files are already tracked in `HEAD`.
5. Add exact repo-relative paths to `.gitignore` or the repository's ignore mechanism with a short reason.
6. Update `Docs/large-assets.md` or the repository's equivalent with asset paths, reason, owner/source of truth, and external location when applicable.
7. Remove only Git index entries with `git rm --cached -- <paths>` when the user asks for tracked files to become ignored while remaining on disk.
8. Never delete asset files from disk unless the user explicitly asks for deletion.
9. Verify with `git check-ignore -v --no-index <paths>` and `git status --short -- <paths>` when applicable.
10. Do not commit unless the user explicitly asks.

## Documentation Rules

- Use exact repo-relative paths with forward slashes.
- Record why the asset is excluded from normal Git history.
- Record the source of truth, such as cloud storage, artifact registry, package registry, design tool, dataset location, or build pipeline.
- Keep the document concise and actionable.

## Caution

If an asset is already tracked in `HEAD`, `git rm --cached` stages its removal from the repository in the next commit while leaving the local file intact. Mention that effect clearly when the user's wording is ambiguous.
