import { api } from "@/lib/api";
import type {
  CreateReviewBody,
  Paginated,
  PaginationParams,
} from "@/types/api";
import type { Review } from "@/lib/generated/prisma/client";

export const reviewsService = {
  createForJob: (jobId: string, body: CreateReviewBody) =>
    api.post<Review>(`/jobs/${jobId}/review`, body),
  listForProvider: (providerId: string, params?: PaginationParams) =>
    api.get<Paginated<Review>>(`/providers/${providerId}/reviews`, { params }),
};
