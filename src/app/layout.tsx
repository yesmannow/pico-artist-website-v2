import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import "./globals.css";
import GraffitiBG from "@/components/GraffitiBG";
import MiniPlayer from "@/components/player/MiniPlayer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
	metadataBase: new URL("https://pico-artist-website-v2.pages.dev"),
	title: {
		default: "Piko Artist | Electronic music & visual stories",
		template: "%s | Piko Artist",
	},
	description: "Immersive electronic music with motion-driven visuals, built for Cloudflare Pages.",
	openGraph: {
		type: "website",
		url: "https://pico-artist-website-v2.pages.dev",
		title: "Piko Artist | Electronic music & visual stories",
		description: "Graffiti textures, neon gradients, and cinematic electronica by Piko.",
		images: [{ url: "/assets/piko-logo.png", width: 1200, height: 630, alt: "Piko Artist logo" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Piko Artist | Graffiti-soaked visuals & electronica",
		description: "Experience music, visuals, fan wall, and events in one graffiti-wrapped layout.",
		images: ["/assets/piko-logo.png"],
	},
	icons: {
		icon: "/assets/piko-logo.png",
		shortcut: "/assets/piko-logo.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(inter.variable, bebas.variable, "min-h-screen bg-background font-body text-foreground antialiased")}>
				<SmoothScrollProvider>
					<div className="flex min-h-screen flex-col">
						<SiteHeader />
						<main className="flex-1 pb-12">
							<GraffitiBG>
								<div className="container py-10 lg:py-16">{children}</div>
							</GraffitiBG>
						</main>
						<SiteFooter />
					</div>
				</SmoothScrollProvider>
				<MiniPlayer />
			</body>
		</html>
	);
}
