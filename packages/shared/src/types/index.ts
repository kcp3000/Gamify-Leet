// Shared type definitions used across frontend and backend

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Gamification {
  id: string;
  userId: string;
  points: number;
  streak: number;
  badges: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
