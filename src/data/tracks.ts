import { tracks as musicTracks } from "./music";

type MusicTrack = (typeof musicTracks)[number];

export type TrackWithPreview = MusicTrack & {
	id: string;
	preview: string;
};

const previewFiles = [
	"12_05.mp3",
	"Amor Sincero.mp3",
	"Bungalow.mp3",
	"Corazon Y Mente.mp3",
	"Crussin.mp3",
];

export const tracks: TrackWithPreview[] = musicTracks.map((track, index) => ({
	...track,
	id: `track-${index + 1}`,
	preview: `/assets/audio/previews/${encodeURIComponent(previewFiles[index % previewFiles.length])}`,
}));

