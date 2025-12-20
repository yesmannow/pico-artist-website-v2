# Migration Phase 2 — Public Asset & Header Integration

✅ Completed:
- Merged Cloudflare Pages `_headers` rules for `_next/static` and audio streaming.
- Confirmed Pages/OpenNext build output in `.open-next`.

🚫 Deferred:
- Audio library (`public/assets/audio/full/*.mp3`)
- Service worker (`public/sw.js`)
- Manifest (`public/manifest.json`)

🔜 Next targets:
- Migrate `src/data` (track metadata)
- Migrate `src/lib/media` (`slugify`, `listLocalAudio`, `pickTrackArt`)
- Integrate player/visualizer components after build stability verified