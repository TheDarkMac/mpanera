import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Plus,
  Send,
  XCircle,
} from "lucide-react"

import {
  ActionLink,
  ListRow,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

const requests = [
  {
    title: "Kitchen leak in Analakely",
    description:
      "Request sent to three plumbers with a visit window today before 6 PM.",
    state: "Pending",
    icon: Clock3,
  },
  {
    title: "Home massage on Saturday morning",
    description:
      "Two replies received, and the user can now compare availability and price.",
    state: "Replies received",
    icon: Send,
  },
  {
    title: "TV screen repair",
    description:
      "One proposal accepted, and the next step leads to direct contact.",
    state: "Accepted",
    icon: CheckCircle2,
  },
]

export default function RequestsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Requests"
        title="Track submitted needs, compare replies."
        description="This page represents the core user flow: create a request, monitor statuses, and decide which provider to keep."
        actions={
          <>
            <ActionLink href="/app/explorer">Back to explore</ActionLink>
            <ActionLink href="/app/messages" tone="primary">
              Open messages
            </ActionLink>
          </>
        }
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
          <Surface className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <SectionTitle
                title="Active requests"
                description="The rows below illustrate the states a user can encounter."
              />
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                <Plus className="size-4" />
                New request
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag>All</Tag>
              <Tag>Pending</Tag>
              <Tag>Replies received</Tag>
              <Tag>Accepted</Tag>
              <Tag>Closed</Tag>
            </div>
            <div className="space-y-3">
              {requests.map((request) => (
                <ListRow
                  key={request.title}
                  icon={request.icon}
                  title={request.title}
                  description={request.description}
                  meta={<Tag>{request.state}</Tag>}
                />
              ))}
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Request flow"
              description="The detail panel explains what the platform should reveal at each step."
            />
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/70 px-4 py-4">
                <p className="font-medium">1. Creation</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The user describes the need, location, urgency, and any useful
                  details.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 px-4 py-4">
                <p className="font-medium">2. Dispatch</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The request is sent to one or more providers selected from the
                  explore page.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 px-4 py-4">
                <p className="font-medium">3. Decision</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The user compares replies, accepts one proposal, or reopens
                  the search with another profile.
                </p>
              </div>
            </div>
          </Surface>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Surface className="space-y-3">
            <Clock3 className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Wait for replies</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              A view for tracking open requests and expected reply times.
            </p>
          </Surface>
          <Surface className="space-y-3">
            <BriefcaseBusiness className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Compare offers</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Planned area for comparing estimated price, availability, and
              proposed terms.
            </p>
          </Surface>
          <Surface className="space-y-3">
            <XCircle className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Decline or close</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              The user should also be able to close a request if it is no longer
              needed or already resolved.
            </p>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
