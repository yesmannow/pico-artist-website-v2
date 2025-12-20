import Link from "next/link";
import dynamic from "next/dynamic";

import { BrandLogo } from "./BrandLogo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ThemeToggle = dynamic(() => import("./theme-toggle").then((mod) => mod.ThemeToggle), { ssr: false });

const navItems = [
	{ href: "/music", label: "Music" },
	{ href: "/videos", label: "Videos" },
	{ href: "/events", label: "Events" },
	{ href: "/fan-wall", label: "Fan wall" },
	{ href: "/contact", label: "Contact" },
];

export function SiteHeader({ activePath }: { activePath?: string }) {
	return (
		<header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
			<div className="container flex items-center justify-between gap-4 py-4">
				<div className="flex items-center gap-3">
					<BrandLogo size="sm" />
					<span className="hidden rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary md:inline-flex">
						Graffiti mode on
					</span>
				</div>
				<nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
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
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button asChild variant="outline" size="sm" className="hidden md:inline-flex border-primary/40 text-primary">
						<Link href="/fan-wall">Fan wall</Link>
					</Button>
					<Button asChild size="sm">
						<Link href="/music">Listen</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
