"use client";

import { SectionMotion } from "@/components/section-motion";
import { tracks } from "@/data/music-data";

export default function MusicPage() {
	return (
		<SectionMotion className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-20 text-white">
			<h1 className="mb-10 text-center text-4xl font-bold">🎵 Music</h1>
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{tracks.map((track) => (
					<div
						key={track.title}
						className="rounded-2xl bg-gray-800/50 p-6 shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
					>
						<h2 className="mb-2 text-xl font-semibold">{track.title}</h2>
						<audio controls className="w-full">
							<source src={track.file} type="audio/mpeg" />
							Your browser does not support audio.
						</audio>
					</div>
				))}
			</div>
		</SectionMotion>
	);
}
