"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import GraffitiBG from "@/components/GraffitiBG";
import { SectionMotion } from "@/components/section-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FanEntry = {
	id: string;
	name: string;
	message: string;
	createdAt: string;
};

const sprayBg = "bg-[radial-gradient(circle_at_20%_20%,rgba(233,30,99,0.25),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(156,39,176,0.25),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(255,87,34,0.2),transparent_30%)]";

export default function FanWallPage() {
	const [entries, setEntries] = useState<FanEntry[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { register, handleSubmit, reset } = useForm<{ name: string; message: string }>({
		defaultValues: { name: "", message: "" },
	});

	useEffect(() => {
		fetch("/api/fan-wall")
			.then((res) => res.json() as Promise<{ entries?: FanEntry[] }>)
			.then((data) => setEntries(data.entries ?? []))
			.catch(() => setEntries([]));
	}, []);

	const onSubmit = async (values: { name: string; message: string }) => {
		setIsSubmitting(true);
		try {
			const res = await fetch("/api/fan-wall", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			const data = (await res.json()) as { entry?: FanEntry };
			if (res.ok) {
				setEntries((prev) => (data.entry ? [data.entry, ...prev] : prev));
				reset({ name: "", message: "" });
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<GraffitiBG image="/assets/graffiti-bg.jpg">
			<SectionMotion className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
				<Card className="relative overflow-hidden border-border/70 bg-black/70">
					<div className="absolute inset-0 mix-blend-lighten opacity-40 blur-[2px]" />
					<CardHeader className="space-y-2">
						<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Graffiti Fan Wall</p>
						<CardTitle className="font-heading text-4xl uppercase tracking-[0.1em]">Spray a note</CardTitle>
						<CardDescription className="text-base">
							Drop a shoutout, request, or visual cue. Stored in Cloudflare KV with a spray-style texture on the canvas.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<label className="text-xs uppercase tracking-[0.14em]" htmlFor="name">
										Name or handle
									</label>
									<input
										id="name"
										{...register("name", { required: true })}
										className="w-full rounded-xl border border-border/60 bg-black/40 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
										placeholder="Astra, VJ Nova..."
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs uppercase tracking-[0.14em]" htmlFor="message">
										Tag color
									</label>
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<span className="h-3 w-6 rounded-full bg-primary" />
										<span className="h-3 w-6 rounded-full bg-secondary" />
										<span className="h-3 w-6 rounded-full bg-amber-300" />
										<span className="h-3 w-6 rounded-full bg-emerald-400" />
									</div>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-xs uppercase tracking-[0.14em]" htmlFor="message">
									Message
								</label>
								<textarea
									id="message"
									{...register("message", { required: true })}
									rows={4}
									placeholder="Drop your note – we'll paint it into the next show visuals."
									className={`w-full rounded-2xl border border-border/70 bg-black/40 px-3 py-3 text-sm text-foreground shadow-inner shadow-black/30 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${sprayBg}`}
									style={{ mixBlendMode: "lighten", filter: "brightness(0.9) saturate(1.3)" }}
								/>
							</div>
							<Button type="submit" disabled={isSubmitting} className="w-full">
								{isSubmitting ? "Saving..." : "Post to fan wall"}
							</Button>
						</form>
					</CardContent>
				</Card>

				<Card className="border-border/70 bg-black/60">
					<CardHeader>
						<CardTitle className="font-heading text-3xl uppercase tracking-[0.1em]">Live tags</CardTitle>
						<CardDescription>Newest notes first — lightly blurred graffiti texture behind each card.</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4 md:grid-cols-2">
						{entries.length === 0 && <p className="text-sm text-muted-foreground">No tags yet. Be the first.</p>}
						{entries.map((entry) => (
							<div
								key={entry.id}
								className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 shadow-inner shadow-black/20"
							>
								<div className="absolute inset-0 opacity-30 blur-[1px]">
									<div className={`h-full w-full ${sprayBg}`} />
								</div>
								<div className="relative space-y-2">
									<p className="font-semibold text-foreground">{entry.name}</p>
									<p className="text-sm text-muted-foreground">{entry.message}</p>
									<p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
										{new Date(entry.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</SectionMotion>
		</GraffitiBG>
	);
}

