"use client"

import { useDeferredValue, useEffect, useMemo, useState } from "react"
import { Loader, Loader2, MapPin, Search, Users } from "lucide-react"

import {
  ActionLink,
  MiniStat,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
} from "@/components/features/app/page-primitives"
import {
  ProviderList,
  type ProviderListItem,
} from "@/components/features/providers/provider-list"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { categoriesService, providersService } from "@/lib/services"
import type { CategoryWithChildren } from "@/types/api"
import type { Provider } from "@/lib/generated/prisma/client"

function flattenCategories(
  categories: CategoryWithChildren[]
): CategoryWithChildren[] {
  return categories.flatMap((category) => [
    category,
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

export default function ExplorerPage() {
  const [query, setQuery] = useState("")
  const [district, setDistrict] = useState("")
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [providers, setProviders] = useState<Provider[]>([])
  const [categories, setCategories] = useState<CategoryWithChildren[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const deferredQuery = useDeferredValue(query)
  const deferredDistrict = useDeferredValue(district)

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const [providerResponse, categoryResponse] = await Promise.all([
          providersService.search(
            activeCategoryId ? { categoryId: activeCategoryId } : undefined
          ),
          categoriesService.list(),
        ])

        if (cancelled) return

        setProviders(providerResponse.data)
        setCategories(categoryResponse)
      } catch (err) {
        if (cancelled) return
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load marketplace data."
        )
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadData()

    return () => {
      cancelled = true
    }
  }, [activeCategoryId])

  const availableCategories = useMemo(
    () => flattenCategories(categories),
    [categories]
  )

  const filteredProviders = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()
    const normalizedDistrict = deferredDistrict.trim().toLowerCase()

    return providers.map(mapProviderToListItem).filter((provider) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        provider.fullName.toLowerCase().includes(normalizedQuery) ||
        provider.bio?.toLowerCase().includes(normalizedQuery)

      const matchesDistrict =
        normalizedDistrict.length === 0 ||
        (provider.city || "").toLowerCase().includes(normalizedDistrict) ||
        (provider.neighborhood || "").toLowerCase().includes(normalizedDistrict)

      return matchesQuery && matchesDistrict
    })
  }, [deferredDistrict, deferredQuery, providers])

  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow=""
        title="Find a provider for your need."
        description=""
        actions={<ActionLink href="/app/requests">New request</ActionLink>}
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Surface className="space-y-6">
            <SectionTitle
              title="Quick search"
              description="Filter profiles by need, area, and specialty before sending a request."
            />
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_auto]">
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="What service do you need?"
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon>
                  <MapPin className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  value={district}
                  onChange={(event) => setDistrict(event.target.value)}
                  placeholder="Neighborhood or district"
                />
              </InputGroup>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setQuery("")
                  setDistrict("")
                  setActiveCategoryId(null)
                }}
              >
                Reset
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant={activeCategoryId === null ? "default" : "outline"}
                onClick={() => setActiveCategoryId(null)}
              >
                All
              </Button>
              {availableCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  size="sm"
                  variant={
                    activeCategoryId === category.id ? "default" : "outline"
                  }
                  onClick={() =>
                    setActiveCategoryId((current) =>
                      current === category.id ? null : category.id
                    )
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </Surface>

          <Surface className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <MiniStat
              label="Visible providers"
              value={loading ? "..." : String(filteredProviders.length)}
              hint={
                error
                  ? "Unable to load provider data right now."
                  : "Profiles matching the active filters."
              }
            />
            <MiniStat
              label="Average"
              value={
                filteredProviders.length === 0
                  ? "0.0"
                  : (
                      filteredProviders.reduce(
                        (sum, provider) => sum + provider.averageRating,
                        0
                      ) / filteredProviders.length
                    ).toFixed(1)
              }
              hint="Average rating across the visible profiles."
            />
            <MiniStat
              label="Verified"
              value={String(
                filteredProviders.filter((provider) => provider.verified).length
              )}
              hint="Profiles that already have verified status."
            />
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Provider profiles"
              description="Each public profile can be reviewed before sending a request."
            />
            {error ? (
              <div className="rounded-lg border border-dashed border-destructive/30 px-4 py-8 text-sm text-destructive">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="animate-spin" />
                  <span className="text-desctructive">Error</span>
                </div>
              </div>
            ) : loading ? (
              <div className="rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
                Loading providers...
              </div>
            ) : (
              <ProviderList providers={filteredProviders} />
            )}
          </Surface>

          <Surface className="space-y-5">
            <SectionTitle
              title="MVP flow"
              description="This flow covers the free-browse experience described in the README."
            />
            <div className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Users className="mt-1 size-4 text-primary" />
                <p>browse public profiles without needing to sign in</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 size-4 text-primary" />
                <p>compare ratings, service area, and indicative pricing</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 size-4 text-primary" />
                <p>
                  move to the requests page to contact one or several providers
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              Advanced filters from the README such as real distance or dynamic
              sorting can later plug into `providersService.search`.
            </div>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
