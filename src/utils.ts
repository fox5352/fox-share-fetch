import crypto from "crypto"

const NONCE_SIZE = 12;  // 96-bit nonce (same as Rust)
const TAG_SIZE = 16;    // 128-bit GCM tag

/**
 * Encrypts plaintext using AES-256-GCM with a random 96-bit nonce.
 *
 * @param {Buffer} key - 32-byte key.
 * @param {string} plaintext - UTF-8 string to encrypt.
 * @returns {string} Base64(nonce || ciphertext || tag)
 */
export function encrypt(key: string, plaintext: string): string {
	if (!key || key.length !== 32) {
		throw new Error("Key must be 32 bytes for AES-256");
	}

	// Generate random nonce
	const nonce = crypto.randomBytes(NONCE_SIZE);

	const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);
	const ciphertext = Buffer.concat([
		cipher.update(plaintext, "utf8"),
		cipher.final(),
	]);

	const tag = cipher.getAuthTag();

	// Combine nonce + ciphertext + tag
	const combined = Buffer.concat([nonce, ciphertext, tag]);

	return combined.toString("base64");
}

/**
 * Decrypts data previously encrypted with encrypt().
 *
 * @param {Buffer} key - 32-byte key.
 * @param {string} encryptedB64 - Base64(nonce || ciphertext || tag).
 * @returns {string} UTF-8 plaintext.
 */
export function decrypt(key: string, encryptedB64: string): string {
	if (!key || key.length !== 32) {
		throw new Error("Key must be 32 bytes for AES-256");
	}

	const combined = Buffer.from(encryptedB64, "base64");
	if (combined.length < NONCE_SIZE + TAG_SIZE) {
		throw new Error("Encrypted data too short");
	}

	const nonce = combined.slice(0, NONCE_SIZE);
	const tag = combined.slice(combined.length - TAG_SIZE);
	const ciphertext = combined.slice(NONCE_SIZE, combined.length - TAG_SIZE);

	const decipher = crypto.createDecipheriv("aes-256-gcm", key, nonce);
	decipher.setAuthTag(tag);

	const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
	return decrypted.toString("utf8");
}

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
