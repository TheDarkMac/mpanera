import { api } from "@/lib/api";
import type {
  Paginated,
  ProviderProfile,
  ProviderSearchParams,
  UpdateProviderCategoriesRequest,
} from "@/types/api";
import type { Provider } from "@/lib/generated/prisma/client";

export const providersService = {
  search: (params?: ProviderSearchParams) =>
    api.get<Paginated<Provider>>("/providers", { params }),
  get: (id: string) => api.get<ProviderProfile>(`/providers/${id}`),
  setMyCategories: (body: UpdateProviderCategoriesRequest) =>
    api.put<Provider>("/providers/me/categories", body),
};
