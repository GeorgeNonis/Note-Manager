export const API_VERSION = import.meta.env.VITE_API_VERSION;
export const BASE_URL = `${import.meta.env.VITE_BASE_URL}${API_VERSION}`;

export const BASE_UR1L = `http://localhost:8080/${API_VERSION}`;

/**
 * For Deployment
 */

export const BASE_URL_DEPLOYED = `http://noni.nextjs-shop/notemanager-api/${API_VERSION}`;
