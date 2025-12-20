"use client";

import { useEffect } from "react";

import AudioPlayer from "@/components/player/AudioPlayer";
import NowPlayingBar from "@/components/player/NowPlayingBar";
import { tracks } from "@/data/tracks";
import { usePlayerStore } from "@/lib/stores/playerStore";

export default function GalleryPage() {
	const { setPlaylist, playTrack } = usePlayerStore();

	useEffect(() => {
		setPlaylist(tracks);
	}, [setPlaylist]);

	return (
		<main className="flex flex-col gap-8 p-8 pb-24">
			{tracks.map((track, index) => (
				<div
					key={track.id}
					className="flex cursor-pointer flex-col gap-4"
					onClick={() => playTrack(index)}
				>
					<h2 className="text-lg font-bold text-white">{track.title}</h2>
					<AudioPlayer src={track.preview} title={track.title} trackIndex={index} />
				</div>
			))}
			<NowPlayingBar />
		</main>
	);
}
