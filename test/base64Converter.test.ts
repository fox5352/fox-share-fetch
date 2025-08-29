import { describe, it, expect, beforeAll } from "vitest";
import { encodeToBase64, base64ToBuffer } from "../src/main";

describe("Testing encoding and decoding", () => {
	let sample: Uint8Array;

	beforeAll(() => {
		// Create a sample buffer with some known bytes
		sample = new TextEncoder().encode("Hello, Vitest!");
	});

	it("encodes a buffer into a valid Base64 string and decodes it back", async () => {
		// Encode the buffer
		const encoded = encodeToBase64(sample);

		// Check that it's a valid string with only Base64 chars
		expect(typeof encoded).toBe("string");
		expect(encoded).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);

		// Decode back to buffer
		const decoded = base64ToBuffer(encoded);

		// Convert back to string for validation
		const decodedText = new TextDecoder().decode(decoded);
		const originalText = new TextDecoder().decode(sample);

		expect(decodedText).toBe(originalText);
	});
});
