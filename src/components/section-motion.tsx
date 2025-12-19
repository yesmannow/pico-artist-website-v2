"use client";

import { motion } from "motion/react";

type SectionMotionProps = {
	children: React.ReactNode;
	className?: string;
	delay?: number;
};

export function SectionMotion({ children, className, delay = 0 }: SectionMotionProps) {
	return (
		<motion.section
			className={className}
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
		>
			{children}
		</motion.section>
	);
}
