export type Methods = "GET"|"POST"|"UPDATE"|"DELETE";

// Encode raw binary data (ArrayBuffer or Uint8Array) to Base64 string
export function encodeToBase64(data: ArrayBuffer | Uint8Array): string {
  const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  let binary = '';
  buffer.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary);
}

// Decode Base64 string to a Uint8Array (raw binary buffer)
export function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}


export type RouteData = {
	path:string,
	name:string,
	description: string,
	methods: Methods[]
}

export type Routes = {
	routes: RouteData[]
}

export async function heathCheck(url: string, res:boolean): Promise<boolean> {
	try {
		const res = await fetch(`${url}/`, {
			method: "GET"
		});

		return res.ok;
		
	} catch (error) {
		console.error(`Failed heath check: ${error}`);		
		return false;
	}
}


export async function getindex(url:string): Promise<Routes|null> {
	try {
		const res = await fetch(`${url}/`, {
			method: "GET",
		})

		if (!res.ok) {
			return null
		}
				
		return await res.json();
	} catch (error) {
		console.error("Failed to get index of server");
		return null
	}		
}

