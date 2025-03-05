import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AuthService from "@/app/_services/authService";
import useAuthStore from "@/app/_store/useAuthStore";

interface AuthResponse {
  token: string;
  email: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, setError, logout } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: AuthCredentials) =>
      AuthService.register(email, password),
    onSuccess: (data) => {
      setUser({ email: data.email });
      setToken(data.token);
      router.push("/movies");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Registration failed");
    },
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: AuthCredentials) =>
      AuthService.login(email, password),
    onSuccess: (data) => {
      setUser({ email: data.email });
      setToken(data.token);
      router.push("/movies");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Login failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logout();
      router.push("/auth/login");
    },
  });

  return {
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: registerMutation.isPending || loginMutation.isPending,
    error: registerMutation.error || loginMutation.error,
  };
};

export default useAuth;
