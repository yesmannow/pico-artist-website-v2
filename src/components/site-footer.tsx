import Link from "next/link";
import { Github, Instagram, Music2, Youtube } from "lucide-react";

const socials = [
	{ href: "https://youtube.com", label: "YouTube", icon: Youtube },
	{ href: "https://soundcloud.com", label: "SoundCloud", icon: Music2 },
	{ href: "https://instagram.com", label: "Instagram", icon: Instagram },
	{ href: "https://github.com/yesmannow", label: "GitHub", icon: Github },
];

export function SiteFooter() {
	return (
		<footer className="border-t border-border/60 bg-background/60">
			<div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
				<div>
					<h3 className="text-lg font-semibold">Piko Artist</h3>
					<p className="text-sm text-muted-foreground">Electronic soundscapes, visuals, and immersive stories.</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 text-muted-foreground">
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
		</footer>
	);
}
