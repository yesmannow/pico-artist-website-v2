"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";

import { useMediaSession } from "@/hooks/useMediaSession";
import { usePlayerStore } from "@/lib/stores/playerStore";

export default function NowPlayingBar() {
	const { playlist, currentIndex, isPlaying, togglePlay, next, prev, stop } = usePlayerStore();
	const track = currentIndex !== null ? playlist[currentIndex] : null;

	useMediaSession();

	if (!track) return null;

	return (
		<AnimatePresence>
			<motion.div
				key={track.id}
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100, opacity: 0 }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-slate-900/80 px-6 py-3 text-white shadow-xl backdrop-blur-xl now-playing-shadow"
			>
				<div className="relative h-12 w-12 overflow-hidden rounded-md border border-white/10">
					<Image src={track.art} alt={track.title} fill sizes="64px" className="object-cover" priority />
				</div>
				<div className="flex flex-col">
					<span className="font-semibold">{track.title}</span>
					<span className="text-sm opacity-70">{track.artist}</span>
				</div>
				<div className="ml-auto flex items-center gap-3">
					<button type="button" onClick={prev} className="rounded-lg p-2 hover:bg-white/10">
						<SkipBack />
					</button>
					<button type="button" onClick={togglePlay} className="rounded-lg p-2 hover:bg-white/10">
						{isPlaying ? <Pause /> : <Play />}
					</button>
					<button type="button" onClick={next} className="rounded-lg p-2 hover:bg-white/10">
						<SkipForward />
					</button>
					<button type="button" onClick={stop} className="rounded-lg p-2 hover:bg-white/10">
						<X />
					</button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}

