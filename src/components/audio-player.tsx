"use client";

import { useEffect, useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js";

import { Button } from "./ui/button";

type AudioPlayerProps = {
	source: string;
	title?: string;
};

export function AudioPlayer({ source, title }: AudioPlayerProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const wavesurferRef = useRef<WaveSurfer | null>(null);
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (!containerRef.current) return;

		import("wavesurfer.js").then(({ default: WaveSurfer }) => {
			if (!isMounted || !containerRef.current) return;
			const wavesurfer = WaveSurfer.create({
				container: containerRef.current,
				height: 80,
				waveColor: "#8b93ff",
				progressColor: "#63e6be",
				cursorColor: "#ffffff",
				barWidth: 2,
				barGap: 2,
				normalize: true,
				url: source,
			});

			wavesurfer.on("ready", () => setIsReady(true));
			wavesurfer.on("finish", () => setIsPlaying(false));
			wavesurferRef.current = wavesurfer;
		});

		return () => {
			isMounted = false;
			wavesurferRef.current?.destroy();
			wavesurferRef.current = null;
		};
	}, [source]);

	const togglePlay = () => {
		if (!wavesurferRef.current) return;
		wavesurferRef.current.playPause();
		setIsPlaying(wavesurferRef.current.isPlaying());
	};

	return (
		<div className="rounded-xl border border-border/70 bg-card/80 p-4 shadow-inner shadow-primary/10">
			<div className="mb-3 flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">Audio ready</p>
					<p className="text-lg font-semibold">{title ?? "Preview wave"}</p>
				</div>
				<Button onClick={togglePlay} disabled={!isReady} variant="secondary" size="sm">
					{isReady ? (isPlaying ? "Pause" : "Play") : "Loading"}
				</Button>
			</div>
			<div ref={containerRef} className="w-full" aria-label="Waveform preview" />
		</div>
	);
}
