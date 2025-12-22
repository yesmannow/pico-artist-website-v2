# Deploying to Cloudflare Pages

The project is wired for a single deployment path: **Cloudflare Pages + OpenNext**.

## Build + output
- **Build command:** `npm run cf:build`
- **Output directory:** `.open-next`
- **Output verification:** `npm run cf:build` runs `npm run verify:output`, which fails the build if `.open-next` or `.open-next/assets` are missing.

## Wrangler configuration
The `wrangler.jsonc` file must include these critical properties for Cloudflare Pages:
- **`pages_build_output_dir`:** `.open-next` – Required for Cloudflare Pages to locate the output
- **`main`:** `.open-next/worker.js` – Entry point for the worker
- **`assets.directory`:** `.open-next/assets` – Static assets location

Without `pages_build_output_dir`, Cloudflare Pages cannot serve the site (404 errors).

## Pages configuration
Set these values in the Pages project:
- **Framework preset:** None (use the command above)
- **Node version:** `20` (also pinned via `.nvmrc` and `.node-version`)
- **Build output directory:** `.open-next`
- Cloudflare Pages may display the output directory as `/.open-next` (leading slash is expected)
- **Root directory:** repository root

## Local checks
- Install: `npm install`
- Development: `npm run dev`
- Production build (OpenNext): `npm run cf:build`
- Optional: `npm run preview` (Cloudflare worker preview via OpenNext)

Keep this as the only deploy flow. Do not introduce additional workflows until after the first green Pages deploy.
