// Polyfill fetch for JSDOM environments
import "whatwg-fetch";

// Ensure fetch exists globally
if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

// If you want a default base URL for fetch requests:
process.env.API_BASE = "https://jsonplaceholder.typicode.com";
