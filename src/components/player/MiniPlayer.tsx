"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

import { useMediaSession } from "@/hooks/useMediaSession";
import { usePlayerStore } from "@/lib/stores/playerStore";

export default function MiniPlayer() {
	const { playlist, currentIndex, isPlaying, togglePlay } = usePlayerStore();
	const track = currentIndex !== null ? playlist[currentIndex] : null;

	useMediaSession();

	if (!track) return null;

	return (
		<AnimatePresence>
			<motion.div
				key={track.id}
				initial={{ y: 80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 80, opacity: 0 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-slate-900/90 px-4 py-2 text-white backdrop-blur-xl md:hidden"
			>
				<div className="flex items-center gap-3 overflow-hidden">
					<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-white/10">
						<Image src={track.art} alt={track.title} fill sizes="48px" className="object-cover" priority />
					</div>
					<div className="truncate">
						<div className="text-sm font-semibold">{track.title}</div>
						<div className="text-xs opacity-70">{track.artist}</div>
					</div>
				</div>
				<button onClick={togglePlay} className="p-2">
					{isPlaying ? <Pause /> : <Play />}
				</button>
			</motion.div>
		</AnimatePresence>
	);
}

