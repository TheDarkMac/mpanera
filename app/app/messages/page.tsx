import { MessageSquare, Paperclip, Phone, Search, Send } from "lucide-react"

import {
  ActionLink,
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

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
        title="Chat with a provider once a request is accepted."
        description="Messaging helps the user refine the need, confirm a visit, and keep a clear record of important exchanges."
        actions={
          <>
            <ActionLink href="/app/requests">View requests</ActionLink>
          </>
        }
      />

      <PageBody>
        <div className="">
          <Surface className="mx-auto max-w-2xl space-y-4">
            <SectionTitle
              title="Conversations"
              description="List of active or recent discussions."
            />
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                size={10}
                placeholder="Search for a provider or keyword"
              />
            </InputGroup>

            <div className="space-y-3">
              {threads.map((thread) => (
                <div
                  key={thread.name}
                  className="rounded-lg border border-border/70 px-4 py-4 transition-colors hover:bg-muted/20"
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
        </div>
      </PageBody>
    </div>
  )
}
