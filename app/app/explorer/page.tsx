import {
  ArrowRight,
  Compass,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react"

import {
  ActionLink,
  ListRow,
  MiniStat,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

const categories = [
  "Plumbing",
  "Electrical",
  "Massage",
  "Cleaning",
  "Hair styling",
  "TV repair",
]

const providers = [
  {
    title: "Felana Rakoto",
    description:
      "Neighborhood plumber for home visits, quick repairs, and installations.",
    meta: "4.9 stars",
  },
  {
    title: "Tovo Care",
    description:
      "Wellness massage by appointment, with mobile service across several areas.",
    meta: "4.8 stars",
  },
  {
    title: "Mamy Tech",
    description:
      "TV and small appliance repair with a simple diagnosis before the visit.",
    meta: "4.7 stars",
  },
]

export default function ExplorerPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow=""
        title="Find a provider based on your need."
        description=""
        actions={
          <>
            <ActionLink href="/app/requests" tone="primary">
              New request
            </ActionLink>
            {/* <ActionLink href="/app/messages">View conversations</ActionLink> */}
          </>
        }
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Surface className="space-y-6">
            <SectionTitle
              title="Quick search"
              description="The user specifies what they need, where they are, and what kind of service they want."
            />
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                <Search className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Example: leak under the sink, home massage, screen repair
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                <MapPin className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Neighborhood or district
                </span>
              </div>
              <button className="rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Tag key={category}>{category}</Tag>
              ))}
            </div>
          </Surface>

          <Surface className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <MiniStat
              label="Visible providers"
              value="128"
              hint="This block will later show the number of profiles available around the user."
            />
            <MiniStat
              label="Primary ranking"
              value="Distance + rating"
              hint="Results are meant to surface nearby and reliable providers."
            />
            <MiniStat
              label="Expected action"
              value="Compare then send"
              hint="The user reviews a profile and then sends a request to one or more providers."
            />
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Suggested providers"
              description="A simple list to show what the user can scan before making a choice."
            />
            <div className="space-y-3">
              {providers.map((provider) => (
                <ListRow
                  key={provider.title}
                  icon={Compass}
                  title={provider.title}
                  description={provider.description}
                  meta={<Tag>{provider.meta}</Tag>}
                />
              ))}
            </div>
          </Surface>

          <Surface className="space-y-5">
            <SectionTitle
              title="What the user can do here"
              description="The explore screen should quickly lead to a concrete action."
            />
            <div className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div className="flex items-start gap-3">
                <ArrowRight className="mt-1 size-4 text-primary" />
                <p>define a need through free search or a service category</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="mt-1 size-4 text-primary" />
                <p>filter by area, availability, or reputation score</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="mt-1 size-4 text-primary" />
                <p>
                  open a public profile, compare options, and prepare a request
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
              Planned area for advanced filters: estimated price, response time,
              verification, and travel type.
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              <SlidersHorizontal className="size-4" />
              Open filters
            </button>
          </Surface>
        </div>

        <Surface className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Step 1
            </p>
            <h3 className="text-lg font-semibold">Identify the service</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              The user describes the need and immediately sees how the platform
              will guide the search.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Step 2
            </p>
            <h3 className="text-lg font-semibold">Compare profiles</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Key information stays visible: area, rating, specialty, estimated
              price, and response speed.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Step 3
            </p>
            <h3 className="text-lg font-semibold">Start a request</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Once the right profile is found, the user moves to the requests
              page to send the need.
            </p>
          </div>
        </Surface>
      </PageBody>
    </div>
  )
}
