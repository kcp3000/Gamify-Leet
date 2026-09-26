import type { Issue, IssueFilter, IssueListResponse } from "../types";

const BASE_URL = "/api/issues";

export const issuesApi = {
  list: async (filter?: IssueFilter): Promise<IssueListResponse> => {
    const params = new URLSearchParams();
    if (filter?.status) params.set("status", filter.status);
    if (filter?.assignee) params.set("assignee", filter.assignee);
    const res = await fetch(`${BASE_URL}?${params}`);
    if (!res.ok) throw new Error("Failed to fetch issues");
    return res.json();
  },
  get: async (id: string): Promise<Issue> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch issue");
    return res.json();
  },
};
