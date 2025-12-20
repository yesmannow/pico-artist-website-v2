"use client";

import AudioPlayer from "@/components/player/AudioPlayer";
import { tracks } from "@/data/tracks";

export default function GalleryPage() {
	return (
		<main className="flex flex-col gap-8 p-8">
			{tracks.map((track) => (
				<div key={track.id} className="flex flex-col gap-4">
					<h2 className="text-lg font-bold text-white">{track.title}</h2>
					<AudioPlayer src={track.preview} title={track.title} />
				</div>
			))}
		</main>
	);
}
