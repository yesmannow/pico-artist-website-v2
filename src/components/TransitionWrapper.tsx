"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
	const path = usePathname();
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={path}
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -40 }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				className="relative min-h-screen"
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

