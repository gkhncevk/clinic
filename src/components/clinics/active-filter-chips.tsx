"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CATEGORY_LABEL, LANGUAGE_LABEL, VERIFICATION_LABEL } from "@/lib/labels"
import { formatPence } from "@/lib/money"
import type { ClinicFilters } from "@/components/clinics/lib/clinics-filter"

type Chip = { key: string; label: string; onRemove: () => void }

type ActiveFilterChipsProps = {
  filters: ClinicFilters
  priceBounds: { min: number; max: number }
  onChange: (next: ClinicFilters) => void
}

export function ActiveFilterChips({ filters, priceBounds, onChange }: ActiveFilterChipsProps) {
  const chips: Chip[] = []

  for (const city of filters.cities) {
    chips.push({
      key: `city-${city}`,
      label: city,
      onRemove: () => onChange({ ...filters, cities: filters.cities.filter((c) => c !== city), page: 1 }),
    })
  }
  for (const category of filters.categories) {
    chips.push({
      key: `category-${category}`,
      label: CATEGORY_LABEL[category],
      onRemove: () =>
        onChange({ ...filters, categories: filters.categories.filter((c) => c !== category), page: 1 }),
    })
  }
  for (const level of filters.verification) {
    chips.push({
      key: `verification-${level}`,
      label: VERIFICATION_LABEL[level],
      onRemove: () =>
        onChange({ ...filters, verification: filters.verification.filter((v) => v !== level), page: 1 }),
    })
  }
  for (const lang of filters.languages) {
    chips.push({
      key: `lang-${lang}`,
      label: LANGUAGE_LABEL[lang],
      onRemove: () =>
        onChange({ ...filters, languages: filters.languages.filter((l) => l !== lang), page: 1 }),
    })
  }
  if (filters.priceMin != null || filters.priceMax != null) {
    chips.push({
      key: "price",
      label: `${formatPence(filters.priceMin ?? priceBounds.min)} – ${formatPence(filters.priceMax ?? priceBounds.max)}`,
      onRemove: () => onChange({ ...filters, priceMin: null, priceMax: null, page: 1 }),
    })
  }
  if (filters.q.trim()) {
    chips.push({
      key: "q",
      label: `“${filters.q.trim()}”`,
      onRemove: () => onChange({ ...filters, q: "", page: 1 }),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1 pl-3 pr-1.5 text-sm text-text"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove filter ${chip.label}`}
            className="-my-1.5 -mr-1 flex size-8 items-center justify-center rounded-full text-text-muted transition-transform duration-150 hover:bg-surface-2 hover:text-text active:scale-90"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </span>
      ))}
      {chips.length > 1 ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-sm text-text-muted"
          onClick={() =>
            onChange({
              ...filters,
              cities: [],
              categories: [],
              verification: [],
              languages: [],
              priceMin: null,
              priceMax: null,
              q: "",
              page: 1,
            })
          }
        >
          Clear all
        </Button>
      ) : null}
    </div>
  )
}
