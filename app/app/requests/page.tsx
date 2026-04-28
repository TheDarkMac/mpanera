"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Clock3, Loader, Send, XCircle } from "lucide-react"

import {
  ActionLink,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"
import {
  ProviderList,
  type ProviderListItem,
} from "@/components/features/providers/provider-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  categoriesService,
  providersService,
  serviceRequestsService,
} from "@/lib/services"
import {
  type Category,
  type Provider,
  type ServiceRequest,
} from "@/lib/generated/prisma/client"
import type {
  CategoryWithChildren,
  CreateServiceRequestBody,
} from "@/types/api"

const SERVICE_REQUEST_STATUS = {
  OPEN: "OPEN",
  NEGOTIATING: "NEGOTIATING",
  ASSIGNED: "ASSIGNED",
  CLOSED: "CLOSED",
  EXPIRED: "EXPIRED",
} as const

const statusMeta = {
  [SERVICE_REQUEST_STATUS.OPEN]: {
    label: "Pending",
    icon: Clock3,
    tone: "Providers were notified and replies are pending.",
  },
  [SERVICE_REQUEST_STATUS.NEGOTIATING]: {
    label: "Replies received",
    icon: Send,
    tone: "At least one proposal has already come back.",
  },
  [SERVICE_REQUEST_STATUS.ASSIGNED]: {
    label: "Accepted",
    icon: CheckCircle2,
    tone: "Direct contact can now happen.",
  },
  [SERVICE_REQUEST_STATUS.CLOSED]: {
    label: "Closed",
    icon: XCircle,
    tone: "Request completed or archived.",
  },
  [SERVICE_REQUEST_STATUS.EXPIRED]: {
    label: "Closed",
    icon: XCircle,
    tone: "Request expired without completion.",
  },
} as const

type RequestFormState = {
  categoryId: string
  title: string
  description: string
  district: string
  budget: string
  desiredDeadline: string
}

function flattenCategories(categories: CategoryWithChildren[]): Category[] {
  return categories.flatMap((category) => [
    {
      id: category.id,
      parentId: category.parentId,
      name: category.name,
      slug: category.slug,
      icon: category.icon,
    },
    ...(category.children ? flattenCategories(category.children) : []),
  ])
}

function getProviderInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function mapProviderToListItem(provider: Provider): ProviderListItem {
  return {
    id: provider.id,
    fullName: provider.fullName,
    companyName: provider.companyName,
    bio: provider.bio,
    neighborhood: provider.neighborhood,
    city: provider.city,
    averageRating: provider.averageRating,
    completedJobsCount: provider.completedJobsCount,
    verified: provider.verified,
    responseTime: null,
    indicativePrice: null,
    photoInitials: getProviderInitials(provider.fullName),
    categories: [],
  }
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<RequestFormState>({
    categoryId: "",
    title: "",
    description: "",
    district: "",
    budget: "",
    desiredDeadline: "",
  })

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const [requestsResponse, providersResponse, categoriesResponse] =
          await Promise.all([
            serviceRequestsService.list(),
            providersService.search(),
            categoriesService.list(),
          ])

        if (cancelled) return

        const flatCategories = flattenCategories(categoriesResponse)
        setRequests(requestsResponse.data)
        setProviders(providersResponse.data)
        setCategories(flatCategories)
        setForm((current) => ({
          ...current,
          categoryId: current.categoryId || flatCategories[0]?.id || "",
        }))
      } catch (err) {
        if (cancelled) return
        setError(
          err instanceof Error ? err.message : "Failed to load request data."
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadData()

    return () => {
      cancelled = true
    }
  }, [])

  const selectedProviders = useMemo(
    () =>
      providers.filter((provider) => selectedProviderIds.includes(provider.id)),
    [providers, selectedProviderIds]
  )

  const requestsByStatus = useMemo(
    () => ({
      all: requests,
      pending: requests.filter(
        (request) => request.status === SERVICE_REQUEST_STATUS.OPEN
      ),
      received: requests.filter(
        (request) => request.status === SERVICE_REQUEST_STATUS.NEGOTIATING
      ),
      accepted: requests.filter(
        (request) => request.status === SERVICE_REQUEST_STATUS.ASSIGNED
      ),
      closed: requests.filter(
        (request) =>
          request.status === SERVICE_REQUEST_STATUS.CLOSED ||
          request.status === SERVICE_REQUEST_STATUS.EXPIRED
      ),
    }),
    [requests]
  )

  function toggleProvider(providerId: string) {
    setSelectedProviderIds((current) =>
      current.includes(providerId)
        ? current.filter((id) => id !== providerId)
        : [...current, providerId]
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (selectedProviderIds.length === 0 || !form.categoryId) {
      return
    }

    const body: CreateServiceRequestBody = {
      categoryId: form.categoryId,
      title: form.title,
      description: form.description,
      district: form.district,
      indicativeBudget: form.budget ? Number(form.budget) : undefined,
      desiredDeadline: form.desiredDeadline || undefined,
    }

    setSubmitting(true)
    setError(null)

    try {
      const createdRequest = await serviceRequestsService.create(body)
      setRequests((current) => [createdRequest, ...current])
      setSelectedProviderIds([])
      setForm((current) => ({
        ...current,
        title: "",
        description: "",
        district: "",
        budget: "",
        desiredDeadline: "",
      }))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create the request."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow=""
        title="Service requests"
        description=""
        actions={<ActionLink href="/app/explorer">Back to explore</ActionLink>}
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <Surface className="space-y-5">
            <SectionTitle
              title="New request"
              description="The client describes the need and then selects one or more providers."
            />
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <Label>Category</Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={(value) =>
                      setForm((current) => ({
                        ...current,
                        categoryId: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 text-sm">
                  <Label>Neighborhood / district</Label>
                  <Input
                    value={form.district}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        district: event.target.value,
                      }))
                    }
                    placeholder="Analakely"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Example: Leak under kitchen sink"
                  required
                />
              </div>

              <div className="space-y-2 text-sm">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Describe the issue, urgency, and anything the provider should know."
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <Label>Indicative budget</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.budget}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        budget: event.target.value,
                      }))
                    }
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <Label>Requested deadline</Label>
                  <Input
                    type="date"
                    value={form.desiredDeadline}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        desiredDeadline: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">Selected providers</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedProviderIds.length === 0
                        ? "No provider selected yet."
                        : `${selectedProviderIds.length} provider(s) selected for dispatch.`}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      The request is now created through the service layer.
                      Multi-provider dispatch still needs a dedicated backend
                      endpoint.
                    </p>
                  </div>
                  <Tag>{selectedProviderIds.length} target(s)</Tag>
                </div>
                {selectedProviders.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProviders.map((provider) => (
                      <button
                        key={provider.id}
                        type="button"
                        className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-background"
                        onClick={() => toggleProvider(provider.id)}
                      >
                        {provider.fullName}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  submitting ||
                  selectedProviderIds.length === 0 ||
                  form.categoryId.length === 0 ||
                  form.title.trim().length === 0 ||
                  form.description.trim().length === 0 ||
                  form.district.trim().length === 0
                }
              >
                {submitting ? "Sending..." : "Create request"}
              </Button>
            </form>
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Request tracking"
              description="The client can see replies, accepted offers, and closed requests."
            />
            {error ? (
              <div className="rounded-lg border border-dashed border-destructive/30 px-4 py-4 text-sm text-destructive">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="animate-spin" />
                  <span className="text-desctructive">Error</span>
                </div>
              </div>
            ) : null}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-2" variant="line">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="received">Replies received</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
              {Object.entries(requestsByStatus).map(([tab, items]) => (
                <TabsContent key={tab} className="space-y-3" value={tab}>
                  {items.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
                      {loading
                        ? "Loading requests..."
                        : "No requests in this state yet."}
                    </div>
                  ) : (
                    items.map((request) => {
                      const meta = statusMeta[request.status]
                      const Icon = meta.icon
                      const categoryName =
                        categories.find(
                          (category) => category.id === request.categoryId
                        )?.name || "Unknown category"

                      return (
                        <article
                          key={request.id}
                          className="rounded-xl border border-border/70 px-4 py-4"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex gap-3">
                              <div className="h-fit rounded-lg border border-secondary/50 bg-secondary/10 p-2 text-muted-foreground">
                                <Icon className="size-4 text-secondary" />
                              </div>
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-medium text-foreground">
                                    {request.title}
                                  </p>
                                  <Tag>{meta.label}</Tag>
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                  {request.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {categoryName} in{" "}
                                  {request.district || "unspecified area"}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-muted-foreground lg:max-w-64">
                              <p>{meta.tone}</p>
                              <p>
                                {new Intl.DateTimeFormat("en-US", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }).format(new Date(request.createdAt))}
                              </p>
                              {request.desiredDeadline ? (
                                <p>
                                  Deadline:{" "}
                                  {new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "medium",
                                  }).format(new Date(request.desiredDeadline))}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </article>
                      )
                    })
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="MVP flow"
              description="The stages described in the README are now represented in the interface."
            />
            <div className="space-y-4">
              <div className="rounded-lg border border-border/70 px-4 py-4">
                <p className="font-medium">1. Creation</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The client fills in the category, need, location, budget, and
                  requested date.
                </p>
              </div>
              <div className="rounded-lg border border-border/70 px-4 py-4">
                <p className="font-medium">2. Dispatch</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The request is created through the API, and provider dispatch
                  can plug into a backend notification endpoint next.
                </p>
              </div>
              <div className="rounded-lg border border-border/70 px-4 py-4">
                <p className="font-medium">3. Decision</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Statuses then help the client track replies, accept a
                  proposal, or close the request.
                </p>
              </div>
            </div>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
