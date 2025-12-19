---
applyTo: "src/**/*.ts,src/**/*.tsx,app/**"
---

- App Router default. Keep server components lean; push heavy interactivity into **client islands** under `src/components/client/`.
- Centralize motion in `src/lib/motion.ts`; reuse variants and respect `prefers-reduced-motion`.
- Use design tokens from `src/styles/tokens.css`; do not inline ad-hoc colors/spacing.
- Media galleries: thumbnail-first, lazy iframe/embed on click, YouTube-first. Avoid loading multiple iframes; use modal or inline embed with dynamic import.
- Use `next/dynamic` with `{ ssr: false }` only when window/canvas/audio is required.
- TypeScript required. Keep content models typed; loaders go through `src/lib/content.ts`; shared types in `src/types/*`.
- External APIs must be behind feature flags that default **off**.
- After changes here, run `npm run build` and `npm run verify:output` (smoke `npm run dev` if behavior could change).
