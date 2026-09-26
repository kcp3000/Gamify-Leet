import type { UserPoints, StreakInfo } from "../types";

const BASE_URL = "/api/gamification";

export const gamificationApi = {
  getPoints: async (): Promise<UserPoints> => {
    const res = await fetch(`${BASE_URL}/points`);
    if (!res.ok) throw new Error("Failed to fetch points");
    return res.json();
  },
  getStreak: async (): Promise<StreakInfo> => {
    const res = await fetch(`${BASE_URL}/streak`);
    if (!res.ok) throw new Error("Failed to fetch streak");
    return res.json();
  },
};
