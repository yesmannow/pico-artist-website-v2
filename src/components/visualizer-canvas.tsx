"use client";

import { useEffect, useRef } from "react";

const BAR_COUNT = 40;
const BASE_RADIUS = 120;
const RADIUS_SWAY = 30;
const BASE_BAR_HEIGHT = 40;
const BAR_HEIGHT_SWAY = 22;

export function VisualizerCanvas() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const frameRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = canvas.clientWidth * devicePixelRatio;
			canvas.height = canvas.clientHeight * devicePixelRatio;
			ctx.scale(devicePixelRatio, devicePixelRatio);
		};

		resize();
		window.addEventListener("resize", resize);

		let t = 0;
		const render = () => {
			const { width, height } = canvas;
			ctx.clearRect(0, 0, width, height);
			ctx.save();
			ctx.scale(devicePixelRatio, devicePixelRatio);
			ctx.fillStyle = "rgba(12,12,16,0.8)";
			ctx.fillRect(0, 0, width, height);

			const centerX = width / devicePixelRatio / 2;
			const centerY = height / devicePixelRatio / 2;
			for (let i = 0; i < BAR_COUNT; i++) {
				const angle = (i / BAR_COUNT) * Math.PI * 2;
				const radius = BASE_RADIUS + Math.sin(t / 20 + i * 0.3) * RADIUS_SWAY;
				const x = centerX + Math.cos(angle) * radius;
				const y = centerY + Math.sin(angle) * radius;
				const barHeight = BASE_BAR_HEIGHT + Math.sin(t / 15 + i * 0.5) * BAR_HEIGHT_SWAY;

				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(angle);
				const gradient = ctx.createLinearGradient(0, 0, 0, -barHeight);
				gradient.addColorStop(0, "rgba(123,97,255,0.9)");
				gradient.addColorStop(1, "rgba(99,230,190,0.8)");
				ctx.fillStyle = gradient;
				ctx.fillRect(-3, 0, 6, -barHeight);
				ctx.restore();
			}

			ctx.restore();
			t += 1;
			frameRef.current = requestAnimationFrame(render);
		};

		frameRef.current = requestAnimationFrame(render);

		return () => {
			window.removeEventListener("resize", resize);
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, []);

	return <canvas ref={canvasRef} className="h-[360px] w-full rounded-2xl border border-border/70 bg-gradient-to-b from-background to-background/60" />;
}
