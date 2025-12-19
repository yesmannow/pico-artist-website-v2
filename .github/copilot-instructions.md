# Copilot instructions (repo-wide)

## Non-negotiables
- Deploy via **Cloudflare Pages Git integration only**. Do not add GitHub Actions or alternate deploy paths unless explicitly requested.
- Keep a **single Cloudflare config**. If both `wrangler.toml` and `wrangler.json(c)` exist, consolidate to one canonical file—do not add new ones.
- **Node 20 only** (respect `.nvmrc`, `.node-version`, and `package.json` engines).
- Never commit generated artifacts: `.next/`, `.open-next/`, `.wrangler/`, `.vercel/`, `.vercel/output`, `.open-next/output`, `out/`, `dist/`, caches.
- After any change that can affect build/deploy, always run (locally and in CI order):
  1) `npm run build`
  2) `npm run dev` (quick smoke)
  3) `npm run verify:output`

## Local commands
- Install: `npm install`
- Dev (smoke): `npm run dev`
- Build: `npm run build`
- Build output guard: `npm run verify:output`

## Architecture + performance guardrails
- App Router. Prefer server components by default; move heavy interactivity into **client islands** under `src/components/client/`.
- Centralize animation variants in `src/lib/motion.ts`; design tokens in `src/styles/tokens.css`.
- Use `next/dynamic` with `{ ssr: false }` only when window/canvas/audio is required.
- Media: **YouTube-first**. Use thumbnail-first galleries with lazy click-to-play embeds; avoid loading many iframes at once.
- Honor `prefers-reduced-motion`; keep motion variants configurable and reusable.
- External APIs (Pixabay/Spotify/etc.) must sit behind feature flags **OFF by default** and only when a minimal feature needs them.

## Content rules
- Content lives in `content/*.json`; types in `src/types/*`; loaders in `src/lib/content.ts`.
- Keep data swappable; do not hardcode API calls inside route components.
- Do not add binaries/audio files to the repo.

## Validation gates before merge
- Pass `npm run build`, `npm run dev` (smoke), and `npm run verify:output`.
- Confirm Cloudflare Pages build command + output directory match guard expectations.
- Ensure output directories remain untracked and no new deploy mechanisms were introduced.
