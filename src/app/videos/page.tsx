"use client";

import { useEffect, useState } from "react";

import { SectionMotion } from "@/components/section-motion";

const CHANNEL_ID = "UCD2ybRyk6b1pQDfOtq2MYIw";
const FALLBACK_EMBEDS = [
	"https://www.youtube.com/embed?listType=user_uploads&list=pikofg-unamasmusic-1203",
	"https://www.youtube.com/embed?listType=playlist&list=UCD2ybRyk6b1pQDfOtq2MYIw",
];

type YouTubeSearchItem = {
	id?: { videoId?: string };
	snippet?: { title?: string };
};

type YouTubeSearchResponse = {
	items?: YouTubeSearchItem[];
};

export default function VideosPage() {
	const [videos, setVideos] = useState<{ id: string; title: string }[]>([]);

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
		if (!apiKey) return;

		const controller = new AbortController();

		(async () => {
			try {
				const res = await fetch(
					`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`,
					{ signal: controller.signal }
				);
				const data = (await res.json()) as YouTubeSearchResponse;

				setVideos(
					data.items?.flatMap((v) =>
						v?.id?.videoId
							? [
									{
										id: v.id.videoId,
										title: v?.snippet?.title ?? "Untitled",
									},
							  ]
							: []
					) ?? []
				);
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") return;
				console.error("YouTube API error:", err);
			}
		})();

		return () => controller.abort();
	}, []);

	return (
		<SectionMotion className="min-h-screen bg-black px-6 py-20 text-center text-white">
			<h1 className="mb-10 text-4xl font-bold">📺 Videos</h1>

			{videos.length > 0 ? (
				<div className="grid gap-10 md:grid-cols-2">
					{videos.map((v) => (
						<div key={v.id} className="overflow-hidden rounded-2xl shadow-lg">
							<iframe
								className="aspect-video w-full"
								src={`https://www.youtube.com/embed/${v.id}`}
								title={v.title}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
							<p className="mt-2 text-sm opacity-80">{v.title}</p>
						</div>
					))}
				</div>
			) : (
				<div className="grid gap-10 md:grid-cols-2">
					{FALLBACK_EMBEDS.map((url) => (
						<iframe
							key={url}
							className="aspect-video w-full rounded-2xl"
							src={url}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					))}
				</div>
			)}
		</SectionMotion>
	);
}
