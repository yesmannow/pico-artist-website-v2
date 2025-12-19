export type Video = {
	title: string;
	url: string;
	description: string;
};

export const videos: Video[] = [
	{
		title: "Midnight Drive (Visualizer)",
		url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		description: "A neon-drenched visualizer to match the track's momentum.",
	},
	{
		title: "Aurora Hush (Live Session)",
		url: "https://www.youtube.com/embed/oHg5SJYRHA0",
		description: "Captured in one take with modular textures and live vocals.",
	},
	{
		title: "Prism Heart (Behind the Scenes)",
		url: "https://www.youtube.com/embed/ub82Xb1C8os",
		description: "Studio breakdown of the synth layers and drum programming.",
	},
];
