import { MessageSquare, Paperclip, Phone, Search, Send } from "lucide-react"

import {
  ActionLink,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

const threads = [
  {
    name: "Felana Rakoto",
    preview: "I can stop by this afternoon around 3 PM.",
    state: "Online",
  },
  {
    name: "Tovo Care",
    preview: "Can you confirm your exact neighborhood?",
    state: "Pending",
  },
  {
    name: "Mamy Tech",
    preview: "Thanks for the photo, I am preparing an estimate.",
    state: "Recent archive",
  },
]

export default function MessagesPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Messages"
        title="Chat with a provider once a request is accepted or still being clarified."
        description="Messaging helps the user refine the need, confirm a visit, and keep a clear record of important exchanges."
        actions={
          <>
            <ActionLink href="/app/requests">View requests</ActionLink>
            <ActionLink href="/app/notifications" tone="primary">
              Track alerts
            </ActionLink>
          </>
        }
      />

      <PageBody>
        <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Conversations"
              description="List of active or recent discussions."
            />
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              <Search className="size-4" />
              Search for a provider or keyword
            </div>
            <div className="space-y-3">
              {threads.map((thread) => (
                <div
                  key={thread.name}
                  className="rounded-2xl border border-border/70 px-4 py-4 transition-colors hover:bg-muted/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{thread.name}</p>
                    <Tag>{thread.state}</Tag>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {thread.preview}
                  </p>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="flex min-h-[560px] flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-lg font-semibold">Felana Rakoto</p>
                <p className="text-sm text-muted-foreground">
                  Conversation linked to the plumbing request
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-border px-3 py-2 text-sm transition-colors hover:bg-accent">
                  <Phone className="size-4" />
                </button>
                <button className="rounded-full border border-border px-3 py-2 text-sm transition-colors hover:bg-accent">
                  View profile
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 py-6">
              <div className="max-w-xl rounded-3xl rounded-tl-md bg-muted px-4 py-3 text-sm leading-6 text-foreground">
                Hello, I saw your request. Can you confirm whether the leak is under the sink or on the wall pipe?
              </div>
              <div className="ml-auto max-w-xl rounded-3xl rounded-tr-md bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground">
                It is under the sink, and I would like someone to come today if possible.
              </div>
              <div className="max-w-xl rounded-3xl rounded-tl-md bg-muted px-4 py-3 text-sm leading-6 text-foreground">
                I can come around 3 PM. I will bring the basic tools and confirm the price after a quick diagnosis.
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-3 md:flex-row md:items-end">
                <div className="min-h-24 flex-1 rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                  Message composer area for instructions, clarifications, or useful details.
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full border border-border px-3 py-3 transition-colors hover:bg-accent">
                    <Paperclip className="size-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                    <Send className="size-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
