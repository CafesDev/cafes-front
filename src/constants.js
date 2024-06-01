export const TOKEN_KEY = "token"
export const BACK_END_PORT = 3000

export const BACKEND_URL = import.meta.env.DEV ? `http://localhost:${BACK_END_PORT}` : window.location.origin
console.log('Development? ', import.meta.env.DEV, BACKEND_URL)
