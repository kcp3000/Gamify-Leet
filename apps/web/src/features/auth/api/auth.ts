import type {
  AuthUser,
  LoginCredentials,
  AuthTokens,
  Permissions,
} from "../types";

const BASE_URL = "/api/auth";

export const authApi = {
  me: async (): Promise<AuthUser | null> => {
    const res = await fetch(`${BASE_URL}/me`);
    if (!res.ok) return null;
    return res.json();
  },
  login: async (credentials: LoginCredentials): Promise<AuthTokens> => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },
  logout: async (): Promise<void> => {
    await fetch(`${BASE_URL}/logout`, { method: "POST" });
  },
  getPermissions: async (): Promise<Permissions> => {
    const res = await fetch(`${BASE_URL}/permissions`);
    if (!res.ok) throw new Error("Failed to fetch permissions");
    return res.json();
  },
};
