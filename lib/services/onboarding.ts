import { api } from "@/lib/api";
import type {
  CompleteClientOnboardingRequest,
  CompleteProviderOnboardingRequest,
} from "@/types/api";
import type { Client, Provider } from "@/lib/generated/prisma/client";

export const onboardingService = {
  completeClient: (body: CompleteClientOnboardingRequest) =>
    api.post<Client>("/onboarding/client", body),
  completeProvider: (body: CompleteProviderOnboardingRequest) =>
    api.post<Provider>("/onboarding/provider", body),
};
