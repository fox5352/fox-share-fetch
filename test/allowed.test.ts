import { describe, expect, it } from "vitest";
import { getAllowedList } from "../src/requests";
import { URL } from "./setup";

describe("allowed route test", () => {
	it("Get allowed list", async () => {
		const res = await getAllowedList(URL);


		expect(res).toHaveProperty("messages");

		expect(res?.messages).toBe("Allowed file types and folders");

		expect(res).toHaveProperty("allowed_types");

		expect(Array.isArray(res?.allowed_types)).toBe(true);
	})
})
