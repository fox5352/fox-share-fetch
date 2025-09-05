import { describe, expect, it } from "vitest";
import { getFilesList } from "../src/main";
import { URL } from "./setup";


describe("filetype routes", () => {

	it("GET filetype allowed", async () => {
		const res = await getFilesList(URL, "audio");

		expect(res).toHaveProperty("messages");
		expect(res?.messages).toBe("Files and directories");

		expect(res).toHaveProperty("entries");

		expect(Array.isArray(res?.entries)).toBe(true);
	})

	//TODO: add other checks here later
})
