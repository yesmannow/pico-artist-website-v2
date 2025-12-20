import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

type FanWallEntry = {
	id: string;
	name: string;
	message: string;
	createdAt: string;
};

type KV = { get: (key: string, type?: "json") => Promise<unknown>; put: (key: string, value: string) => Promise<unknown> };

const KV_KEY = "fan-wall:entries";
const memoryStore: FanWallEntry[] = [];

function getKV(): KV | null {
	try {
		const ctx = getCloudflareContext();
		const kv = (ctx?.env as { FAN_WALL?: KV })?.FAN_WALL;
		return kv ?? null;
	} catch {
		return null;
	}
}

async function readEntries(kv: KV | null): Promise<FanWallEntry[]> {
	if (kv) {
		const stored = ((await kv.get(KV_KEY, "json")) ?? []) as FanWallEntry[];
		return stored;
	}
	return memoryStore;
}

async function writeEntries(kv: KV | null, entries: FanWallEntry[]) {
	if (kv) {
		await kv.put(KV_KEY, JSON.stringify(entries));
		return;
	}
	memoryStore.splice(0, memoryStore.length, ...entries);
}

export async function GET() {
	const kv = getKV();
	const entries = await readEntries(kv);
	return NextResponse.json({ entries: entries.slice(-40).reverse() });
}

export async function POST(request: Request) {
	const kv = getKV();
	const body = (await request.json().catch(() => null)) as Partial<{ name: string; message: string }> | null;
	const name = body?.name?.toString().trim();
	const message = body?.message?.toString().trim();

	if (!name || !message) {
		return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
	}

	if (message.length > 320 || name.length > 80) {
		return NextResponse.json({ error: "Message too long" }, { status: 400 });
	}

	const entry: FanWallEntry = {
		id: crypto.randomUUID(),
		name,
		message,
		createdAt: new Date().toISOString(),
	};

	const entries = await readEntries(kv);
	entries.push(entry);
	await writeEntries(kv, entries);

	return NextResponse.json({ entry }, { status: 201 });
}

