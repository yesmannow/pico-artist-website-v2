import { SectionMotion } from "@/components/section-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { galleryItems } from "@/data/gallery";

export const metadata = {
	title: "Gallery",
	description: "Mock thumbnails for upcoming visuals.",
};

export default function GalleryPage() {
	return (
		<SectionMotion className="space-y-8">
			<div className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight">Gallery</h1>
				<p className="max-w-2xl text-lg text-muted-foreground">
					Lightweight placeholders for art direction. Swap in exported assets once the deployment is stable.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Thumbnails</CardTitle>
					<CardDescription>Each tile uses gradients instead of heavy media to keep the build light.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{galleryItems.map((item) => (
							<div
								key={item.title}
								className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/15 via-background to-secondary/15 p-4"
							>
								<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,230,190,0.08),transparent_40%)] transition duration-500 group-hover:scale-110" />
								<div className="relative space-y-1">
									<p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.subtitle}</p>
									<p className="text-lg font-semibold">{item.title}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</SectionMotion>
	);
}
