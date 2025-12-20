import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import GraffitiBG from "@/components/GraffitiBG";
import { AudioPlayer } from "@/components/audio-player";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrack, tracks } from "@/data/music";

type PageParams = { slug: string };

export function generateStaticParams() {
	return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
	const { slug } = await params;
	const track = getTrack(slug);
	if (!track) return {};

	return {
		title: `${track.title} — Music`,
		description: track.description,
	};
}

export default async function TrackDetail({ params }: { params: Promise<PageParams> }) {
	const { slug } = await params;
	const track = getTrack(slug);
	if (!track) return notFound();

	return (
		<GraffitiBG image={track.cover ?? "/assets/graffiti-bg.jpg"}>
			<SectionMotion className="space-y-8">
				<div className="relative overflow-hidden rounded-3xl border border-border/60 bg-black/70 p-6">
					<Image
						src={track.cover ?? "/assets/graffiti-bg.jpg"}
						alt={track.title}
						fill
						sizes="100vw"
						className="object-cover opacity-40 mix-blend-lighten blur-[1px]"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-background/60 to-primary/15" />
					<div className="relative space-y-3">
						<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Music / {track.year}</p>
						<h1 className="font-heading text-5xl uppercase tracking-[0.12em]">{track.title}</h1>
						<p className="max-w-2xl text-lg text-muted-foreground">{track.description}</p>
						<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
							<span className="rounded-full bg-muted/60 px-3 py-1">Length {track.length}</span>
							<span className="rounded-full bg-muted/60 px-3 py-1">{track.mood}</span>
							{track.tags.map((tag) => (
								<span key={tag} className="rounded-full bg-muted/60 px-3 py-1">
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>

				<Card className="border-border/60 bg-black/70">
					<CardHeader>
						<CardTitle>Audio preview</CardTitle>
						<CardDescription>Placeholder waveform ready for future stems or full songs.</CardDescription>
					</CardHeader>
					<CardContent>
						<AudioPlayer source="/audio-placeholder.wav" title={track.title} />
					</CardContent>
				</Card>

				<div className="flex flex-wrap gap-3">
					<Button asChild>
						<Link href="/music">Back to music</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/videos">Watch live session</Link>
					</Button>
				</div>
			</SectionMotion>
		</GraffitiBG>
	);
}
