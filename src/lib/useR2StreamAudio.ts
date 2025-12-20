"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export interface R2StreamAudioResult {
	audioRef: React.RefObject<HTMLAudioElement | null>;
	isPlaying: boolean;
	isLoading: boolean;
	error: string | null;
	play: () => Promise<void>;
	pause: () => void;
	setVolume: (volume: number) => void;
	duration: number;
	currentTime: number;
}

/**
 * Hook for streaming audio from R2 bucket
 * Used for live performances and track playback
 */
export function useR2StreamAudio(fileName: string): R2StreamAudioResult {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	// Create and configure audio element
	useEffect(() => {
		if (!fileName) return;

		const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL;
		if (!r2BucketUrl) {
			setError("R2 bucket URL not configured");
			return;
		}

		setIsLoading(true);
		setError(null);

		const audio = new Audio();
		audio.crossOrigin = "anonymous";
		audio.preload = "metadata";
		audio.src = `${r2BucketUrl}/${fileName}`;

		// Event listeners
		const handleLoadedMetadata = () => {
			setDuration(audio.duration);
			setIsLoading(false);
		};

		const handleTimeUpdate = () => {
			setCurrentTime(audio.currentTime);
		};

		const handlePlay = () => {
			setIsPlaying(true);
		};

		const handlePause = () => {
			setIsPlaying(false);
		};

		const handleEnded = () => {
			setIsPlaying(false);
			setCurrentTime(0);
		};

		const handleError = () => {
			setError(`Failed to load audio: ${fileName}`);
			setIsLoading(false);
		};

		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);
		audio.addEventListener("ended", handleEnded);
		audio.addEventListener("error", handleError);

		audioRef.current = audio;

		return () => {
			audio.pause();
			audio.src = "";
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
			audio.removeEventListener("ended", handleEnded);
			audio.removeEventListener("error", handleError);
		};
	}, [fileName]);

	const play = useCallback(async () => {
		if (!audioRef.current) return;
		try {
			await audioRef.current.play();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Playback failed");
		}
	}, []);

	const pause = useCallback(() => {
		if (!audioRef.current) return;
		audioRef.current.pause();
	}, []);

	const setVolume = useCallback((volume: number) => {
		if (!audioRef.current) return;
		audioRef.current.volume = Math.max(0, Math.min(1, volume));
	}, []);

	return {
		audioRef,
		isPlaying,
		isLoading,
		error,
		play,
		pause,
		setVolume,
		duration,
		currentTime,
	};
}

