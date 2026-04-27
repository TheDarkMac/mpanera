import { CircleHelp, FileWarning, LifeBuoy, ShieldAlert } from "lucide-react"

import {
  ActionLink,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
} from "@/components/features/app/page-primitives"

export default function SupportPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Support"
        title="Help the user resolve a blocked request, a conversation issue, or an account problem."
        description="Support should not be only a form. It should also provide fast paths to the most useful help."
        actions={<ActionLink href="/app/parametres">Manage preferences</ActionLink>}
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <Surface className="space-y-3">
            <LifeBuoy className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Quick help</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Direct access to common blockers: no reply to a request, missing messages, or confusion about a step.
            </p>
          </Surface>
          <Surface className="space-y-3">
            <ShieldAlert className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Report behavior</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Planned area for reporting disputes, abuse, fraud, or problematic profiles.
            </p>
          </Surface>
          <Surface className="space-y-3">
            <FileWarning className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Track a support case</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              Ticket history, priority, and current handling status once support has been contacted.
            </p>
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Frequently asked questions"
              description="Useful content to expose before opening a human support channel."
            />
            <div className="space-y-3">
              {[
                "How do I send one request to multiple providers?",
                "What should I do if nobody replies?",
                "When can I leave a review?",
                "How do I report a profile or a message?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-border/70 px-4 py-4 text-sm font-medium transition-colors hover:bg-muted/20"
                >
                  {question}
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Contact support"
              description="Preview of the form used to describe an issue."
            />
            <div className="space-y-3 rounded-3xl border border-border/70 bg-muted/20 p-5 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                Support topic
              </div>
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                Related request or conversation number
              </div>
              <div className="min-h-32 rounded-2xl border border-dashed border-border bg-background px-4 py-3">
                Problem description, screenshots, incident date
              </div>
              <button className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Send to support
              </button>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 px-4 py-4 text-sm text-muted-foreground">
              <CircleHelp className="mt-1 size-4 text-primary" />
              The form should later provide a simple status flow: received, in progress, resolved.
            </div>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
