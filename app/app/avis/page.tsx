import { MessageCircleHeart, Star, ThumbsUp } from "lucide-react"

import {
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

export default function AvisPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Reviews"
        title="Rate a completed service and keep track of submitted feedback."
        description="This page lets the user rate a provider, add a comment, and understand how feedback affects visible reputation."
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <Surface className="space-y-5">
            <SectionTitle
              title="Pending review"
              description="Example screen shown after a service has been completed."
            />
            <div className="rounded-3xl border border-border/70 bg-muted/20 p-5">
              <p className="text-sm text-muted-foreground">Related provider</p>
              <h3 className="mt-1 text-xl font-semibold">Felana Rakoto</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Plumbing service completed today. The user can rate quality, punctuality, and clarity of communication.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["1 star", "2 stars", "3 stars", "4 stars", "5 stars"].map(
                  (label) => (
                    <button
                      key={label}
                      className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
                Planned area for a free comment: how it went, satisfaction level, and any points to watch.
              </div>
              <button className="mt-5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Submit review
              </button>
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Why this screen matters"
              description="User feedback influences ranking and provider reputation."
            />
            <div className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Star className="mt-1 size-4 text-primary" />
                <p>leave a quick rating right after the service ends</p>
              </div>
              <div className="flex items-start gap-3">
                <ThumbsUp className="mt-1 size-4 text-primary" />
                <p>help trustworthy profiles rank better in explore results</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircleHeart className="mt-1 size-4 text-primary" />
                <p>leave a helpful comment for future users without forcing a long write-up</p>
              </div>
            </div>
          </Surface>
        </div>

        <Surface className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle
              title="Review history"
              description="Examples of feedback already submitted by the user."
            />
            <Tag>3 reviews submitted</Tag>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/70 px-4 py-4">
              <p className="font-medium">TV repair</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Short comment, visible rating, date, and link to the provider profile.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 px-4 py-4">
              <p className="font-medium">Home massage</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Planned block for rereading a submitted review or editing it if the product rules allow it.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 px-4 py-4">
              <p className="font-medium">Plumbing repair</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Also helps illustrate what the user has already completed in the platform.
              </p>
            </div>
          </div>
        </Surface>
      </PageBody>
    </div>
  )
}
