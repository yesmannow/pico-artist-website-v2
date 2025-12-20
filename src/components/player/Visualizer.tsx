"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

export default function Visualizer({ audioRef }: { audioRef: HTMLAudioElement | null }) {
	const [level, setLevel] = useState(0);
	const analyser = useRef<AnalyserNode | null>(null);

	useAnimationFrame(() => {
		if (!audioRef || !analyser.current) return;
		const data = new Uint8Array(analyser.current.frequencyBinCount);
		analyser.current.getByteFrequencyData(data);
		const avg = data.reduce((a, b) => a + b, 0) / data.length;
		setLevel(avg / 256);
	});

	return (
		<motion.div
			className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600"
			style={{ opacity: 0.25 + level * 0.5 }}
			animate={{ scale: 1 + level * 0.1 }}
			transition={{ type: "spring", stiffness: 60, damping: 20 }}
		/>
	);
}


