import { useQuery, useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import type { AuthUser, LoginCredentials, AuthTokens } from "../types";

export function useAuth() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<AuthUser | null>({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.me(),
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation<AuthTokens, Error, LoginCredentials>({
    mutationFn: (credentials) => authApi.login(credentials),
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: () => authApi.logout(),
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
