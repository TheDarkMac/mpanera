import { api } from "@/lib/api";
import type { AuthResponse, LoginRequest, RefreshRequest, RegisterRequest } from "@/types/api";

export const authService = {
  register: (body: RegisterRequest) => api.post<AuthResponse>("/auth/register", body),
  login: (body: LoginRequest) => api.post<AuthResponse>("/auth/login", body),
  refresh: (body: RefreshRequest) => api.post<AuthResponse>("/auth/refresh", body),
  logout: () => api.post<void>("/auth/logout"),
};
