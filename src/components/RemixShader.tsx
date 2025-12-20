"use client";

import { useEffect, useState } from "react";
import { generateRemixPrompt, RemixPalette } from "@/ai/RemixController";

interface RemixShaderProps {
	mood?: string;
	keywords?: string[];
}

export default function RemixShader({ mood = "neon", keywords = ["graffiti", "urban"] }: RemixShaderProps) {
	const [palette, setPalette] = useState<RemixPalette | null>(null);
	const [currentMood, setCurrentMood] = useState(mood);

	// Listen for mood changes from audio visualizer
	useEffect(() => {
		const handler = (e: CustomEvent<string>) => {
			setCurrentMood(e.detail);
		};
		window.addEventListener("remix-mood", handler as EventListener);
		return () => window.removeEventListener("remix-mood", handler as EventListener);
	}, []);

	// Generate palette when mood changes
	useEffect(() => {
		let cancelled = false;

		const fetchPalette = async () => {
			try {
				const newPalette = await generateRemixPrompt({ mood: currentMood, keywords });
				if (!cancelled) {
					setPalette(newPalette);

					// Update CSS variables for global access
					document.documentElement.style.setProperty("--remix-primary", newPalette.primary);
					document.documentElement.style.setProperty("--remix-secondary", newPalette.secondary);
					document.documentElement.style.setProperty("--remix-accent", newPalette.accent);
					document.documentElement.style.setProperty("--remix-light", newPalette.lightColor);

					// Dispatch event for Three.js scene
					window.dispatchEvent(
						new CustomEvent("remix-palette", {
							detail: {
								primary: newPalette.primary,
								secondary: newPalette.secondary,
								accent: newPalette.accent,
								lightColor: newPalette.lightColor,
							},
						})
					);
				}
			} catch (error) {
				console.error("Failed to fetch palette:", error);
			}
		};

		fetchPalette();

		return () => {
			cancelled = true;
		};
	}, [currentMood, keywords]);

	if (!palette) return null;

	return (
		<div
			className="fixed inset-0 -z-10 mix-blend-soft-light pointer-events-none"
			style={{
				background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
				transition: "background 2s ease",
			}}
		/>
	);
}

