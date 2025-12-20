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

## Phase 4 — Audio Player + Visualizer Integration

✅ Implemented:
- Client-only `AudioPlayer` using Wavesurfer.js
- Integrated `GalleryPage` track playback
- No SSR or hydration conflicts on Cloudflare Pages

🚫 Deferred:
- Playlist management
- Full visualizer modes (FFT, canvas-based)
- Audio file CDN linking (use local preview only)

🔜 Next (Phase 5):
- Integrate playlist / queue system
- Add "Now Playing" component with motion transitions