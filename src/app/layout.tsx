import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
	metadataBase: new URL("https://pico-artist-website-v2.pages.dev"),
	title: {
		default: "Piko Artist | Electronic music & visual stories",
		template: "%s | Piko Artist",
	},
	description: "Immersive electronic music with motion-driven visuals, built for Cloudflare Pages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				<SmoothScrollProvider>
					<div className="flex min-h-screen flex-col">
						<SiteHeader />
						<main className="flex-1">
							<div className="container py-10 lg:py-16">{children}</div>
						</main>
						<SiteFooter />
					</div>
				</SmoothScrollProvider>
			</body>
		</html>
	);
}
