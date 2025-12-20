"use client";

import { motion } from "framer-motion";
import { Mic, MicOff, Radio, Volume2 } from "lucide-react";
import { useState } from "react";
import { useLiveAudioAnalyzer } from "@/hooks/useLiveAudioAnalyzer";
import { Button } from "@/components/ui/button";

export default function LivePerformanceMode() {
	const { level, isActive, start, stop, error } = useLiveAudioAnalyzer();
	const [showPanel, setShowPanel] = useState(false);

	const handleToggle = async () => {
		if (isActive) {
			stop();
		} else {
			await start();
		}
	};

	return (
		<>
			{/* Toggle button */}
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setShowPanel(!showPanel)}
				className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-3 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-shadow"
			>
				<Radio className="w-5 h-5" />
			</motion.button>

			{/* Live mode panel */}
			{showPanel && (
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20, scale: 0.95 }}
					className="fixed bottom-20 left-6 z-50 w-72 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 shadow-2xl"
				>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h3 className="font-heading text-lg uppercase tracking-wider text-white">
								Live Mode
							</h3>
							<motion.div
								animate={{
									scale: isActive ? [1, 1.2, 1] : 1,
									opacity: isActive ? 1 : 0.5,
								}}
								transition={{ repeat: isActive ? Infinity : 0, duration: 1 }}
								className={`w-3 h-3 rounded-full ${isActive ? "bg-red-500" : "bg-gray-500"}`}
							/>
						</div>

						{/* Audio level visualizer */}
						<div className="relative h-8 bg-white/5 rounded-lg overflow-hidden">
							<motion.div
								className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
								animate={{ width: `${level * 100}%` }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<Volume2 className="w-4 h-4 text-white/50" />
							</div>
						</div>

						{/* Level percentage */}
						<div className="text-center text-sm text-white/60">
							{Math.round(level * 100)}% amplitude
						</div>

						{/* Toggle button */}
						<Button
							onClick={handleToggle}
							variant={isActive ? "secondary" : "default"}
							className="w-full"
						>
							{isActive ? (
								<>
									<MicOff className="w-4 h-4 mr-2" />
									Stop Live Input
								</>
							) : (
								<>
									<Mic className="w-4 h-4 mr-2" />
									Start Live Input
								</>
							)}
						</Button>

						{/* Error message */}
						{error && (
							<p className="text-xs text-red-400 text-center">{error}</p>
						)}

						{/* Info text */}
						<p className="text-xs text-white/40 text-center">
							{isActive
								? "Visuals are reacting to your microphone input"
								: "Enable microphone to sync visuals with live audio"}
						</p>
					</div>
				</motion.div>
			)}
		</>
	);
}

