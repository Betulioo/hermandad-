const TOKEN_KEY = 'token';
// Cookies accesibles por el middleware server-side (no HttpOnly: se escriben desde JS)
const TOKEN_COOKIE = 'auth_token';
const ROLE_COOKIE = 'auth_role';
// 24 horas; si el JWT expira antes, la API rechazará las llamadas y el guard
// client-side redirigirá a /login igualmente
const COOKIE_MAX_AGE = 60 * 60 * 24;

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; SameSite=Lax; max-age=${COOKIE_MAX_AGE}`;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_COOKIE}=; path=/; SameSite=Lax; max-age=0`;
}

export function saveRole(role: string): void {
  document.cookie = `${ROLE_COOKIE}=${role}; path=/; SameSite=Lax; max-age=${COOKIE_MAX_AGE}`;
}

export function removeRole(): void {
  document.cookie = `${ROLE_COOKIE}=; path=/; SameSite=Lax; max-age=0`;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
