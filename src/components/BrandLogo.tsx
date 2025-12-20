import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
	size?: "sm" | "md";
	withText?: boolean;
	className?: string;
};

export function BrandLogo({ size = "md", withText = true, className }: BrandLogoProps) {
	const sizeClass = size === "sm" ? "h-9 w-9" : "h-10 w-10";
	const imageSize = size === "sm" ? "72px" : "120px";

	return (
		<Link
			href="/"
			className={cn(
				"group inline-flex items-center gap-3 rounded-full px-2 py-1 transition hover:scale-[1.02] hover:drop-shadow-lg",
				className,
			)}
		>
			<div
				className={cn(
					"relative overflow-hidden rounded-full border border-border/60 bg-gradient-to-br from-black/70 via-gray-900 to-secondary/40 p-1 shadow-lg",
					sizeClass,
				)}
			>
				<Image
					src="/assets/piko-logo.png"
					alt="Piko logo"
					fill
					sizes={imageSize}
					priority
					className="object-contain drop-shadow-lg"
				/>
			</div>
			{withText && (
				<span className="font-heading text-xl uppercase tracking-[0.16em] text-foreground transition group-hover:text-primary">
					Piko Artist
				</span>
			)}
		</Link>
	);
}

