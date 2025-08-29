import crypto from 'crypto';

const NONCE_SIZE = 12; // 96-bit nonce (same as Rust)
const TAG_SIZE = 16; // 128-bit GCM tag
/**
 * Encrypts plaintext using AES-256-GCM with a random 96-bit nonce.
 *
 * @param {Buffer} key - 32-byte key.
 * @param {string} plaintext - UTF-8 string to encrypt.
 * @returns {string} Base64(nonce || ciphertext || tag)
 */
function encrypt(key, plaintext) {
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
function decrypt(key, encryptedB64) {
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
function encodeToBase64(data) {
    const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
    let binary = '';
    buffer.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
}
// Decode Base64 string to a Uint8Array (raw binary buffer)
function base64ToBuffer(base64) {
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer;
}

async function reqwest(url, options = {}, key) {
    // Build default headers
    const defaultHeaders = new Headers({
        "Content-Type": key ? "text/plain" : "application/json"
    });
    // Merge user-provided headers properly
    if (options.headers) {
        const customHeaders = new Headers(options.headers);
        customHeaders.forEach((value, name) => {
            defaultHeaders.set(name, value);
        });
    }
    const res = await fetch(url, {
        ...options,
        headers: defaultHeaders
    });
    // Throw error on non-2xx responses
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
    }
    // Return raw text when encryption key is provided
    if (key) {
        const encryptedBuffer = await res.text();
        const decryptedBuffer = decrypt(key, encryptedBuffer);
        const data = JSON.parse(decryptedBuffer);
        return data;
    }
    // Otherwise, return parsed JSON
    return await res.json();
}
async function heathCheck(url, key = null) {
    const res = await reqwest(`${url}/`, {
        method: "GET"
    }, key);
    if (res.data != null) {
        return true;
    }
    else {
        return false;
    }
}
async function getindex(url, key = null) {
    try {
        const res = await reqwest(`${url}/`, {
            method: "GET",
        }, key);
        const { data } = res;
        return data;
    }
    catch (error) {
        console.error("Failed to get index of server");
        return null;
    }
}

class FoxFetch {
    url;
    key;
    constructor(url, key = null) {
        if (url.trim() == "") {
            throw new Error("Url no filled");
        }
        this.url = url;
        this.key = key;
    }
    async heathCheck() {
        return await heathCheck(this.url, this.key);
    }
    async getIndext() {
        return await getindex(this.url, this.key);
    }
}
let FoxState = null;
function createFoxFetchStore(url, key = null) {
    if (!FoxState)
        FoxState = new FoxFetch(url, key);
    return FoxState;
}

export { FoxFetch, base64ToBuffer, createFoxFetchStore, decrypt, encodeToBase64, encrypt, getindex, heathCheck };
//# sourceMappingURL=main.mjs.map
