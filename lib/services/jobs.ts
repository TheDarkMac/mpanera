import { api } from "@/lib/api";
import type {
  JobListParams,
  JobWithRelations,
  Paginated,
  UpdateJobStatusBody,
} from "@/types/api";
import type { Job } from "@/lib/generated/prisma/client";

export const jobsService = {
  list: (params?: JobListParams) =>
    api.get<Paginated<Job>>("/jobs", { params }),
  get: (id: string) => api.get<JobWithRelations>(`/jobs/${id}`),
  updateStatus: (id: string, body: UpdateJobStatusBody) =>
    api.patch<Job>(`/jobs/${id}/status`, body),
};
