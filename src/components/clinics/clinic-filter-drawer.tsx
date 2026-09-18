"use client"

import { SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { FilterCheckboxGroup } from "@/components/clinics/filter-checkbox-group"
import { PriceRangeFilter } from "@/components/clinics/price-range-filter"
import { Separator } from "@/components/ui/separator"
import type { ClinicFacets } from "@/components/clinics/clinic-filters-bar"
import type { ClinicFilters } from "@/components/clinics/lib/clinics-filter"
import { activeFilterCount } from "@/components/clinics/lib/clinics-filter"

type ClinicFilterDrawerProps = {
  facets: ClinicFacets
  priceBounds: { min: number; max: number }
  filters: ClinicFilters
  onChange: (next: ClinicFilters) => void
  countResults: (filters: ClinicFilters) => number
}

const CLEARED: Pick<
  ClinicFilters,
  "cities" | "categories" | "verification" | "languages" | "priceMin" | "priceMax"
> = {
  cities: [],
  categories: [],
  verification: [],
  languages: [],
  priceMin: null,
  priceMax: null,
}

export function ClinicFilterDrawer({
  facets,
  priceBounds,
  filters,
  onChange,
  countResults,
}: ClinicFilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(filters)

  function openDrawer(next: boolean) {
    if (next) setDraft(filters)
    setOpen(next)
  }

  function apply() {
    onChange({ ...draft, page: 1 })
    setOpen(false)
  }

  function clearAll() {
    const next = { ...filters, ...CLEARED, page: 1 }
    setDraft(next)
    onChange(next)
    setOpen(false)
  }

  const count = activeFilterCount(filters)
  const liveCount = countResults(draft)

  return (
    <Drawer open={open} onOpenChange={openDrawer}>
      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-1.5 bg-surface text-sm"
        onClick={() => openDrawer(true)}
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Filters
        {count > 0 ? (
          <span className="tabular flex size-5 items-center justify-center rounded-full bg-primary text-2xs font-semibold text-text-on-primary">
            {count}
          </span>
        ) : null}
      </Button>

      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Narrow down clinics by city, category and more.</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-5 overflow-y-auto px-4 pb-4">
          <FilterCheckboxGroup
            legend="City"
            options={facets.cities}
            selected={draft.cities}
            onChange={(cities) => setDraft((d) => ({ ...d, cities }))}
          />
          <Separator />
          <FilterCheckboxGroup
            legend="Category"
            options={facets.categories}
            selected={draft.categories}
            onChange={(categories) =>
              setDraft((d) => ({ ...d, categories: categories as ClinicFilters["categories"] }))
            }
            searchThreshold={99}
          />
          <Separator />
          <FilterCheckboxGroup
            legend="Verification"
            options={facets.verification}
            selected={draft.verification}
            onChange={(verification) =>
              setDraft((d) => ({ ...d, verification: verification as ClinicFilters["verification"] }))
            }
            searchThreshold={99}
          />
          <Separator />
          <FilterCheckboxGroup
            legend="Language"
            options={facets.languages}
            selected={draft.languages}
            onChange={(languages) =>
              setDraft((d) => ({ ...d, languages: languages as ClinicFilters["languages"] }))
            }
          />
          <Separator />
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-text">Price</p>
            <PriceRangeFilter
              bounds={priceBounds}
              value={{ min: draft.priceMin, max: draft.priceMax }}
              onChange={({ min, max }) => setDraft((d) => ({ ...d, priceMin: min, priceMax: max }))}
            />
          </div>
        </div>

        <div
          className="flex items-center gap-2 border-t border-border p-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <Button variant="ghost" className="flex-1" onClick={clearAll}>
            Clear all
          </Button>
          <Button className="flex-[2]" onClick={apply}>
            Show {liveCount} {liveCount === 1 ? "result" : "results"}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
