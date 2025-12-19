import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { Hero } from "@/components/hero";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredTracks } from "@/data/music";
import { galleryItems } from "@/data/gallery";
import { videos } from "@/data/videos";

export default function Home() {
	return (
		<div className="space-y-12">
			<Hero />

			<SectionMotion className="grid gap-6 md:grid-cols-3">
				{[
					{
						title: "Music",
						description: "A blend of cinematic electronica, synthwave, and vocal textures.",
						href: "/music",
						cta: "Browse tracks",
					},
					{
						title: "Videos",
						description: "Live sessions, visualizers, and behind-the-scenes breakdowns.",
						href: "/videos",
						cta: "Watch visuals",
					},
					{
						title: "Gallery",
						description: "Frames, posters, and concept art for the next live set.",
						href: "/gallery",
						cta: "View gallery",
					},
				].map((feature) => (
					<Card key={feature.title}>
						<CardHeader>
							<CardTitle>{feature.title}</CardTitle>
							<CardDescription>{feature.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild variant="outline" className="w-full">
								<Link href={feature.href}>{feature.cta}</Link>
							</Button>
						</CardContent>
					</Card>
				))}
			</SectionMotion>

			<SectionMotion className="space-y-4" delay={0.1}>
				<div className="flex items-baseline justify-between">
					<h2 className="text-3xl font-semibold">Featured tracks</h2>
					<Button asChild variant="ghost">
						<Link href="/music">See all</Link>
					</Button>
				</div>
				<div className="grid gap-6 md:grid-cols-3">
					{featuredTracks.map((track) => (
						<Card key={track.slug}>
							<CardHeader>
								<CardTitle>{track.title}</CardTitle>
								<CardDescription>{track.description}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
									<span className="rounded-full bg-muted/60 px-3 py-1">{track.length}</span>
									<span className="rounded-full bg-muted/60 px-3 py-1">{track.mood}</span>
									{track.tags.slice(0, 2).map((tag) => (
										<span key={tag} className="rounded-full bg-muted/60 px-3 py-1">
											{tag}
										</span>
									))}
								</div>
								<Button asChild className="w-full">
									<Link href={`/music/${track.slug}`}>Open track</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</SectionMotion>

			<SectionMotion className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" delay={0.15}>
				<Card>
					<CardHeader>
						<CardTitle>Visual stories</CardTitle>
						<CardDescription>Short-form clips and live session moments.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						{videos.slice(0, 2).map((video) => (
							<div key={video.title} className="space-y-3">
								<div className="aspect-video overflow-hidden rounded-xl border border-border/70">
									<iframe
										src={video.url}
										title={video.title}
										className="h-full w-full"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
								<p className="text-sm font-semibold">{video.title}</p>
								<p className="text-sm text-muted-foreground">{video.description}</p>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Audio-ready</CardTitle>
						<CardDescription>Wavesurfer.js is wired up for future stems and previews.</CardDescription>
					</CardHeader>
					<CardContent>
						<AudioPlayer source="/audio-placeholder.wav" title="Placeholder preview" />
					</CardContent>
				</Card>
			</SectionMotion>

			<SectionMotion className="space-y-4" delay={0.2}>
				<div className="flex items-baseline justify-between">
					<h2 className="text-3xl font-semibold">Gallery snapshot</h2>
					<Button asChild variant="ghost">
						<Link href="/gallery">Open gallery</Link>
					</Button>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{galleryItems.slice(0, 4).map((item) => (
						<div
							key={item.title}
							className="group relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-background to-secondary/15 p-4"
						>
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.07),transparent_40%)] transition duration-500 group-hover:scale-110" />
							<div className="relative space-y-1">
								<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.subtitle}</p>
								<p className="text-lg font-semibold">{item.title}</p>
							</div>
						</div>
					))}
				</div>
			</SectionMotion>
		</div>
	);
}
