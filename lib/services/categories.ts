import { api } from "@/lib/api";
import type { CategoryListParams, CategoryWithChildren } from "@/types/api";
import type { Category } from "@/lib/generated/prisma/client";

export const categoriesService = {
  list: (params?: CategoryListParams) =>
    api.get<CategoryWithChildren[]>("/categories", { params }),
  getBySlug: (slug: string) => api.get<Category>(`/categories/${slug}`),
};
