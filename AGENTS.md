# AGENTS.md - Website Architecture Contract

The org-wide `.github/AGENTS.md` and `.github/ENGINEERING.md` bind fully here.
This file adds the ajarprotocol.org website contract.

## Mission

This repo builds ajarprotocol.org.
The website is the public trust surface for the project.
It must make the canonical docs easy to inspect without becoming a second source of truth.

## The iron rule

`content/docs` is generated.
ALL content fixes go to the source repos:

- `ajar`
- `.github`
- `planning`

The sync script is the only writer for generated docs.
PRs editing generated content are rejected on sight.
To test derivability, delete `content/docs`, run the sync, then run the build.
That path MUST stay green.

## Sync pipeline rules

`scripts/sync-content.mjs` transforms source Markdown into site docs.
Transformations MUST be lossless with respect to normative text.
Never rewrite spec wording.
Never change RFC-2119 terms.
Never alter field names, headers, registry values, examples, or code fences.
MDX escaping edits MUST parse code spans correctly.
Link rewrites MUST be verified by the build.
Unmapped Markdown links MUST surface as warnings or failures.
Generated metadata may change page title and description only.
Generated metadata MUST NOT change body semantics.

## Site code rules

The static export must stay static.
Do not add a server runtime until Ajar-native conformance work is scheduled.
Follow Fumadocs conventions already present in the repo.
Do not add dependencies without the justification required by `.github/ENGINEERING.md`.
Keep `llms.txt` working when that route or artifact exists.
Build output MUST be reproducible from source repos and `content-src`.
Site-only overview pages live in `content-src`.
Site-only overview pages MUST NOT duplicate normative protocol text.

## Privacy

Do not introduce analytics or trackers.
ADR-014's spirit applies to the org's own site.
Privacy-respecting metrics may be considered only through an ADR.
No third-party script may be added without explicit maintainer approval and dependency-policy review.

## Never do this

- Never hand-edit `content/docs`.
- Never make generated content authoritative.
- Never rewrite normative spec text in the sync script.
- Never introduce analytics, trackers, or phone-home scripts.
- Never add a server runtime casually.
- Never break derivability: delete `content/docs`, sync, and build must stay green.
