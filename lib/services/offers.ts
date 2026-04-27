import { api } from "@/lib/api";
import type {
  AcceptOfferBody,
  CreateOfferBody,
  OfferWithProvider,
  UpdateOfferBody,
} from "@/types/api";
import type { Job, Offer } from "@/lib/generated/prisma/client";

export const offersService = {
  listForServiceRequest: (serviceRequestId: string) =>
    api.get<OfferWithProvider[]>(`/service-requests/${serviceRequestId}/offers`),
  create: (serviceRequestId: string, body: CreateOfferBody) =>
    api.post<Offer>(`/service-requests/${serviceRequestId}/offers`, body),
  get: (id: string) => api.get<OfferWithProvider>(`/offers/${id}`),
  update: (id: string, body: UpdateOfferBody) =>
    api.patch<Offer>(`/offers/${id}`, body),
  accept: (id: string, body: AcceptOfferBody) =>
    api.post<Job>(`/offers/${id}/accept`, body),
  refuse: (id: string) => api.post<Offer>(`/offers/${id}/refuse`),
  withdraw: (id: string) => api.post<Offer>(`/offers/${id}/withdraw`),
};
