import type { UserPoints } from "../types";

interface PointsBadgeProps {
  points: UserPoints;
}

export function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">🏆</span>
      <span>{points.total} pts</span>
    </div>
  );
}
