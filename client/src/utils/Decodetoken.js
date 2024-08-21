// src/utils/utilities.js

export function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        return decodedPayload;
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
}
