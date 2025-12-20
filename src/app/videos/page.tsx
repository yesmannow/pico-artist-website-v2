import Image from "next/image";

import GraffitiBG from "@/components/GraffitiBG";
import { PlaybackOverlay } from "@/components/PlaybackOverlay";
import { SectionMotion } from "@/components/section-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { videos } from "@/data/videos";

export const metadata = {
	title: "Videos",
	description: "Visualizers, live takes, and studio breakdowns.",
};

export default function VideosPage() {
	return (
		<GraffitiBG image="/assets/vinyls.jpg">
			<div className="relative">
				<PlaybackOverlay />
				<SectionMotion className="space-y-8">
					<div className="flex flex-col gap-3">
						<h1 className="font-heading text-5xl uppercase tracking-[0.12em]">Videos</h1>
						<p className="max-w-2xl text-lg text-muted-foreground">
							Embedded YouTube clips, light on weight, heavy on graffiti overlays. Visualizer glow responds to the global audio player.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{videos.map((video) => (
							<Card key={video.title} className="overflow-hidden border-border/60 bg-black/70">
								<div className="relative h-48 w-full overflow-hidden">
									<Image
										src={video.poster ?? "/assets/vinyls.jpg"}
										alt={video.title}
										fill
										sizes="50vw"
										className="object-cover opacity-80"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/90" />
									<div className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white">
										New
									</div>
								</div>
								<CardHeader>
									<CardTitle>{video.title}</CardTitle>
									<CardDescription>{video.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="aspect-video overflow-hidden rounded-xl border border-border/60">
										<iframe
											src={video.url}
											title={video.title}
											className="h-full w-full"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
										/>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</SectionMotion>
			</div>
		</GraffitiBG>
	);
}
