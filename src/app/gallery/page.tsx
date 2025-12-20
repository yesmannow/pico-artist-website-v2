import Image from "next/image";

import { SectionMotion } from "@/components/section-motion";

const GALLERY_IMAGES = [
	"/assets/images/artist/channels4_profile.jpg",
	"/assets/images/artist/close_up_face.jpg",
	"/assets/images/artist/on_the_mic.jpg",
	"/assets/images/artist/piko_musician_bio_photo.jpg",
];

export default function GalleryPage() {
	return (
		<SectionMotion className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 px-6 py-20 text-white">
			<h1 className="mb-10 text-center text-4xl font-bold">🖼️ Gallery</h1>
			<div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{GALLERY_IMAGES.map((src) => (
					<div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-white/5 shadow-lg">
						<Image src={src} alt="PikoFG gallery image" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
					</div>
				))}
			</div>
		</SectionMotion>
	);
}
