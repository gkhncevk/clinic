import { Scissors, Smile, Sparkles, type LucideIcon } from "lucide-react"
import { CATEGORY_LABEL } from "@/lib/labels"
import type { Clinic, ClinicCategory } from "@/types/clinic"

const CATEGORY_ICON: Record<ClinicCategory, LucideIcon> = {
  dental: Smile,
  hair: Scissors,
  aesthetic: Sparkles,
}

const CATEGORIES: ClinicCategory[] = ["dental", "hair", "aesthetic"]

export function HeroCategoryCard({ clinics }: { clinics: Clinic[] }) {
  const counts = clinics.reduce<Record<ClinicCategory, number>>(
    (acc, clinic) => {
      acc[clinic.category] += 1
      return acc
    },
    { dental: 0, hair: 0, aesthetic: 0 }
  )

  return (
    <div className="absolute bottom-6 left-6 hidden w-52 -rotate-1 rounded-lg border border-border bg-surface p-3 shadow-lg xl:block">
      <p className="mb-2 text-2xs font-semibold uppercase tracking-wider text-text-muted">
        By category
      </p>
      <ul className="flex flex-col gap-1.5">
        {CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICON[category]
          return (
            <li key={category} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-1.5 text-text-muted">
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                {CATEGORY_LABEL[category]}
              </span>
              <span className="tabular font-medium text-text">{counts[category]}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
