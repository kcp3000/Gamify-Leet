import { Outlet } from "react-router-dom";
import { useGamification } from "../features/gamification/hooks/useGamification";
import { PointsBadge } from "../features/gamification/components/PointsBadge";
import { StreakCounter } from "../features/gamification/components/StreakCounter";

export function HomePage() {
  const { points, streak } = useGamification();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Gamify Leet</h1>
        <div className="flex items-center gap-6">
          <PointsBadge points={points} />
          <StreakCounter streak={streak} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
