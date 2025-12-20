"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface LiveAudioAnalyzerResult {
	level: number;
	isActive: boolean;
	start: () => Promise<void>;
	stop: () => void;
	error: string | null;
}

/**
 * Hook for real-time audio analysis from microphone input
 * Used for live performance mode
 */
export function useLiveAudioAnalyzer(): LiveAudioAnalyzerResult {
	const [level, setLevel] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const rafRef = useRef<number | null>(null);

	const start = useCallback(async () => {
		try {
			setError(null);

			// Request microphone access
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: false,
					noiseSuppression: false,
					autoGainControl: false,
				},
			});

			streamRef.current = stream;

			// Create audio context and analyser
			const audioCtx = new AudioContext();
			audioContextRef.current = audioCtx;

			const analyser = audioCtx.createAnalyser();
			analyser.fftSize = 256;
			analyser.smoothingTimeConstant = 0.8;
			analyserRef.current = analyser;

			// Connect stream to analyser
			const source = audioCtx.createMediaStreamSource(stream);
			source.connect(analyser);

			setIsActive(true);

			// Start analysis loop
			const data = new Uint8Array(analyser.frequencyBinCount);

			const loop = () => {
				if (!analyserRef.current) return;

				analyserRef.current.getByteFrequencyData(data);

				// Calculate average level
				const avg = data.reduce((a, b) => a + b, 0) / data.length;
				const normalizedLevel = avg / 256;

				setLevel(normalizedLevel);

				// Broadcast beat event
				window.dispatchEvent(new CustomEvent("live-beat", { detail: normalizedLevel }));
				window.dispatchEvent(new CustomEvent("beat", { detail: normalizedLevel }));

				// Update CSS variable
				document.documentElement.style.setProperty(
					"--particle-opacity",
					`${0.1 + normalizedLevel * 0.5}`
				);

				// Broadcast mood based on amplitude
				const moods = ["chill", "hype", "dark", "neon"];
				const currentMood = moods[Math.floor(normalizedLevel * moods.length)];
				window.dispatchEvent(new CustomEvent("remix-mood", { detail: currentMood }));

				rafRef.current = requestAnimationFrame(loop);
			};

			loop();
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to access microphone";
			setError(message);
			console.error("Live audio analyzer error:", err);
		}
	}, []);

	const stop = useCallback(() => {
		// Stop animation frame
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}

		// Stop media stream
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}

		// Close audio context
		if (audioContextRef.current) {
			audioContextRef.current.close();
			audioContextRef.current = null;
		}

		analyserRef.current = null;
		setIsActive(false);
		setLevel(0);
	}, []);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			stop();
		};
	}, [stop]);

	return { level, isActive, start, stop, error };
}

