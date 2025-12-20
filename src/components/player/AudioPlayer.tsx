"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";

import { usePlayerStore } from "@/lib/stores/playerStore";

interface AudioPlayerProps {
	src: string;
	title?: string;
	trackIndex?: number;
}

export default function AudioPlayer({ src, title, trackIndex }: AudioPlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const wavesurfer = useRef<WaveSurfer | null>(null);
	const [localIsPlaying, setLocalIsPlaying] = useState(false);

	const { currentIndex, isPlaying, playTrack, togglePlay: toggleGlobalPlay } = usePlayerStore();
	const isActive = trackIndex !== undefined && currentIndex === trackIndex;
	const displayIsPlaying = isActive ? isPlaying : localIsPlaying;

	useEffect(() => {
		if (!containerRef.current) return;
		wavesurfer.current = WaveSurfer.create({
			container: containerRef.current,
			waveColor: "#cbd5e1",
			progressColor: "#3b82f6",
			height: 80,
			responsive: true,
		});
		wavesurfer.current.load(src);
		return () => wavesurfer.current?.destroy();
	}, [src]);

	// Keep waveform state in sync with the global player store.
	useEffect(() => {
		if (!wavesurfer.current || trackIndex === undefined) return;

		if (!isActive) {
			wavesurfer.current.pause();
			wavesurfer.current.seekTo(0);
			setLocalIsPlaying(false);
			return;
		}

		if (isPlaying) {
			wavesurfer.current.play();
		} else {
			wavesurfer.current.pause();
		}

		setLocalIsPlaying(wavesurfer.current.isPlaying());
	}, [currentIndex, isActive, isPlaying, trackIndex]);

	const handleToggle = () => {
		if (!wavesurfer.current) return;

		if (trackIndex === undefined) {
			wavesurfer.current.playPause();
			setLocalIsPlaying(wavesurfer.current.isPlaying());
			return;
		}

		// Selecting a new track from the gallery should update the global store.
		if (!isActive) {
			playTrack(trackIndex);
			wavesurfer.current.play();
			setLocalIsPlaying(true);
			return;
		}

		toggleGlobalPlay();
	};

	return (
		<div className="flex flex-col gap-2 rounded-2xl bg-slate-900/40 p-4 shadow-md">
			<div ref={containerRef} className="waveform w-full" />
			<button
				onClick={handleToggle}
				className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				{displayIsPlaying ? <Pause /> : <Play />}
				{displayIsPlaying ? "Pause" : "Play"} {title && `– ${title}`}
			</button>
		</div>
	);
}

