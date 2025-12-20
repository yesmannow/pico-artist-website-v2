import Image from "next/image";
import Link from "next/link";

import GraffitiBG from "@/components/GraffitiBG";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
	title: "Contact",
	description: "Booking, collabs, and visuals. Wrapped in graffiti gradients.",
};

export default function ContactPage() {
	return (
		<GraffitiBG image="/assets/graffiti-bg.jpg">
			<SectionMotion className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
				<Card className="relative overflow-hidden border-border/60 bg-black/70">
					<div className="pointer-events-none absolute inset-0">
						<Image
							src="/assets/skull.jpg"
							alt="Skull art"
							fill
							sizes="60vw"
							className="object-cover opacity-15 mix-blend-lighten"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-br from-black/80 via-background/70 to-primary/15" />
					</div>
					<CardHeader className="relative space-y-2">
						<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reach out</p>
						<CardTitle className="font-heading text-4xl uppercase tracking-[0.1em]">Booking & Collabs</CardTitle>
						<CardDescription className="text-base">
							Graffiti visuals, live AV sets, and cinematic electronica. Share the brief and we’ll lock the date.
						</CardDescription>
					</CardHeader>
					<CardContent className="relative space-y-4">
						<form className="space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<FormField label="Name" name="name" type="text" />
								<FormField label="Email" name="email" type="email" />
							</div>
							<FormField label="Project / Event" name="subject" type="text" />
							<div className="space-y-2">
								<label className="text-sm font-semibold uppercase tracking-[0.12em]" htmlFor="message">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									rows={4}
									placeholder="Dates, venue, visual direction, or stems to include."
									className="w-full rounded-xl border border-border/70 bg-black/30 px-3 py-3 text-sm text-foreground shadow-inner shadow-black/20 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								/>
							</div>
							<Button className="w-full">Send message</Button>
						</form>
						<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
							<span className="rounded-full bg-primary/15 px-3 py-1 text-primary">Response in &lt;24h</span>
							<span className="rounded-full bg-secondary/15 px-3 py-1 text-secondary">Remote / On-site</span>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-border/60 bg-gradient-to-b from-background/70 to-black/70">
					<div className="relative h-40 w-full overflow-hidden">
						<Image
							src="/assets/skate.jpg"
							alt="Skateboard parallax"
							fill
							sizes="60vw"
							className="object-cover opacity-80"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background/90" />
						<div className="absolute bottom-4 left-4 space-y-1 text-white drop-shadow-lg">
							<p className="text-xs uppercase tracking-[0.2em]">Parallax layer</p>
							<p className="font-heading text-2xl">Street & skate energy</p>
						</div>
					</div>
					<CardContent className="space-y-4 p-6">
						<p className="text-sm text-muted-foreground">
							Overlay gradient adds contrast (rgba(18,18,18,0.8)) while the parallax skate texture keeps the page kinetic. Audio
							visual cues stay in sync with motion.
						</p>
						<div className="grid gap-3 sm:grid-cols-2">
							<LinkCard href="/events" title="Events timeline" description="Lineup, dates, and AV setups." />
							<LinkCard href="/fan-wall" title="Graffiti fan wall" description="Spray a message with spray-style input." />
						</div>
						<div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/15 via-background to-secondary/10 p-4 text-sm text-muted-foreground">
							<p className="font-semibold text-foreground">Need stage visuals?</p>
							<p>We can match BPM, color palette, and motion style to your setlist.</p>
						</div>
					</CardContent>
				</Card>
			</SectionMotion>
		</GraffitiBG>
	);
}

function FormField({ label, name, type }: { label: string; name: string; type: string }) {
	return (
		<div className="space-y-2">
			<label className="text-sm font-semibold uppercase tracking-[0.12em]" htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				className="w-full rounded-xl border border-border/70 bg-black/30 px-3 py-2 text-sm text-foreground shadow-inner shadow-black/20 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			/>
		</div>
	);
}

function LinkCard({ href, title, description }: { href: string; title: string; description: string }) {
	return (
		<Link
			href={href}
			className="group rounded-2xl border border-border/60 bg-black/30 p-4 transition hover:border-primary hover:shadow-primary/30 hover:shadow-lg"
		>
			<p className="font-heading text-xl uppercase tracking-[0.1em] text-foreground">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
			<span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-primary transition group-hover:translate-x-1">
				Open <span aria-hidden>→</span>
			</span>
		</Link>
	);
}

