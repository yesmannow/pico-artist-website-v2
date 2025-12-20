"use client";

import { motion } from "framer-motion";

import { usePlayerStore } from "@/lib/stores/playerStore";

export function PlaybackOverlay() {
	const { isPlaying } = usePlayerStore();

	return (
		<motion.div
			className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,30,99,0.25),transparent_35%),radial-gradient(circle_at_70%_40%,rgba(156,39,176,0.25),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(255,235,59,0.2),transparent_30%)] mix-blend-screen"
			animate={{ opacity: isPlaying ? 0.35 : 0.12, scale: isPlaying ? 1.05 : 1 }}
			transition={{ duration: 0.8, ease: "easeInOut" }}
		/>
	);
}

