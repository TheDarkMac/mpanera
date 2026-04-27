import { api } from "@/lib/api";
import type { CreatePaymentBody, PaymentInitiationResponse } from "@/types/api";
import type { Payment } from "@/lib/generated/prisma/client";

export const paymentsService = {
  initiate: (jobId: string, body: CreatePaymentBody) =>
    api.post<PaymentInitiationResponse>(`/jobs/${jobId}/payment`, body),
  get: (id: string) => api.get<Payment>(`/payments/${id}`),
  webhook: (payload: unknown) => api.post<void>("/payments/webhook", payload),
};
