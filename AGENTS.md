# Agent checklist
- **Before coding:** Confirm Node 20, Cloudflare Pages Git-only deploy, single wrangler config, and existing instructions for tokens/motion/content.
- **During coding:** Keep scope minimal; prefer server components and client islands only when needed; avoid adding generated artifacts or new deploy mechanisms.
- **After coding:** Run `npm run build`, smoke `npm run dev` if behavior changed, then `npm run verify:output`. Ensure output dirs remain untracked.

# Common failure modes
- Build output directory mismatch (Pages pointing to wrong folder).
- Wrangler config drift (multiple configs or non-canonical file).
- Node version mismatch causing install/build failures.
- Hydration errors from client-only code accidentally rendered on the server.
