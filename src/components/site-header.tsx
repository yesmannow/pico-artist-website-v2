import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/music", label: "Music" },
	{ href: "/videos", label: "Videos" },
	{ href: "/gallery", label: "Gallery" },
	{ href: "/visualizer", label: "Visualizer" },
];

export function SiteHeader({ activePath }: { activePath?: string }) {
	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-lg">
			<div className="container flex items-center justify-between py-4">
				<Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
					<span className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
					Piko Artist
				</Link>
				<nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"transition hover:text-foreground",
								activePath === item.href && "text-foreground underline underline-offset-4",
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<div className="flex items-center gap-3">
					<Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
						<Link href="/music">Listen now</Link>
					</Button>
					<Button asChild size="sm" variant="default">
						<Link href="/videos">Watch</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
