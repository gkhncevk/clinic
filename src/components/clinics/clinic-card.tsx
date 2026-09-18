import { Award, Clock3, Globe2, MapPin, Scissors, ShieldCheck, Smile, Sparkles, Users } from "lucide-react"
import type { ComponentType, CSSProperties } from "react"
import { identityColorStyle } from "@/lib/deterministic-color"
import { formatHours, initials } from "@/lib/format"
import { CATEGORY_LABEL } from "@/lib/labels"
import { formatPriceRange } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { Clinic, ClinicCategory, ClinicViewMode } from "@/types/clinic"

const CATEGORY_ICON: Record<ClinicCategory, ComponentType<{ className?: string }>> = {
  dental: Smile,
  hair: Scissors,
  aesthetic: Sparkles,
}

type ClinicCardProps = {
  clinic: Clinic
  variant: ClinicViewMode
  /** Position in the current page — drives a short staggered entrance. */
  enterIndex?: number
}

export function ClinicCard({ clinic, variant, enterIndex }: ClinicCardProps) {
  const CategoryIcon = CATEGORY_ICON[clinic.category]
  const isSiteVisited = clinic.verificationLevel === "site_visited"
  const enterStyle =
    enterIndex != null
      ? ({ "--card-delay": `${Math.min(enterIndex, 9) * 28}ms` } as CSSProperties)
      : undefined

  return (
    <article
      style={enterStyle}
      className={cn(
        "group flex h-full overflow-hidden rounded-lg border border-border bg-surface transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-md",
        enterIndex != null && "animate-card-in",
        variant === "grid" ? "flex-col" : "flex-col sm:flex-row"
      )}
    >
      <div
        aria-hidden="true"
        style={identityColorStyle(clinic.id)}
        className={cn(
          "identity-swatch identity-pattern identity-sheen relative flex shrink-0 items-center justify-center overflow-hidden",
          variant === "grid" ? "aspect-[16/9] w-full" : "aspect-[16/9] w-full sm:aspect-auto sm:w-48"
        )}
      >
        <span className="text-4xl font-semibold tracking-tight text-white/90 drop-shadow-sm">
          {initials(clinic.displayName)}
        </span>

        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/25 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {CATEGORY_LABEL[clinic.category]}
        </span>

        {clinic.isSponsored ? (
          <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/25 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Sponsored
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-text">{clinic.displayName}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-text-muted">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {clinic.district}, {clinic.city}
              </span>
            </p>
          </div>
          {clinic.isFeatured ? (
            <span
              title="Editor's pick — not a paid placement"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-brand/30 bg-brand-bg px-2 py-0.5 text-2xs font-medium text-brand"
            >
              <Award className="size-3" aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </div>

        {variant === "list" ? (
          <div className="flex flex-wrap gap-1.5">
            {clinic.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="rounded-md bg-surface-2 px-2 py-1 text-xs text-text-muted"
              >
                {service}
              </span>
            ))}
            {clinic.services.length > 3 ? (
              <span className="rounded-md px-2 py-1 text-xs text-text-muted">
                +{clinic.services.length - 3} more
              </span>
            ) : null}
          </div>
        ) : null}

        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-text-muted sm:grid-cols-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck
              className={cn("size-4 shrink-0", isSiteVisited ? "text-success" : "text-primary")}
              aria-hidden="true"
            />
            <span>{isSiteVisited ? "Site visited" : "Documents verified"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-4 shrink-0" aria-hidden="true" />
            <span className="tabular">{clinic.completedReferrals}+ referrals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock3 className="size-4 shrink-0" aria-hidden="true" />
            <span>Replies in ~{formatHours(clinic.avgResponseHours)}</span>
          </div>
          {variant === "list" ? (
            <div className="flex items-center gap-1.5">
              <Globe2 className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate uppercase">{clinic.languages.join(" · ")}</span>
            </div>
          ) : null}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-3">
          <div>
            <p className="text-2xs uppercase tracking-wide text-text-muted">Price range</p>
            <p className="tabular text-lg font-semibold text-text">
              {formatPriceRange(clinic.priceFrom, clinic.priceTo)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
