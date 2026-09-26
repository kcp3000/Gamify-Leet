import { useQuery } from "@tanstack/react-query";
import { issuesApi } from "../api/issues";
import type { Issue } from "../types";

export function useIssueDetail(id: string) {
  const { data, isLoading, error } = useQuery<Issue>({
    queryKey: ["issues", id],
    queryFn: () => issuesApi.get(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    issue: data,
    isLoading,
    error,
  };
}
