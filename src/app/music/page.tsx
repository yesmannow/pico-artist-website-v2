import Image from "next/image";
import Link from "next/link";

import GraffitiBG from "@/components/GraffitiBG";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tracks } from "@/data/music";

export const metadata = {
	title: "Music",
	description: "Listen to Piko Artist releases and demos.",
};

export default function MusicPage() {
	return (
		<GraffitiBG image="/assets/vinyls.jpg">
			<SectionMotion className="space-y-8">
				<div className="relative overflow-hidden rounded-3xl border border-border/60 bg-black/70 p-6 shadow-2xl">
					<Image
						src="/assets/dj.jpg"
						alt="DJ visual"
						fill
						sizes="100vw"
						className="object-cover opacity-35 mix-blend-lighten blur-[1px]"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-black/80 via-background/60 to-primary/20" />
					<div className="relative space-y-3">
						<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Albums & Singles</p>
						<h1 className="font-heading text-5xl uppercase tracking-[0.12em]">Music</h1>
						<p className="max-w-3xl text-lg text-muted-foreground">
							Instrumentals, vocal experiments, and cinematic cuts. Graffiti overlays mix with vinyl static for a live AV-ready
							playlist.
						</p>
						<div className="flex flex-wrap gap-3">
							<Button asChild>
								<Link href="/videos">Visualizers</Link>
							</Button>
							<Button asChild variant="outline" className="border-primary/60 text-primary">
								<Link href="/events">See events</Link>
							</Button>
						</div>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{tracks.map((track) => (
						<Card key={track.slug} className="overflow-hidden border-border/60 bg-black/70">
							<div className="relative h-40 w-full overflow-hidden">
								<Image
									src={track.cover ?? "/assets/graffiti-bg.jpg"}
									alt={track.title}
									fill
									sizes="50vw"
									className="object-cover opacity-80"
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/90" />
								<div className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white">
									{track.length}
								</div>
							</div>
							<CardHeader>
								<CardTitle className="flex items-center justify-between text-2xl">
									<span>{track.title}</span>
									<span className="text-sm font-medium text-muted-foreground">{track.year}</span>
								</CardTitle>
								<CardDescription>{track.description}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
									<span className="rounded-full bg-muted/60 px-3 py-1">Length {track.length}</span>
									<span className="rounded-full bg-muted/60 px-3 py-1">{track.mood}</span>
									{track.tags.map((tag) => (
										<span key={tag} className="rounded-full bg-muted/60 px-3 py-1">
											{tag}
										</span>
									))}
								</div>
								<Button asChild className="w-full">
									<Link href={`/music/${track.slug}`}>Open details</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</SectionMotion>
		</GraffitiBG>
	);
}
