export async function GET() {
	const body = `User-agent: *
Allow: /
Sitemap: https://pico-artist-website-v2.pages.dev/sitemap.xml
`;
	return new Response(body, {
		headers: { "Content-Type": "text/plain" },
	});
}

