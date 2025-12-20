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

## Phase 6 — Persistent Playback + Mini Player

✅ Implemented:
- Zustand persistence (sessionStorage)
- Mobile MiniPlayer with Framer Motion transitions
- Seamless route-based playback continuity

🚫 Deferred:
- Cross-tab sync (localStorage layer)
- Volume control & seek bar UI
- MediaSession API (for mobile lockscreen controls)

🔜 Next (Phase 7):
- Optional MediaSession API integration
- Add `Now Playing` metadata updates for PWA

## Phase 5 — Playlist + Now Playing Controller

✅ Implemented:
- Zustand-based global playlist store
- Floating "Now Playing" controller with Framer Motion transitions
- Integrated with AudioPlayer + Gallery

🚫 Deferred:
- Persistent playback across routes (will require URL state store)
- Volume control + waveform seeking

🔜 Next (Phase 6):
- Optional persistence layer (sessionStorage)
- Responsive mini-player for mobile