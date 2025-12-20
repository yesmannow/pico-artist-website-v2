"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { generateRemixPrompt, RemixPalette } from "@/ai/RemixController";

export default function RemixButton() {
	const [isLoading, setIsLoading] = useState(false);
	const [lastPalette, setLastPalette] = useState<RemixPalette | null>(null);

	const handleRemix = async () => {
		if (isLoading) return;

		setIsLoading(true);
		try {
			const palette = await generateRemixPrompt({
				mood: "experimental",
				keywords: ["graffiti", "bass", "urban", "neon"],
			});

			setLastPalette(palette);

			// Update CSS variables
			document.documentElement.style.setProperty("--remix-primary", palette.primary);
			document.documentElement.style.setProperty("--remix-secondary", palette.secondary);
			document.documentElement.style.setProperty("--remix-accent", palette.accent);
			document.documentElement.style.setProperty("--remix-light", palette.lightColor);

			// Dispatch event for Three.js scene and other components
			window.dispatchEvent(
				new CustomEvent("remix-palette", {
					detail: {
						primary: palette.primary,
						secondary: palette.secondary,
						accent: palette.accent,
						lightColor: palette.lightColor,
					},
				})
			);
		} catch (error) {
			console.error("Remix failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			onClick={handleRemix}
			disabled={isLoading}
			className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-4 py-3 text-white font-heading uppercase tracking-wider shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-shadow disabled:opacity-50"
			style={
				lastPalette
					? {
							background: `linear-gradient(135deg, ${lastPalette.primary}, ${lastPalette.secondary}, ${lastPalette.accent})`,
					  }
					: undefined
			}
		>
			<motion.div
				animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
				transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
			>
				<Sparkles className="w-5 h-5" />
			</motion.div>
			<span>{isLoading ? "Remixing..." : "Remix Now"}</span>
		</motion.button>
	);
}

