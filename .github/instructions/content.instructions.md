---
applyTo: "content/**"
---

- Content stays in JSON with typed models; keep IDs/slugs stable and unique.
- Include YouTube `videoId` fields for media-first stories; avoid embedding full URLs in content.
- Keep files small and reviewable; do **not** add binaries or audio assets to this repo.
- Validate schema alignment with `src/types/*` and loaders in `src/lib/content.ts` before committing.
