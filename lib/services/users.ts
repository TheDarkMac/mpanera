import { api } from "@/lib/api";
import type { Me, UpdateUserRequest } from "@/types/api";
import type { User } from "@/lib/generated/prisma/client";

export const usersService = {
  me: () => api.get<Me>("/me"),
  update: (body: UpdateUserRequest) => api.patch<User>("/me", body),
};
