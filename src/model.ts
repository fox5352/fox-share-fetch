import { heathCheck, Routes, getindex } from "./requests";

export class FoxFetch {
	private url: string;
	private key: string | null;

	constructor(url: string, key: string | null = null) {
		if (url.trim() == "") {
			throw new Error("Url no filled");
		}
		this.url = url;
		this.key = key;
	}

	public async heathCheck(): Promise<boolean> {
		return await heathCheck(this.url, this.key)
	}

	public async getIndext(): Promise<Routes | null> {
		return await getindex(this.url, this.key)
	}
}

let FoxState: FoxFetch | null = null;

export default function createFoxFetchStore(url: string, key: string | null = null) {
	if (!FoxState) FoxState = new FoxFetch(url, key);

	return FoxState;
}
