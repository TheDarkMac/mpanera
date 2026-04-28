export type {
  User,
  Client,
  Provider,
  Category,
  ProviderCategory,
  ServiceRequest,
  ServiceRequestPhoto,
  Notification,
  Offer,
  ProposedTimeSlot,
  Job,
  Payment,
  VerificationDocument,
  UpdateReminder,
  Review,
} from "./generated/prisma/client"

export {
  UserRole,
  ServiceRequestStatus,
  NotificationStatus,
  OfferStatus,
  JobStatus,
  PaymentMethod,
  PaymentStatus,
  VerificationDocumentType,
  VerificationDocumentStatus,
  UpdateReminderStatus,
} from "./generated/prisma/client"

export type { Prisma } from "./generated/prisma/client"

import type {
  Client,
  Provider,
  ServiceRequest,
  ServiceRequestPhoto,
  Offer,
  ProposedTimeSlot,
  Job,
  Payment,
  Review,
  Category,
  Notification,
} from "./generated/prisma/client"

export type ServiceRequestWithRelations = ServiceRequest & {
  client: Client
  category: Category
  photos: ServiceRequestPhoto[]
  offers: Offer[]
}

export type OfferWithRelations = Offer & {
  provider: Provider
  serviceRequest: ServiceRequest
  proposedSlots: ProposedTimeSlot[]
}

export type JobWithRelations = Job & {
  client: Client
  provider: Provider
  serviceRequest: ServiceRequest
  acceptedOffer: Offer
  payment: Payment | null
  review: Review | null
}

export type ProviderProfile = Provider & {
  categories: { category: Category }[]
  reviews: Review[]
}

export type ClientProfile = Client & {
  serviceRequests: ServiceRequest[]
  jobs: Job[]
}

export type NotificationWithRelations = Notification & {
  serviceRequest: ServiceRequest
  offer: Offer | null
}
