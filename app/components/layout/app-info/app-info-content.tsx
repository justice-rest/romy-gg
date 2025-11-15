import { APP_TAGLINE } from "@/lib/config"

export function AppInfoContent() {
  return (
    <div className="space-y-4">
      <p className="text-foreground leading-relaxed">
        {APP_TAGLINE}
      </p>
    </div>
  )
}
