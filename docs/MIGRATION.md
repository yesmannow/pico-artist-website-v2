# Migration checklist (run after first green deploy)

Do **not** import legacy assets until the Cloudflare Pages baseline is green. When ready, move items deliberately and retest the build after each batch.

## Copy later
- `public/` — only used assets; drop unused exports.
- `src/components/` — selectively migrate UI; refactor to App Router patterns.
- `content/` or data JSON files — keep static imports lightweight.
- Typography/color tokens — integrate into `globals.css`/`tailwind.config.ts`.

## Never copy
- `.open-next`, `.next`, `node_modules`
- Old lockfiles (`package-lock.json`/`yarn.lock` from the previous repo)
- Legacy GitHub Actions or workflows that clash with Pages deploys

## When migrating components
- Fix imports to match `@/` aliases and App Router conventions.
- Replace legacy pages/ directory usage with `src/app`.
- Ensure every imported asset exists and the build still outputs `.open-next`.
- Re-run `npm run cf:build` (checks output via `npm run verify:output`).
