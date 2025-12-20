import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface RemixMemory {
	id?: string;
	mood: string;
	palette: {
		primary: string;
		secondary: string;
		accent: string;
		lightColor: string;
		shaderMood: string;
		image?: string;
	};
	keywords?: string[];
	created_at?: string;
}

// Lazy-loaded Supabase client
let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
	if (supabaseClient) return supabaseClient;

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !key) {
		console.warn("Supabase not configured - using local storage fallback");
		return null;
	}

	supabaseClient = createClient(url, key);
	return supabaseClient;
}

// Local storage fallback for when Supabase isn't configured
const LOCAL_STORAGE_KEY = "remix_memory";

function getLocalMemory(): RemixMemory[] {
	if (typeof window === "undefined") return [];
	try {
		const data = localStorage.getItem(LOCAL_STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
}

function setLocalMemory(memories: RemixMemory[]): void {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memories));
	} catch {
		// Storage full or unavailable
	}
}

/**
 * Log a new remix to the memory store
 */
export async function logRemix(
	mood: string,
	palette: RemixMemory["palette"],
	keywords?: string[]
): Promise<void> {
	const supabase = getSupabaseClient();

	if (supabase) {
		try {
			await supabase.from("remix_memory").insert([{ mood, palette, keywords }]);
		} catch (error) {
			console.error("Failed to log remix to Supabase:", error);
			// Fallback to local storage
			const memories = getLocalMemory();
			memories.unshift({ mood, palette, keywords, created_at: new Date().toISOString() });
			setLocalMemory(memories.slice(0, 50)); // Keep last 50
		}
	} else {
		// Use local storage
		const memories = getLocalMemory();
		memories.unshift({
			id: crypto.randomUUID(),
			mood,
			palette,
			keywords,
			created_at: new Date().toISOString(),
		});
		setLocalMemory(memories.slice(0, 50));
	}
}

/**
 * Get remix history from memory store
 */
export async function getRemixHistory(limit = 20): Promise<RemixMemory[]> {
	const supabase = getSupabaseClient();

	if (supabase) {
		try {
			const { data, error } = await supabase
				.from("remix_memory")
				.select("*")
				.order("created_at", { ascending: false })
				.limit(limit);

			if (error) throw error;
			return data || [];
		} catch (error) {
			console.error("Failed to get remix history from Supabase:", error);
			return getLocalMemory().slice(0, limit);
		}
	}

	return getLocalMemory().slice(0, limit);
}

/**
 * Get recent palette colors for AI context
 */
export async function getRecentPalettes(count = 5): Promise<string[]> {
	const history = await getRemixHistory(count);
	return history.map((h) => `${h.palette.primary}, ${h.palette.secondary}`);
}

/**
 * Clear all remix memory
 */
export async function clearRemixHistory(): Promise<void> {
	const supabase = getSupabaseClient();

	if (supabase) {
		try {
			await supabase.from("remix_memory").delete().neq("id", "00000000-0000-0000-0000-000000000000");
		} catch (error) {
			console.error("Failed to clear Supabase history:", error);
		}
	}

	setLocalMemory([]);
}

