import { useQuery } from "@tanstack/react-query";
import { issuesApi } from "../api/issues";
import type { Issue, IssueFilter } from "../types";

export function useIssues(filter?: IssueFilter) {
  const { data, isLoading, error } = useQuery<Issue[]>({
    queryKey: ["issues", filter],
    queryFn: () => issuesApi.list(filter),
    staleTime: 5 * 60 * 1000,
  });

  return {
    issues: data ?? [],
    isLoading,
    error,
  };
}
