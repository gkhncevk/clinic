"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SortOption } from "@/types/clinic"

const SORT_LABEL: Record<SortOption, string> = {
  recommended: "Recommended",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
}

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption
  onChange: (value: SortOption) => void
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-48 bg-surface text-sm" aria-label="Sort results">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(SORT_LABEL) as SortOption[]).map((option) => (
          <SelectItem key={option} value={option}>
            {SORT_LABEL[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
