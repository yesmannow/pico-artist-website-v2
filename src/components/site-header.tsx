"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/music", label: "Music" },
	{ href: "/videos", label: "Videos" },
	{ href: "/events", label: "Events" },
	{ href: "/remix-gallery", label: "Remix" },
	{ href: "/fan-wall", label: "Fan wall" },
	{ href: "/contact", label: "Contact" },
];

// Animated nav link with underline slide animation
function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
	return (
		<Link
			href={href}
			className={cn(
				"relative py-1 transition hover:text-foreground",
				isActive && "text-foreground",
			)}
		>
			{label}
			<motion.span
				className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
				initial={{ width: isActive ? "100%" : "0%" }}
				whileHover={{ width: "100%" }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			/>
		</Link>
	);
}

export function SiteHeader({ activePath }: { activePath?: string }) {
	return (
		<header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
			<div className="container flex items-center justify-between gap-4 py-4">
				<div className="flex items-center gap-3">
					<motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
						<BrandLogo size="sm" />
					</motion.div>
					<motion.span
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="hidden rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary md:inline-flex"
					>
						Graffiti mode on
					</motion.span>
				</div>
				<nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
					{navItems.map((item, i) => (
						<motion.div
							key={item.href}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 * i }}
						>
							<NavLink href={item.href} label={item.label} isActive={activePath === item.href} />
						</motion.div>
					))}
				</nav>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button asChild variant="outline" size="sm" className="hidden md:inline-flex border-primary/40 text-primary">
							<Link href="/fan-wall">Fan wall</Link>
						</Button>
					</motion.div>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button asChild size="sm">
							<Link href="/music">Listen</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</header>
	);
}
