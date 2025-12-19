"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const lenis = new Lenis({
			smoothWheel: true,
			lerp: 0.08,
		});

		let frame: number;
		const raf = (time: number) => {
			lenis.raf(time);
			frame = requestAnimationFrame(raf);
		};

		frame = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(frame);
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
