"use client"

import { FilterCheckboxGroup, type FilterOption } from "@/components/clinics/filter-checkbox-group"
import { FilterPopoverButton } from "@/components/clinics/filter-popover-button"
import { PriceRangeFilter } from "@/components/clinics/price-range-filter"
import type { ClinicFilters } from "@/components/clinics/lib/clinics-filter"

export type ClinicFacets = {
  cities: FilterOption[]
  categories: FilterOption[]
  verification: FilterOption[]
  languages: FilterOption[]
}

type ClinicFiltersBarProps = {
  facets: ClinicFacets
  priceBounds: { min: number; max: number }
  filters: ClinicFilters
  onChange: (next: ClinicFilters) => void
  className?: string
}

export function ClinicFiltersBar({
  facets,
  priceBounds,
  filters,
  onChange,
  className,
}: ClinicFiltersBarProps) {
  return (
    <div className={className}>
      <FilterPopoverButton label="City" activeCount={filters.cities.length}>
        <FilterCheckboxGroup
          legend="City"
          options={facets.cities}
          selected={filters.cities}
          onChange={(cities) => onChange({ ...filters, cities, page: 1 })}
        />
      </FilterPopoverButton>

      <FilterPopoverButton label="Category" activeCount={filters.categories.length}>
        <FilterCheckboxGroup
          legend="Category"
          options={facets.categories}
          selected={filters.categories}
          onChange={(categories) =>
            onChange({ ...filters, categories: categories as ClinicFilters["categories"], page: 1 })
          }
          searchThreshold={99}
        />
      </FilterPopoverButton>

      <FilterPopoverButton label="Verification" activeCount={filters.verification.length}>
        <FilterCheckboxGroup
          legend="Verification"
          options={facets.verification}
          selected={filters.verification}
          onChange={(verification) =>
            onChange({ ...filters, verification: verification as ClinicFilters["verification"], page: 1 })
          }
          searchThreshold={99}
        />
      </FilterPopoverButton>

      <FilterPopoverButton label="Language" activeCount={filters.languages.length}>
        <FilterCheckboxGroup
          legend="Language"
          options={facets.languages}
          selected={filters.languages}
          onChange={(languages) =>
            onChange({ ...filters, languages: languages as ClinicFilters["languages"], page: 1 })
          }
        />
      </FilterPopoverButton>

      <FilterPopoverButton
        label="Price"
        activeCount={filters.priceMin != null || filters.priceMax != null ? 1 : 0}
        align="start"
      >
        <PriceRangeFilter
          bounds={priceBounds}
          value={{ min: filters.priceMin, max: filters.priceMax }}
          onChange={({ min, max }) => onChange({ ...filters, priceMin: min, priceMax: max, page: 1 })}
        />
      </FilterPopoverButton>
    </div>
  )
}
