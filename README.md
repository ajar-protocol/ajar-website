# ajar-website

Static Fumadocs website for ajarprotocol.org.

The site should make Ajar's problem statement obvious before visitors reach the
spec: agents are using websites through fragile human screens, broad browser
sessions, and weak evidence trails. Ajar resolves that with a signed site
contract: public reads by owner policy, account data through delegated user
authority, risky actions through SIMULATE and Offer/Commit, and receipts for
audit.

The committed source in this repo is the website shell, the content sync pipeline, and a small `content-src/` directory for site-only overview pages. The published docs under `content/docs/` are generated from canonical sibling repos at build time and are ignored by git.

## Content sources

By default, `npm run sync` reads:

- `../ajar` for the protocol spec, reference docs, registries, schemas, examples, and test-vector links.
- `../.github` for onboarding and contribution guides.
- `../planning` for roadmap, build order, positioning, and integration stories.
- `content-src/` for site-owned overview pages copied into the generated docs tree.

Override source paths with `AJAR_DIR`, `GITHUB_DIR`, and `PLANNING_DIR`. Content edits belong in the source repos, not in generated `content/docs/`.

## Local development

Clone or check out the sibling source repos, then run:

```bash
npm run sync
npm run dev
```

The dev server expects generated docs to exist. If source content changes, run `npm run sync` again.

## Build

```bash
npm run build
```

`prebuild` runs the sync step, then Next.js exports the static site to `out/`.

## Deploy

Cloudflare Pages should deploy the static `out/` directory. The included workflow clones the three source repos, runs `npm ci`, builds the site, and deploys with Wrangler to the `ajar-website` Pages project.
