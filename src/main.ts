export { base64ToBuffer, encodeToBase64, encrypt, decrypt } from "./utils"

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

export async function heathCheck(url: string): Promise<boolean> {
	const res = await fetch(`${url}/`, {
		method: "GET"
	});

	if (res.ok) {
		return true;
	} else {
		return true;
	}
}


export async function getindex(url: string): Promise<Routes | null> {
	try {
		const res = await fetch(`${url}/`, {
			method: "GET",
		})

		if (!res.ok) {
			return null
		}

		const { data } = await res.json();

		return data;
	} catch (error) {
		console.error("Failed to get index of server");
		return null
	}
}
