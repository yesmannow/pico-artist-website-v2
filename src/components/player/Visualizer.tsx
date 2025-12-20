"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Visualizer({ audioRef }: { audioRef: HTMLAudioElement | null }) {
	const [level, setLevel] = useState(0);
	const analyser = useRef<AnalyserNode | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

	// Set up audio context and analyser when audio element is available
	useEffect(() => {
		if (!audioRef) return;

		// Create audio context if not exists
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}

		// Create source and analyser if not exists
		if (!sourceRef.current) {
			try {
				sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef);
				analyser.current = audioContextRef.current.createAnalyser();
				analyser.current.fftSize = 256;
				sourceRef.current.connect(analyser.current);
				analyser.current.connect(audioContextRef.current.destination);
			} catch {
				// Audio element may already be connected
			}
		}
	}, [audioRef]);

	useAnimationFrame(() => {
		if (!audioRef || !analyser.current) return;
		const data = new Uint8Array(analyser.current.frequencyBinCount);
		analyser.current.getByteFrequencyData(data);
		const avg = data.reduce((a, b) => a + b, 0) / data.length;
		const normalizedLevel = avg / 256;
		setLevel(normalizedLevel);

		// Broadcast beat event for other components
		window.dispatchEvent(new CustomEvent("beat", { detail: normalizedLevel }));

		// Update CSS variable for particle opacity
		document.documentElement.style.setProperty("--particle-opacity", `${0.1 + normalizedLevel * 0.5}`);

		// Broadcast mood based on amplitude
		const moods = ["chill", "hype", "dark", "neon"];
		const currentMood = moods[Math.floor(normalizedLevel * moods.length)];
		window.dispatchEvent(new CustomEvent("remix-mood", { detail: currentMood }));
	});

	return (
		<motion.div
			className="fixed inset-0 -z-20 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600"
			style={{ opacity: 0.25 + level * 0.5 }}
			animate={{ scale: 1 + level * 0.1 }}
			transition={{ type: "spring", stiffness: 60, damping: 20 }}
		/>
	);
}
