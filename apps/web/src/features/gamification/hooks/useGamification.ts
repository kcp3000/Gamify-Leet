import { useQuery } from "@tanstack/react-query";
import { gamificationApi } from "../api/gamification";
import type { UserPoints, StreakInfo } from "../types";

export function useGamification() {
  const { data: points, isLoading } = useQuery<UserPoints>({
    queryKey: ["gamification", "points"],
    queryFn: () => gamificationApi.getPoints(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: streak } = useQuery<StreakInfo>({
    queryKey: ["gamification", "streak"],
    queryFn: () => gamificationApi.getStreak(),
    staleTime: 60 * 1000,
  });

  return {
    points: points ?? { total: 0, level: 1 },
    streak: streak ?? { current: 0, longest: 0 },
    isLoading,
  };
}
