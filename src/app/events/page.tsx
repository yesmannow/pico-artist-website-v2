import Image from "next/image";
import Link from "next/link";

import GraffitiBG from "@/components/GraffitiBG";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";

export const metadata = {
	title: "Events",
	description: "Graffiti-styled tour dates and AV pop-ups.",
};

export default function EventsPage() {
	return (
		<GraffitiBG image="/assets/tubes.jpg">
			<SectionMotion className="space-y-8">
				<div className="flex flex-col gap-3">
					<h1 className="font-heading text-5xl uppercase tracking-[0.12em]">Events</h1>
					<p className="max-w-3xl text-lg text-muted-foreground">
						Graffiti-lit sets, vinyl-only nights, and motion-reactive visuals. Catch the next drop or replay a favorite moment.
					</p>
					<div className="flex flex-wrap gap-3">
						<Button asChild>
							<Link href="/contact">Book a date</Link>
						</Button>
						<Button asChild variant="outline" className="border-primary/60 text-primary">
							<Link href="/fan-wall">Post a fan note</Link>
						</Button>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					{events.map((event) => (
						<Card key={event.title} className="overflow-hidden border-border/70 bg-black/60">
							<div className="relative h-48 w-full overflow-hidden">
								<Image
									src={event.art ?? "/assets/graffiti-bg.jpg"}
									alt={event.title}
									fill
									className="object-cover opacity-90"
									sizes="50vw"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background/90" />
								<div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
									{event.tag ?? "Live"}
								</div>
							</div>
							<CardHeader className="space-y-2">
								<CardTitle className="flex items-center justify-between text-2xl">
									<span>{event.title}</span>
									<span className="rounded-full bg-primary/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
										{event.date}
									</span>
								</CardTitle>
								<CardDescription className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
									{event.location}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{event.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</SectionMotion>
		</GraffitiBG>
	);
}

