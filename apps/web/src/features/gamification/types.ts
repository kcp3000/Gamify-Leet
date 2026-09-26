export interface UserPoints {
  total: number;
  level: number;
  breakdown: Record<string, number>;
}

export interface StreakInfo {
  current: number;
  longest: number;
  lastActive: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}
