import { Award } from "lucide-react"
import type { AmbassadorProfile } from "@/types/ambassador"

const TIER_LABEL: Record<string, string> = {
  standard: "Standard",
  silver: "Silver",
  gold: "Gold",
}

export function TierProgress({ profile }: { profile: AmbassadorProfile }) {
  const { current, required, nextTier } = profile.tierProgress
  const ratio = Math.min(1, current / required)
  const remaining = Math.max(0, required - current)

  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="size-4 text-brand" aria-hidden="true" />
          <p className="text-sm font-medium text-text">
            {TIER_LABEL[profile.tier] ?? profile.tier} tier
          </p>
        </div>
        <p className="text-sm text-text-muted">
          <span className="tabular font-medium text-text">{current}</span>
          <span className="tabular"> / {required}</span> treatments
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={required}
        aria-label={`Progress toward ${TIER_LABEL[nextTier] ?? nextTier} tier`}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <p className="text-sm text-text-muted">
        {remaining > 0 ? (
          <>
            <span className="tabular font-medium text-text">{remaining}</span> more completed{" "}
            {remaining === 1 ? "treatment" : "treatments"} to reach{" "}
            <span className="font-medium text-text">{TIER_LABEL[nextTier] ?? nextTier}</span>.
          </>
        ) : (
          <>You&apos;ve reached the requirements for {TIER_LABEL[nextTier] ?? nextTier}.</>
        )}
      </p>
    </section>
  )
}
