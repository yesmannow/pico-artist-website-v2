import Image from "next/image";
import type { ReactNode } from "react";

type GraffitiBGProps = {
	children: ReactNode;
	image?: string;
};

export default function GraffitiBG({ children, image = "/assets/graffiti-bg.jpg" }: GraffitiBGProps) {
	return (
		<div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-b from-black/70 via-background/80 to-black/70 shadow-2xl shadow-black/40">
			<Image
				src={image}
				alt="Graffiti Background"
				fill
				priority
				sizes="100vw"
				className="object-cover opacity-40 mix-blend-overlay blur-[2px]"
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-primary/10" />
			<div className="relative z-10">{children}</div>
		</div>
	);
}

