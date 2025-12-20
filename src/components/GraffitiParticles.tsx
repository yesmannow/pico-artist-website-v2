"use client";

import { useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	color: string;
	life: number;
	maxLife: number;
}

export default function GraffitiParticles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const [opacity, setOpacity] = useState(0.2);

	// Listen for beat events to pulse particle opacity
	useEffect(() => {
		const handleBeat = (e: CustomEvent<number>) => {
			setOpacity(0.1 + e.detail * 0.5);
		};
		window.addEventListener("beat", handleBeat as EventListener);
		return () => window.removeEventListener("beat", handleBeat as EventListener);
	}, []);

	// Resize canvas to window
	useEffect(() => {
		const resize = () => {
			const c = canvasRef.current;
			if (c) {
				c.width = window.innerWidth;
				c.height = window.innerHeight;
			}
		};
		resize();
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, []);

	// Initialize particles
	useEffect(() => {
		const colors = [
			"#e91e63", // neon pink
			"#9c27b0", // electric purple
			"#ff5722", // graffiti orange
			"#ffeb3b", // paint yellow
			"#00bcd4", // cyan
			"#4caf50", // green
		];

		particlesRef.current = Array.from({ length: 60 }, () => ({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			r: Math.random() * 3 + 1,
			color: colors[Math.floor(Math.random() * colors.length)],
			life: Math.random() * 100,
			maxLife: 100 + Math.random() * 100,
		}));
	}, []);

	useAnimationFrame(() => {
		const c = canvasRef.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, c.width, c.height);

		particlesRef.current.forEach((p) => {
			// Update position
			p.x += p.vx;
			p.y += p.vy;
			p.life += 1;

			// Wrap around edges
			if (p.x < 0) p.x = c.width;
			if (p.x > c.width) p.x = 0;
			if (p.y < 0) p.y = c.height;
			if (p.y > c.height) p.y = 0;

			// Reset if life exceeded
			if (p.life > p.maxLife) {
				p.life = 0;
				p.x = Math.random() * c.width;
				p.y = Math.random() * c.height;
			}

			// Calculate alpha based on life
			const lifeRatio = p.life / p.maxLife;
			const alpha = lifeRatio < 0.5 ? lifeRatio * 2 : (1 - lifeRatio) * 2;

			// Draw particle with glow
			ctx.save();
			ctx.globalAlpha = alpha * 0.8;
			ctx.shadowBlur = 15;
			ctx.shadowColor = p.color;
			ctx.fillStyle = p.color;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		});
	});

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 -z-10 pointer-events-none mix-blend-screen"
			style={{ opacity }}
		/>
	);
}

