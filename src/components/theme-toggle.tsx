"use client";

import type { JSX } from "react";
import { useEffect } from "react";
import { Disc3, Moon, SunMedium } from "lucide-react";

import { Button } from "./ui/button";
import { useThemeStore } from "@/lib/stores/themeStore";

const modeIcons: Record<string, JSX.Element> = {
	light: <SunMedium className="h-4 w-4" />,
	dark: <Moon className="h-4 w-4" />,
	album: <Disc3 className="h-4 w-4" />,
};

export function ThemeToggle() {
	const { mode, cycleMode } = useThemeStore();

	useEffect(() => {
		if (typeof document === "undefined") return;
		document.documentElement.dataset.theme = mode;
		document.body.dataset.theme = mode;
	}, [mode]);

	const label = mode === "album" ? "Album glow" : `${mode} mode`;

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={cycleMode}
			title={`Toggle theme (${label})`}
			className="rounded-full border border-border/60 bg-black/30 backdrop-blur"
		>
			{modeIcons[mode]}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}

