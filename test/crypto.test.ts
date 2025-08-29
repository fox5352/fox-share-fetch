import { describe, expect, it } from "vitest"
import { encrypt, decrypt } from "../src/main"

describe("AES-256-GCM Encryption and Decryption", () => {
	it("encrypts and decrypts a plaintext message successfully", () => {
		const key = "12412422143153153252432231451511";
		const plaintext = "This is a secret message.";

		// Encrypt the plaintext
		const encrypted = encrypt(key, plaintext);

		// Expect the encrypted string to be a non-empty string
		expect(typeof encrypted).toBe("string");
		expect(encrypted.length).toBeGreaterThan(0);

		// Decrypt the encrypted message
		const decrypted = decrypt(key, encrypted);

		// Expect the decrypted message to match the original plaintext
		expect(decrypted).toBe(plaintext);
	});
});
