import {
  Bell,
  CircleCheckBig,
  MessageSquareMore,
  TriangleAlert,
} from "lucide-react"

import {
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

export default function NotificationsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Notifications"
        title="Gather key alerts so the user always knows what to do next."
        description="Notifications should drive action: open a message, review a reply, leave feedback, or confirm a step."
      />

      <PageBody className="space-y-8">
        <Surface className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle
              title="Notification center"
              description="A quick-reading view with different priority levels."
            />
            <div className="flex flex-wrap gap-2">
              <Tag>All</Tag>
              <Tag>Unread</Tag>
              <Tag>Requests</Tag>
              <Tag>Messages</Tag>
              <Tag>Reviews</Tag>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-4 rounded-lg border border-border/70 px-4 py-4">
              <Bell className="mt-1 size-4 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">
                  New reply to your plumbing request
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  A provider confirmed availability. The expected action is to
                  open the request and compare.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 px-4 py-4">
              <MessageSquareMore className="mt-1 size-4 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">
                  Unread message in an active conversation
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  The user should be able to jump straight into the related
                  conversation thread.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 px-4 py-4">
              <CircleCheckBig className="mt-1 size-4 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">
                  Service completed, review expected
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Post-service notification leading to the rating screen.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-border/70 px-4 py-4">
              <TriangleAlert className="mt-1 size-4 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">Action expires soon</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Example alert to prevent a request or reply from being left
                  without follow-up.
                </p>
              </div>
            </div>
          </div>
        </Surface>

        <div className="grid gap-4 lg:grid-cols-2">
          <Surface className="space-y-3">
            <SectionTitle
              title="What the user can do"
              description="Each notification should lead to a concrete destination."
            />
            <p className="text-sm leading-6 text-muted-foreground">
              Open a request, enter a conversation, view a profile, complete a
              review, or adjust alert preferences.
            </p>
          </Surface>
          <Surface className="space-y-3">
            <SectionTitle
              title="Delivery preferences"
              description="Planned area for choosing channels and frequency."
            />
            <p className="text-sm leading-6 text-muted-foreground">
              In-app notifications, email, priority reminders, silent alerts,
              and followed categories.
            </p>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
