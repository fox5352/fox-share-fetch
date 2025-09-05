import { describe, it, expect } from "vitest";
import { getSettings } from "../src/requests";
import { URL } from "./setup";



describe("settings route tests", () => {

	it("Get settings state:success", async () => {
		const res = await getSettings(URL);

		expect(res).toHaveProperty("allowed_types");

		expect(res).toHaveProperty("port");
		expect(res).toHaveProperty("address_mode");
	})
})
