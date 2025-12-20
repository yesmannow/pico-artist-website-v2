"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Track } from "@/data/tracks";

interface PlayerState {
	playlist: Track[];
	currentIndex: number | null;
	isPlaying: boolean;
	setPlaylist: (tracks: Track[]) => void;
	playTrack: (index: number) => void;
	togglePlay: () => void;
	next: () => void;
	prev: () => void;
	stop: () => void;
}

export const usePlayerStore = create<PlayerState>()(
	persist(
		(set, get) => ({
			playlist: [],
			currentIndex: null,
			isPlaying: false,
			setPlaylist: (tracks) => set({ playlist: tracks }),
			playTrack: (index) => set({ currentIndex: index, isPlaying: true }),
			togglePlay: () => set({ isPlaying: !get().isPlaying }),
			next: () => {
				const { playlist, currentIndex } = get();
				if (currentIndex === null || !playlist.length) return;

				const nextIndex = (currentIndex + 1) % playlist.length;
				set({ currentIndex: nextIndex, isPlaying: true });
			},
			prev: () => {
				const { playlist, currentIndex } = get();
				if (currentIndex === null || !playlist.length) return;

				const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
				set({ currentIndex: prevIndex, isPlaying: true });
			},
			stop: () => set({ currentIndex: null, isPlaying: false }),
		}),
		{
			name: "piko-player-store",
			partialize: (state) => ({ currentIndex: state.currentIndex }),
			storage: createJSONStorage(() =>
				typeof window === "undefined" ? undefined : sessionStorage,
			),
		},
	),
);

