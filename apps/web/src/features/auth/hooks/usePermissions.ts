import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import type { Permissions } from "../types";

export function usePermissions() {
  const { data: permissions, isLoading } = useQuery<Permissions>({
    queryKey: ["auth", "permissions"],
    queryFn: () => authApi.getPermissions(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    permissions: permissions ?? [],
    isLoading,
    hasPermission: (permission: string) =>
      permissions?.includes(permission) ?? false,
  };
}
