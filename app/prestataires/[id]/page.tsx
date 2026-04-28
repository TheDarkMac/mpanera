"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Star,
} from "lucide-react"

import {
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
} from "@/components/features/app/page-primitives"
import { Button } from "@/components/ui/button"
import { providersService, reviewsService } from "@/lib/services"
import type { ProviderProfile } from "@/types/api"
import type { Review } from "@/lib/generated/prisma/client"

function getProviderInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export default function ProviderProfilePage() {
  const params = useParams<{ id: string }>()
  const [provider, setProvider] = useState<ProviderProfile | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProvider() {
      setLoading(true)
      setError(null)

      try {
        const providerId = params.id
        const [providerResponse, reviewsResponse] = await Promise.all([
          providersService.get(providerId),
          reviewsService.listForProvider(providerId),
        ])

        if (cancelled) return

        setProvider(providerResponse)
        setReviews(reviewsResponse.data)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Failed to load provider profile.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (params.id) {
      void loadProvider()
    }

    return () => {
      cancelled = true
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12 text-sm text-muted-foreground">
        Loading provider profile...
      </main>
    )
  }

  if (error || !provider) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="rounded-lg border border-dashed border-destructive/30 px-4 py-6 text-sm text-destructive">
          {error || "Provider not found."}
        </div>
      </main>
    )
  }

  const location =
    [provider.neighborhood, provider.district, provider.city]
      .filter(Boolean)
      .join(", ") || "Location not specified"

  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow=""
        title={provider.fullName}
        description=""
        actions={
          <Button asChild variant="outline">
            <Link href="/app/explorer">
              <ArrowLeft className="size-4" />
              Back to explore
            </Link>
          </Button>
        }
      />

      <PageBody className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <Surface className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex size-18 items-center justify-center rounded-3xl bg-primary/12 text-2xl font-semibold text-primary">
                {getProviderInitials(provider.fullName)}
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {provider.fullName}
                  </h2>
                  {provider.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-xs text-primary">
                      <BadgeCheck className="size-3.5" />
                      Verified profile
                    </span>
                  ) : null}
                </div>
                {provider.companyName ? (
                  <p className="text-sm text-muted-foreground">
                    {provider.companyName}
                  </p>
                ) : null}
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  {provider.bio || "No bio provided yet."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {provider.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="size-4 text-primary" />
                  Reputation
                </div>
                <p className="mt-2 text-2xl font-semibold">
                  {provider.averageRating.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  average based on client reviews
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BriefcaseBusiness className="size-4 text-primary" />
                  Experience
                </div>
                <p className="mt-2 text-2xl font-semibold">
                  {provider.completedJobsCount}
                </p>
                <p className="text-sm text-muted-foreground">completed jobs</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4 text-primary" />
                  Response time
                </div>
                <p className="mt-2 text-lg font-semibold">Not available yet</p>
                <p className="text-sm text-muted-foreground">
                  average observed response time
                </p>
              </div>
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Practical information"
              description="The details shown before any contact is made."
            />
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 text-primary" />
                <span>{location}</span>
              </div>
              <div className="rounded-xl border border-border/70 px-4 py-4">
                <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Indicative pricing
                </p>
                <p className="mt-2 font-medium text-foreground">
                  Not available yet
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/app/requests">Send a request</Link>
              </Button>
            </div>
          </Surface>
        </div>

        <Surface className="space-y-4">
          <SectionTitle
            title="Client reviews"
            description="The provider's public score is fed by these ratings."
          />
          <div className="grid gap-3 lg:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-xl border border-border/70 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">Client review</p>
                  <span className="text-sm text-primary">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {review.comment}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(new Date(review.createdAt))}
                </p>
              </article>
            ))}
            {reviews.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
                No reviews yet.
              </div>
            ) : null}
          </div>
        </Surface>
      </PageBody>
    </div>
  )
}
