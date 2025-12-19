import { SectionMotion } from "@/components/section-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { videos } from "@/data/videos";

export const metadata = {
	title: "Videos",
	description: "Visualizers, live takes, and studio breakdowns.",
};

export default function VideosPage() {
	return (
		<SectionMotion className="space-y-8">
			<div className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight">Videos</h1>
				<p className="max-w-2xl text-lg text-muted-foreground">
					Embedded YouTube clips to keep the Cloudflare deploy light. Replace links with final edits after migration.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{videos.map((video) => (
					<Card key={video.title}>
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
	);
}
