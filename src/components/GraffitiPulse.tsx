"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GraffitiPulse() {
	const [level, setLevel] = useState(0);

	useEffect(() => {
		const handler = (e: CustomEvent<number>) => {
			setLevel(e.detail);
		};
		window.addEventListener("live-beat", handler as EventListener);
		window.addEventListener("beat", handler as EventListener);
		return () => {
			window.removeEventListener("live-beat", handler as EventListener);
			window.removeEventListener("beat", handler as EventListener);
		};
	}, []);

	return (
		<motion.div
			className="fixed inset-0 bg-[url('/assets/graffiti-bg.jpg')] bg-cover bg-center mix-blend-overlay -z-10 pointer-events-none"
			animate={{
				scale: 1 + level * 0.1,
				opacity: 0.2 + level * 0.3,
			}}
			transition={{ type: "spring", stiffness: 80, damping: 20 }}
		/>
	);
}

