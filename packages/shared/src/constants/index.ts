export const APP_NAME = "Gamify Leet";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  ISSUES: "/issues",
  GAMIFICATION: "/gamification",
  PROFILE: "/profile",
} as const;

export const STORAGE_KEYS = {
  TOKEN: "gamify_leet_token",
  REFRESH_TOKEN: "gamify_leet_refresh_token",
  USER: "gamify_leet_user",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
