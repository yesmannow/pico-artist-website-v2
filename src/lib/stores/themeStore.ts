"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light" | "album";

type ThemeState = {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	cycleMode: () => void;
};

const modes: ThemeMode[] = ["dark", "light", "album"];

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			mode: "dark",
			setMode: (mode) => set({ mode }),
			cycleMode: () => {
				const current = get().mode;
				const nextIndex = (modes.indexOf(current) + 1) % modes.length;
				set({ mode: modes[nextIndex] });
			},
		}),
		{
			name: "piko-theme-mode",
			storage: createJSONStorage(() =>
				typeof window === "undefined"
					? {
							getItem: () => null,
							setItem: () => {},
							removeItem: () => {},
					  }
					: localStorage,
			),
		},
	),
);

