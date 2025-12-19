import Link from "next/link";
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
		<SectionMotion className="space-y-8">
			<div className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight">Music</h1>
				<p className="max-w-2xl text-lg text-muted-foreground">
					Instrumentals, vocal experiments, and cinematic cuts. All tracks are ready for migration once the Cloudflare baseline
					is green.
				</p>
			</div>
			<div className="grid gap-6 md:grid-cols-2">
				{tracks.map((track) => (
					<Card key={track.slug}>
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
	);
}
