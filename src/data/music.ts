export type Track = {
	slug: string;
	title: string;
	description: string;
	length: string;
	mood: string;
	tags: string[];
	year: number;
	cover?: string;
};

export const tracks: Track[] = [
	{
		slug: "midnight-drive",
		title: "Midnight Drive",
		description: "Neon-soaked synthwave for late-night city cruises.",
		length: "3:42",
		mood: "Uplifting",
		tags: ["synthwave", "retro", "instrumental"],
		year: 2025,
	},
	{
		slug: "aurora-hush",
		title: "Aurora Hush",
		description: "Glacial pads and distant vocals building toward a euphoric drop.",
		length: "4:18",
		mood: "Atmospheric",
		tags: ["ambient", "electronic", "vocals"],
		year: 2025,
	},
	{
		slug: "prism-heart",
		title: "Prism Heart",
		description: "Shimmering arps, crisp drums, and a warm analog bassline.",
		length: "3:58",
		mood: "Bright",
		tags: ["indietronica", "pop", "dance"],
		year: 2024,
	},
	{
		slug: "afterglow",
		title: "Afterglow",
		description: "Slow-blooming chords with a cinematic, widescreen feel.",
		length: "5:06",
		mood: "Cinematic",
		tags: ["ambient", "cinematic", "downtempo"],
		year: 2024,
	},
	{
		slug: "starlit-echoes",
		title: "Starlit Echoes",
		description: "Reverberant plucks and pulsating bass under a drifting melody.",
		length: "4:02",
		mood: "Dreamy",
		tags: ["lofi", "electronic", "instrumental"],
		year: 2023,
	},
];

export const featuredTracks = tracks.slice(0, 3);

export function getTrack(slug: string) {
	return tracks.find((track) => track.slug === slug);
}
