export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  assignee: string;
  priority: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
}

export interface IssueListResponse {
  issues: Issue[];
  total: number;
  page: number;
}

export interface IssueFilter {
  status?: string;
  assignee?: string;
  priority?: string;
}
