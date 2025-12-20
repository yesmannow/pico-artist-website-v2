export type EventItem = {
	title: string;
	date: string;
	location: string;
	description: string;
	tag?: string;
	art?: string;
};

export const events: EventItem[] = [
	{
		title: "Tunnel Echoes — Warehouse Session",
		date: "Feb 08, 2025",
		location: "DTLA / Graffiti tunnel",
		description: "Immersive set with reactive projections mapped to concrete pillars and tube lighting.",
		tag: "Headliner",
		art: "/assets/tubes.jpg",
	},
	{
		title: "Skatepark Sunrise",
		date: "Mar 15, 2025",
		location: "Venice Skatepark",
		description: "Lo-fi sunrise mix with vinyl crackle and live stencil art across the bowl walls.",
		tag: "Pop-up",
		art: "/assets/skate.jpg",
	},
	{
		title: "Vinyls & Neon",
		date: "Apr 12, 2025",
		location: "Tokyo — Basement bar",
		description: "Vinyl-only set layered with synth improvisations and projected street photography.",
		tag: "Live AV",
		art: "/assets/vinyls.jpg",
	},
	{
		title: "Rooftop Static",
		date: "May 03, 2025",
		location: "Brooklyn rooftop",
		description: "Downtempo rooftop story with skyline drones and graffiti overlays fading into dusk.",
		tag: "Afterglow",
		art: "/assets/graffiti-bg.jpg",
	},
];

