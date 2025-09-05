import { decrypt } from "./utils";
import { Allowed, Res, Settings } from "./types"

export type Methods = "GET" | "POST" | "UPDATE" | "DELETE";

export type RouteData = {
	path: string,
	name: string,
	description: string,
	methods: Methods[]
}

export type Routes = {
	routes: RouteData[]
}

export async function reqwest<T>(
	url: string,
	options: RequestInit = {},
	key?: string | null
): Promise<Res<T>> {
	// Build default headers
	const defaultHeaders = new Headers({
		"Content-Type": key ? "text/plain" : "application/json"
	});

	// Merge user-provided headers properly
	if (options.headers) {
		const customHeaders = new Headers(options.headers);
		customHeaders.forEach((value, name) => {
			defaultHeaders.set(name, value);
		});
	}

	const res = await fetch(url, {
		...options,
		headers: defaultHeaders
	});

	// Throw error on non-2xx responses
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`HTTP ${res.status}: ${text}`);
	}

	// Return raw text when encryption key is provided
	if (key) {
		const encryptedBuffer = await res.text();

		const decryptedBuffer = decrypt(key, encryptedBuffer);
		const data = JSON.parse(decryptedBuffer);

		return data
	}

	// Otherwise, return parsed JSON
	return await res.json();
}

export async function heathCheck(url: string, key: string | null = null): Promise<boolean> {
	const res = await reqwest<Routes>(`${url}/`, {
		method: "GET"
	}, key);


	if (res.data != null) {
		return true;
	} else {
		return false;
	}
}


export async function getindex(url: string, key: string | null = null): Promise<Routes | null> {
	try {
		const res = await reqwest<Routes>(`${url}/`, {
			method: "GET",
		}, key)

		const { data } = res;

		return data;
	} catch (error) {
		console.error("Failed to get index of server");
		return null
	}
}


export async function getSettings(url: string, key: string | null = null): Promise<Settings | null> {
	try {
		const res = await reqwest<Settings>(`${url}/settings`, {
			method: "GET"
		}, key);

		const { data } = res;

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}


export async function getAllowedList(url: string, key: string | null = null): Promise<Allowed | null> {
	try {
		const res = await reqwest<Allowed>(`${url}/allowed`, { method: "GET" }, key);

		const { data } = res;


		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
