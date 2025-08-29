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
async function heathCheck(url) {
    try {
        const res = await fetch(`${url}/`, {
            method: "GET"
        });
        if (res.ok) {
            return true;
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.error(`Failed heath check: ${error}`);
        return false;
    }
}
async function getindex(url) {
    try {
        const res = await fetch(`${url}/`, {
            method: "GET",
        });
        if (!res.ok) {
            return null;
        }
        return await res.json();
    }
    catch (error) {
        console.error("Failed to get index of server");
        return null;
    }
}

export { base64ToBuffer, encodeToBase64, getindex, heathCheck };
//# sourceMappingURL=main.mjs.map
