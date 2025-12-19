# Deploy (Cloudflare Pages)

- **Strategy:** Cloudflare Pages via Git integration only. No GitHub Actions deploys.
- **Node:** 20.x (respect `.nvmrc` / `.node-version` / `package.json` engines).
- **Build command (local/CI):** `npm run build:ci`
- **Expected output directory:** `.vercel/output` (guard also checks `.open-next/output`, `dist`, `out` in that order).

## Local validation
1. `npm install`
2. `npm run build` (creates output)
3. `npm run verify:output`
4. Smoke dev if needed: `npm run dev`

## Troubleshooting output directory
- Run `npm run verify:output` to confirm a recognized output folder exists after build.
- If the guard fails, align Cloudflare Pages settings so the build command writes to `.vercel/output` (or `.open-next/output` / `dist` / `out`) and rerun the guard.
