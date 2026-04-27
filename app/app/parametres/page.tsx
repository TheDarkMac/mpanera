import { BellRing, Globe, LockKeyhole, MapPinned, UserRound } from "lucide-react"

import {
  PageBody,
  PageIntro,
  SectionTitle,
  Surface,
  Tag,
} from "@/components/features/app/page-primitives"

export default function ParametresPage() {
  return (
    <div className="h-full overflow-y-auto">
      <PageIntro
        eyebrow="Settings"
        title="Adjust profile, alerts, and navigation preferences."
        description="This page exposes the key personalization controls so the user keeps full control of the experience."
      />

      <PageBody className="space-y-8">
        <div className="grid gap-4 xl:grid-cols-2">
          <Surface className="space-y-4">
            <SectionTitle
              title="Account and profile"
              description="Information visible in the app and core account options."
            />
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 px-4 py-4">
                <UserRound className="mt-1 size-4 text-primary" />
                <div>
                  <p className="font-medium">Name, photo, account type</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Planned block for reviewing and updating the displayed identity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 px-4 py-4">
                <LockKeyhole className="mt-1 size-4 text-primary" />
                <div>
                  <p className="font-medium">Privacy</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Choose what is shared, what stays private, and how contact details are revealed.
                  </p>
                </div>
              </div>
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Alerts and communication"
              description="Settings that shape the rhythm of interactions."
            />
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 px-4 py-4">
                <BellRing className="mt-1 size-4 text-primary" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Increase or reduce alerts for requests, messages, reviews, and reminders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 px-4 py-4">
                <Globe className="mt-1 size-4 text-primary" />
                <div>
                  <p className="font-medium">Language and display</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Interface language, time format, and other reading preferences.
                  </p>
                </div>
              </div>
            </div>
          </Surface>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Surface className="space-y-4">
            <SectionTitle
              title="Area and feed personalization"
              description="Settings that help the platform surface the right profiles and results."
            />
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-border/70 px-4 py-4">
                <div className="flex items-center gap-3">
                  <MapPinned className="size-4 text-primary" />
                  <p className="font-medium">Primary area</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Address or reference area used to rank nearby providers.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 px-4 py-4">
                <div className="flex items-center gap-3">
                  <Tag>Feed</Tag>
                  <p className="font-medium">Service preferences</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Followed categories, recurring needs, and history useful for personalization.
                </p>
              </div>
            </div>
          </Surface>

          <Surface className="space-y-4">
            <SectionTitle
              title="Sensitive actions"
              description="Area reserved for rare but important operations."
            />
            <div className="space-y-3">
              <button className="w-full rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                Export my data
              </button>
              <button className="w-full rounded-2xl border border-border px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                Temporarily deactivate my account
              </button>
              <button className="w-full rounded-2xl border border-red-200 px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                Delete my account
              </button>
            </div>
          </Surface>
        </div>
      </PageBody>
    </div>
  )
}
