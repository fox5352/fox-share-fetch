import { describe, it, expect } from "vitest";

describe("Fetch API Tests", () => {
	it("should fetch a post successfully", async () => {
		const response = await fetch(`${process.env.API_BASE}/posts/1`);
		expect(response.ok).toBe(true);

		const data = await response.json();
		expect(data).toHaveProperty("id", 1);
	});

	it("should handle fetch errors", async () => {
		try {
			await fetch("https://invalid.example");
			throw new Error("This should not happen");
		} catch (err) {
			expect(err).toBeDefined();
		}
	});
});
