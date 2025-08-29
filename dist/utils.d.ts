/**
 * Encrypts plaintext using AES-256-GCM with a random 96-bit nonce.
 *
 * @param {Buffer} key - 32-byte key.
 * @param {string} plaintext - UTF-8 string to encrypt.
 * @returns {string} Base64(nonce || ciphertext || tag)
 */
export declare function encrypt(key: string, plaintext: string): string;
/**
 * Decrypts data previously encrypted with encrypt().
 *
 * @param {Buffer} key - 32-byte key.
 * @param {string} encryptedB64 - Base64(nonce || ciphertext || tag).
 * @returns {string} UTF-8 plaintext.
 */
export declare function decrypt(key: string, encryptedB64: string): string;
export declare function encodeToBase64(data: ArrayBuffer | Uint8Array): string;
export declare function base64ToBuffer(base64: string): Uint8Array;
