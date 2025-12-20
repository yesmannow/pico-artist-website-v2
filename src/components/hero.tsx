"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function Hero() {
	return (
		<div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-black/80 via-background/70 to-black/70 p-6 shadow-2xl">
			<div className="absolute inset-0">
				<Image
					src="/assets/graffiti-bg.jpg"
					alt="Graffiti texture"
					fill
					priority
					sizes="100vw"
					className="object-cover opacity-30 mix-blend-overlay"
				/>
				<div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-primary/10" />
			</div>
			<div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
				<div className="space-y-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="space-y-4"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
							New drop live
							<span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_4px_rgba(233,30,99,0.6)]" />
						</div>
						<h1 className="font-heading text-5xl tracking-[0.08em] text-white sm:text-6xl">
							Graffiti-soaked electronica for neon nights.
						</h1>
						<p className="max-w-2xl text-lg text-muted-foreground">
							Piko sculpts cinematic beats, vinyl textures, and motion graphics built for Cloudflare Pages. Drift through music,
							visualizers, and a living fan wall.
						</p>
					</motion.div>

					<div className="flex flex-wrap items-center gap-4">
						<Button asChild size="lg" className="shadow-[0_10px_40px_rgba(233,30,99,0.35)]">
							<Link href="/music">Listen to music</Link>
						</Button>
						<Button asChild size="lg" variant="ghost">
							<Link href="/videos">Watch visuals</Link>
						</Button>
						<Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:border-primary">
							<Link href="/fan-wall">Fan wall</Link>
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button size="lg" variant="secondary">
									Join the drop list
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Be first to hear new releases</DialogTitle>
									<DialogDescription>Subscribe for early mixes, stems, and behind-the-scenes breakdowns.</DialogDescription>
								</DialogHeader>
								<div className="space-y-3">
									<label className="text-sm text-muted-foreground" htmlFor="email">
										Email
									</label>
									<input
										id="email"
										type="email"
										placeholder="you@example.com"
										className="w-full rounded-md border border-border/80 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									/>
								</div>
								<DialogFooter>
									<Button type="submit" className="w-full">
										Join the list
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid gap-4 sm:grid-cols-3">
						<StatCard label="Total plays" value="2.4M" />
						<StatCard label="Live visuals" value="14" />
						<StatCard label="Avg. BPM" value="128" />
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
					className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/25 via-background to-secondary/15 p-8 shadow-2xl"
				>
					<div className="absolute inset-0">
						<Image
							src="/assets/skate.jpg"
							alt="Skate silhouette"
							fill
							sizes="50vw"
							priority
							className="object-cover opacity-70 mix-blend-lighten"
						/>
						<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-primary/20" />
					</div>
					<div className="relative space-y-4">
						<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Now playing</p>
						<h2 className="text-3xl font-semibold">“Aurora Hush”</h2>
						<p className="text-sm text-muted-foreground">Glacial pads, luminous vocals, and a euphoric crescendo.</p>
						<div className="h-32 rounded-2xl border border-border/50 bg-black/40 backdrop-blur-sm">
							<div className="grid h-full grid-cols-12 items-end gap-1.5 p-4">
								{Array.from({ length: 12 }).map((_, idx) => (
									<motion.span
										key={idx}
										className="block w-full rounded-full bg-gradient-to-t from-primary/60 via-secondary/60 to-foreground/80"
										initial={{ height: 6 + idx }}
										animate={{ height: [12, 40, 18, 52, 24, 68, 20][idx % 7] }}
										transition={{ repeat: Infinity, repeatType: "mirror", duration: 2, delay: idx * 0.05 }}
									/>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-border/70 bg-card/70 px-4 py-3 shadow-inner shadow-black/10">
			<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
			<p className="text-2xl font-semibold">{value}</p>
		</div>
	);
}
