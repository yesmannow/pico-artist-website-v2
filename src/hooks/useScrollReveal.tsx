"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ScrollReveal({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-10%" });

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, y: 60 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.7, ease: "easeOut", delay }}
		>
			{children}
		</motion.div>
	);
}

