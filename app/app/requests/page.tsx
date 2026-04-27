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
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
              <Button className="">
                <Plus className="size-4" />
                New request
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-2" variant="line">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="received">Replies received</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent className="space-y-3" value="all">
                  {requests.map((request) => (
                    <ListRow
                      key={request.title}
                      icon={request.icon}
                      title={request.title}
                      description={request.description}
                      meta={<Tag>{request.state}</Tag>}
                    />
                  ))}
                </TabsContent>
                <TabsContent className="space-y-3" value="pending">
                  {requests.map((request) => (
                    <ListRow
                      key={request.title}
                      icon={request.icon}
                      title={request.title}
                      description={request.description}
                      meta={<Tag>{request.state}</Tag>}
                    />
                  ))}
                </TabsContent>
                <TabsContent className="space-y-3" value="received">
                  {requests.map((request) => (
                    <ListRow
                      key={request.title}
                      icon={request.icon}
                      title={request.title}
                      description={request.description}
                      meta={<Tag>{request.state}</Tag>}
                    />
                  ))}
                </TabsContent>
                <TabsContent className="space-y-3" value="accepted">
                  No accepted
                </TabsContent>
                <TabsContent className="space-y-3" value="closed">
                  No content yet, but this tab will show requests that have been
                  declined or resolved.
                </TabsContent>
              </Tabs>
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Request flow"
              description="The detail panel explains what the platform should reveal at each step."
            />
            <div className="space-y-4">
              <div className="rounded-lg border border-border/70 px-4 py-4">
                <p className="font-medium">1. Creation</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The user describes the need, location, urgency, and any useful
                  details.
                </p>
              </div>
              <div className="rounded-lg border border-border/70 px-4 py-4">
                <p className="font-medium">2. Dispatch</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  The request is sent to one or more providers selected from the
                  explore page.
                </p>
              </div>
              <div className="rounded-lg border border-border/70 px-4 py-4">
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
