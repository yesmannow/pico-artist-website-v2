import Link from "next/link";
import { Github, Instagram, Music2, Youtube } from "lucide-react";

import { BrandLogo } from "./BrandLogo";

const socials = [
	{ href: "https://youtube.com", label: "YouTube", icon: Youtube },
	{ href: "https://soundcloud.com", label: "SoundCloud", icon: Music2 },
	{ href: "https://instagram.com", label: "Instagram", icon: Instagram },
	{ href: "https://github.com/yesmannow", label: "GitHub", icon: Github },
];

const footerLinks = [
	{ href: "/music", label: "Music" },
	{ href: "/videos", label: "Videos" },
	{ href: "/events", label: "Events" },
	{ href: "/fan-wall", label: "Fan wall" },
	{ href: "/contact", label: "Contact" },
];

export function SiteFooter() {
	return (
		<footer className="border-t border-border/50 bg-black/70 backdrop-blur">
			<div className="container grid gap-8 py-10 md:grid-cols-[1.1fr_1fr]">
				<div className="space-y-4">
					<BrandLogo />
					<p className="max-w-lg text-sm text-muted-foreground">
						Electronic soundscapes crafted for night drives and neon skylines. Graffiti textures, vinyl crackle, and motion-first stories
						across every page.
					</p>
					<div className="flex flex-wrap gap-3 text-muted-foreground">
						{socials.map(({ href, label, icon: Icon }) => (
							<Link
								key={href}
								href={href}
								className="flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 transition hover:border-primary hover:text-foreground"
							>
								<Icon className="h-4 w-4" />
								<span className="text-sm">{label}</span>
							</Link>
						))}
					</div>
				</div>
				<div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
						<div className="flex flex-col gap-2 text-sm text-muted-foreground">
							{footerLinks.map((link) => (
								<Link key={link.href} href={link.href} className="transition hover:text-foreground">
									{link.label}
								</Link>
							))}
						</div>
					</div>
					<div className="space-y-3">
						<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live drops</p>
						<div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-background to-secondary/10 p-4 text-sm text-muted-foreground">
							<p className="font-semibold text-foreground">Join the graffiti bulletin</p>
							<p>Fan wall notes, event alerts, and new visualizers delivered first.</p>
							<Link href="/fan-wall" className="mt-3 inline-flex text-primary hover:text-primary/80">
								Share a tag →
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
