import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    loginStatus,
    isLoginSuccess,
    isInitializing,
    login,
    clear,
  } = useInternetIdentity();

  const isAuthenticated =
    isLoginSuccess || (!!identity && loginStatus !== "idle");
  const isLoading = isInitializing;
  const principal = identity?.getPrincipal().toText() ?? null;

  return {
    isAuthenticated,
    isLoading,
    principal,
    identity,
    loginStatus,
    login,
    logout: clear,
  };
}
