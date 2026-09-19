import { Award, Clock3, Globe2, MapPin, Scissors, ShieldCheck, Smile, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import type { ComponentType, CSSProperties, ReactNode } from "react"
import { clinicPhoto } from "@/lib/clinic-photo"
import { identityColorStyle } from "@/lib/deterministic-color"
import { formatHours } from "@/lib/format"
import { CATEGORY_LABEL } from "@/lib/labels"
import { formatPriceRange } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { Clinic, ClinicCategory, ClinicViewMode } from "@/types/clinic"

const CATEGORY_ICON: Record<ClinicCategory, ComponentType<{ className?: string }>> = {
  dental: Smile,
  hair: Scissors,
  aesthetic: Sparkles,
}

function Pill({ icon: Icon, children }: { icon: ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-text-muted">
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </span>
  )
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
      style={{ ...enterStyle, ...identityColorStyle(clinic.id) }}
      className={cn(
        "identity-accent-border group flex h-full overflow-hidden rounded-lg border border-l-4 border-border bg-surface transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-md",
        enterIndex != null && "animate-card-in",
        variant === "grid" ? "flex-col" : "flex-col sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-surface-2",
          variant === "grid" ? "aspect-[16/9] w-full" : "aspect-[16/9] w-full sm:aspect-auto sm:w-56"
        )}
      >
        <Image
          src={clinicPhoto(clinic)}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {CATEGORY_LABEL[clinic.category]}
        </span>

        {clinic.isSponsored ? (
          <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/35 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
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

        <div className="flex flex-wrap gap-1.5">
          <Pill icon={ShieldCheck}>
            <span className={isSiteVisited ? "text-success" : undefined}>
              {isSiteVisited ? "Site visited" : "Documents verified"}
            </span>
          </Pill>
          <Pill icon={Users}>
            <span className="tabular">{clinic.completedReferrals}+ referrals</span>
          </Pill>
          <Pill icon={Clock3}>Replies in ~{formatHours(clinic.avgResponseHours)}</Pill>
          {variant === "list" ? (
            <Pill icon={Globe2}>
              <span className="uppercase">{clinic.languages.join(" · ")}</span>
            </Pill>
          ) : null}
        </div>

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
