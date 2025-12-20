"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRemixHistory, clearRemixHistory, logRemix, RemixMemory } from "@/lib/aiMemoryStore";
import { generateRemixPrompt } from "@/ai/RemixController";
import { generateGraffitiImage } from "@/ai/generateGraffiti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/hooks/useScrollReveal";

export default function RemixGalleryPage() {
	const [items, setItems] = useState<RemixMemory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isGenerating, setIsGenerating] = useState(false);
	const [inputText, setInputText] = useState("");

	// Load remix history
	useEffect(() => {
		async function load() {
			const history = await getRemixHistory(20);
			setItems(history);
			setIsLoading(false);
		}
		load();
	}, []);

	// Generate new remix
	const handleGenerate = async () => {
		if (isGenerating) return;
		setIsGenerating(true);

		try {
			const keywords = inputText.split(/[\s,]+/).filter(Boolean);
			const mood = keywords[0] || "experimental";

			// Generate palette
			const palette = await generateRemixPrompt({ mood, keywords });

			// Try to generate graffiti image
			const graffitiResult = await generateGraffitiImage(inputText || "urban bass graffiti");

			const fullPalette = {
				...palette,
				image: graffitiResult.imageUrl || undefined,
			};

			// Log to memory
			await logRemix(mood, fullPalette, keywords);

			// Update local state
			setItems((prev) => [
				{
					id: crypto.randomUUID(),
					mood,
					palette: fullPalette,
					keywords,
					created_at: new Date().toISOString(),
				},
				...prev,
			]);

			// Dispatch palette event
			window.dispatchEvent(
				new CustomEvent("remix-palette", {
					detail: {
						primary: palette.primary,
						secondary: palette.secondary,
						accent: palette.accent,
						lightColor: palette.lightColor,
					},
				})
			);

			setInputText("");
		} catch (error) {
			console.error("Generation failed:", error);
		} finally {
			setIsGenerating(false);
		}
	};

	// Clear history
	const handleClear = async () => {
		await clearRemixHistory();
		setItems([]);
	};

	// Apply palette from history item
	const applyPalette = (palette: RemixMemory["palette"]) => {
		document.documentElement.style.setProperty("--remix-primary", palette.primary);
		document.documentElement.style.setProperty("--remix-secondary", palette.secondary);
		document.documentElement.style.setProperty("--remix-accent", palette.accent);
		document.documentElement.style.setProperty("--remix-light", palette.lightColor);

		window.dispatchEvent(
			new CustomEvent("remix-palette", {
				detail: {
					primary: palette.primary,
					secondary: palette.secondary,
					accent: palette.accent,
					lightColor: palette.lightColor,
				},
			})
		);
	};

	return (
		<div className="space-y-8">
			<ScrollReveal>
				<div className="flex flex-col gap-4">
					<h1 className="font-heading text-5xl uppercase tracking-[0.12em]">Remix Gallery</h1>
					<p className="max-w-3xl text-lg text-muted-foreground">
						AI-generated color palettes and graffiti art. Each remix is stored in memory and
						influences future generations.
					</p>
				</div>
			</ScrollReveal>

			{/* Generator form */}
			<ScrollReveal delay={0.1}>
				<Card className="bg-black/60 border-primary/30">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Sparkles className="w-5 h-5 text-primary" />
							Create AI Mural
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex gap-3">
							<input
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
								placeholder="Enter lyric, mood, or keywords..."
								className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50"
							/>
							<Button
								onClick={handleGenerate}
								disabled={isGenerating}
								className="min-w-[140px]"
							>
								{isGenerating ? "Generating..." : "Generate"}
							</Button>
						</div>
						<p className="text-xs text-muted-foreground">
							Tip: Try mood words like {"\"chill\""}, {"\"hype\""}, {"\"dark\""}, {"\"neon\""}, or describe a vibe.
						</p>
					</CardContent>
				</Card>
			</ScrollReveal>

			{/* Gallery header with clear button */}
			<div className="flex items-center justify-between">
				<h2 className="font-heading text-2xl uppercase tracking-wider text-muted-foreground">
					{items.length} Remix{items.length !== 1 ? "es" : ""} in Memory
				</h2>
				{items.length > 0 && (
					<Button variant="ghost" size="sm" onClick={handleClear} className="text-red-400 hover:text-red-300">
						<Trash2 className="w-4 h-4 mr-2" />
						Clear History
					</Button>
				)}
			</div>

			{/* Loading state */}
			{isLoading && (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="h-64 rounded-xl bg-white/5 animate-pulse"
						/>
					))}
				</div>
			)}

			{/* Gallery grid */}
			{!isLoading && items.length === 0 && (
				<Card className="bg-black/40 border-dashed border-white/20">
					<CardContent className="flex flex-col items-center justify-center py-16 text-center">
						<Palette className="w-12 h-12 text-muted-foreground mb-4" />
						<p className="text-lg text-muted-foreground">No remixes yet</p>
						<p className="text-sm text-muted-foreground/60">
							Generate your first AI palette above
						</p>
					</CardContent>
				</Card>
			)}

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{items.map((item, index) => (
					<ScrollReveal key={item.id || index} delay={index * 0.05}>
						<motion.div
							whileHover={{ y: -8 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						>
							<Card
								className="overflow-hidden cursor-pointer bg-black/60 hover:bg-black/70 transition-colors"
								onClick={() => applyPalette(item.palette)}
							>
								{/* Image or gradient preview */}
								<div className="relative h-48 overflow-hidden">
									{item.palette.image ? (
										<Image
											src={item.palette.image}
											alt={item.mood}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									) : (
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${item.palette.primary}, ${item.palette.secondary}, ${item.palette.accent})`,
											}}
										/>
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

									{/* Mood badge */}
									<div className="absolute top-3 left-3">
										<span className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
											{item.mood}
										</span>
									</div>
								</div>

								<CardContent className="p-4 space-y-3">
									{/* Color swatches */}
									<div className="flex gap-2">
										{[item.palette.primary, item.palette.secondary, item.palette.accent, item.palette.lightColor].map(
											(color, i) => (
												<motion.div
													key={i}
													whileHover={{ scale: 1.2 }}
													className="w-8 h-8 rounded-lg shadow-lg"
													style={{ backgroundColor: color }}
													title={color}
												/>
											)
										)}
									</div>

									{/* Shader mood description */}
									{item.palette.shaderMood && (
										<p className="text-xs text-muted-foreground line-clamp-2">
											{item.palette.shaderMood}
										</p>
									)}

									{/* Keywords */}
									{item.keywords && item.keywords.length > 0 && (
										<div className="flex flex-wrap gap-1">
											{item.keywords.slice(0, 4).map((kw) => (
												<span
													key={kw}
													className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60"
												>
													{kw}
												</span>
											))}
										</div>
									)}

									{/* Timestamp */}
									{item.created_at && (
										<p className="text-[10px] text-muted-foreground/50">
											{new Date(item.created_at).toLocaleDateString()}
										</p>
									)}
								</CardContent>
							</Card>
						</motion.div>
					</ScrollReveal>
				))}
			</div>
		</div>
	);
}

