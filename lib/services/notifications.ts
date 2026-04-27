import { api } from "@/lib/api";
import type {
  NotificationListParams,
  NotificationWithRequest,
  Paginated,
} from "@/types/api";
import type { Notification } from "@/lib/generated/prisma/client";

export const notificationsService = {
  list: (params?: NotificationListParams) =>
    api.get<Paginated<NotificationWithRequest>>("/notifications", { params }),
  markViewed: (id: string) =>
    api.patch<Notification>(`/notifications/${id}/view`),
};
