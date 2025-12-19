import { notFound } from "next/navigation";
import Link from "next/link";
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
		<SectionMotion className="space-y-8">
			<div className="flex flex-col gap-3">
				<p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Music / {track.year}</p>
				<h1 className="text-4xl font-bold tracking-tight">{track.title}</h1>
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

			<Card>
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
	);
}
