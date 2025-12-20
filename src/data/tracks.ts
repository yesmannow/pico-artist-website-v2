import { tracks as musicTracks } from "./music";

type MusicTrack = (typeof musicTracks)[number];

export type TrackWithPreview = MusicTrack & {
	id: string;
	preview: string;
	art: string;
};

// Maintain a simple alias for downstream imports.
export type Track = TrackWithPreview;

const previewFiles = [
	"12_05.mp3",
	"Amor Sincero.mp3",
	"Bungalow.mp3",
	"Corazon Y Mente.mp3",
	"Crussin.mp3",
];

const artFiles = [
	"abstract-1846847_1280.jpg",
	"aurora-borealis-9267515_1280.jpg",
	"dj-2581269_1280.jpg",
	"graffiti-3750912_1280.jpg",
	"vinyl-1595847_1280.jpg",
];

export const tracks: TrackWithPreview[] = musicTracks.map((track, index) => ({
	...track,
	id: `track-${index + 1}`,
	preview: `/assets/audio/previews/${encodeURIComponent(previewFiles[index % previewFiles.length])}`,
	art: `/assets/images/tracks/${artFiles[index % artFiles.length]}`,
}));

