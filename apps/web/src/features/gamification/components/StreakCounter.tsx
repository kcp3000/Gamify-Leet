import type { StreakInfo } from "../types";

interface StreakCounterProps {
  streak: StreakInfo;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <span>{streak.current} day streak</span>
      <span>Best: {streak.longest} days</span>
    </div>
  );
}
