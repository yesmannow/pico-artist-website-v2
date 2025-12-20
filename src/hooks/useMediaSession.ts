"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/lib/stores/playerStore";

export function useMediaSession() {
	const { playlist, currentIndex, next, prev, togglePlay, isPlaying } = usePlayerStore();
	const track = currentIndex !== null ? playlist[currentIndex] : null;

	useEffect(() => {
		if (!("mediaSession" in navigator) || !track) return;

		navigator.mediaSession.metadata = new MediaMetadata({
			title: track.title,
			artist: track.artist,
			artwork: [{ src: track.art, sizes: "512x512", type: "image/jpeg" }],
		});

		navigator.mediaSession.setActionHandler("play", togglePlay);
		navigator.mediaSession.setActionHandler("pause", togglePlay);
		navigator.mediaSession.setActionHandler("previoustrack", prev);
		navigator.mediaSession.setActionHandler("nexttrack", next);
	}, [track, isPlaying]);
}


