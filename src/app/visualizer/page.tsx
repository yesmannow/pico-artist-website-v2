import { SectionMotion } from "@/components/section-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VisualizerCanvas } from "@/components/visualizer-canvas";

export const metadata = {
	title: "Visualizer",
	description: "Placeholder interactive canvas for future audio-reactive scenes.",
};

export default function VisualizerPage() {
	return (
		<SectionMotion className="space-y-8">
			<div className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight">Visualizer</h1>
				<p className="max-w-2xl text-lg text-muted-foreground">
					A lightweight canvas sketch to prove interactivity without heavy WebGL. Swap it with a Three.js or custom shader
					scene later.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Canvas pulse</CardTitle>
					<CardDescription>Animated bars orbiting the center to hint at audio-reactive visuals.</CardDescription>
				</CardHeader>
				<CardContent>
					<VisualizerCanvas />
				</CardContent>
			</Card>
		</SectionMotion>
	);
}
