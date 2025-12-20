"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
	src: string;
	title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const wavesurfer = useRef<WaveSurfer | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

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

	const togglePlay = () => {
		if (!wavesurfer.current) return;
		wavesurfer.current.playPause();
		setIsPlaying(wavesurfer.current.isPlaying());
	};

	return (
		<div className="flex flex-col gap-2 rounded-2xl bg-slate-900/40 p-4 shadow-md">
			<div ref={containerRef} className="waveform w-full" />
			<button
				onClick={togglePlay}
				className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				{isPlaying ? <Pause /> : <Play />}
				{isPlaying ? "Pause" : "Play"} {title && `– ${title}`}
			</button>
		</div>
	);
}

