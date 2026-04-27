import { api } from "@/lib/api";
import type { UpdateReminder } from "@/lib/generated/prisma/client";

export const remindersService = {
  confirm: (id: string) => api.post<UpdateReminder>(`/reminders/${id}/confirm`),
};
