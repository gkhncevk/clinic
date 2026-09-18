"use client"

import { Search } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ActiveFilterChips } from "@/components/clinics/active-filter-chips"
import { ClinicCard } from "@/components/clinics/clinic-card"
import { ClinicFilterDrawer } from "@/components/clinics/clinic-filter-drawer"
import { ClinicFiltersBar, type ClinicFacets } from "@/components/clinics/clinic-filters-bar"
import { EmptyState } from "@/components/clinics/empty-state"
import {
  EMPTY_FILTERS,
  PAGE_SIZE,
  countByOption,
  filterClinics,
  filtersToSearchParams,
  parseFilters,
  sortClinics,
  paginate,
  type ClinicFilters,
} from "@/components/clinics/lib/clinics-filter"
import { Pagination } from "@/components/clinics/pagination"
import { SortSelect } from "@/components/clinics/sort-select"
import { SponsoredSection } from "@/components/clinics/sponsored-section"
import { Input } from "@/components/ui/input"
import { ViewToggle } from "@/components/clinics/view-toggle"
import { CATEGORY_LABEL, LANGUAGE_LABEL, VERIFICATION_LABEL } from "@/lib/labels"
import type { Clinic } from "@/types/clinic"

export function ClinicsExplorer({ allClinics }: { allClinics: Clinic[] }) {
  const priceBounds = useMemo(
    () => ({
      min: Math.min(...allClinics.map((c) => c.priceFrom)),
      max: Math.max(...allClinics.map((c) => c.priceTo)),
    }),
    [allClinics]
  )

  const [filters, setFilters] = useState<ClinicFilters>(EMPTY_FILTERS)
  const [searchDraft, setSearchDraft] = useState("")
  const hasMounted = useRef(false)

  // Read the initial filter state from the URL once on mount, then keep the
  // URL in sync via the History API directly — filtering happens entirely
  // client-side against data already fetched, so we never re-trigger a
  // server round trip (and its mock-delay loading state) on every click.
  useEffect(() => {
    const initial = parseFilters(new URLSearchParams(window.location.search))
    setFilters(initial)
    setSearchDraft(initial.q)

    function onPopState() {
      setFilters(parseFilters(new URLSearchParams(window.location.search)))
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    const params = filtersToSearchParams(filters)
    const query = params.toString()
    const url = query ? `/clinics?${query}` : "/clinics"
    window.history.replaceState(null, "", url)
  }, [filters])

  // Debounce the search box so every keystroke doesn't churn the URL.
  useEffect(() => {
    const handle = setTimeout(() => {
      setFilters((f) => (f.q === searchDraft ? f : { ...f, q: searchDraft, page: 1 }))
    }, 250)
    return () => clearTimeout(handle)
  }, [searchDraft])

  const filtered = useMemo(() => filterClinics(allClinics, filters), [allClinics, filters])
  const sponsored = useMemo(() => filtered.filter((c) => c.isSponsored), [filtered])
  const organic = useMemo(() => filtered.filter((c) => !c.isSponsored), [filtered])
  const sortedOrganic = useMemo(() => sortClinics(organic, filters.sort), [organic, filters.sort])
  const totalPages = Math.max(1, Math.ceil(sortedOrganic.length / PAGE_SIZE))
  const page = Math.min(filters.page, totalPages)
  const pageItems = useMemo(() => paginate(sortedOrganic, page), [sortedOrganic, page])

  const facets: ClinicFacets = useMemo(() => {
    const cityCounts = countByOption(allClinics, filters, "cities", (c) => [c.city])
    const categoryCounts = countByOption(allClinics, filters, "categories", (c) => [c.category])
    const verificationCounts = countByOption(allClinics, filters, "verification", (c) => [
      c.verificationLevel,
    ])
    const languageCounts = countByOption(allClinics, filters, "languages", (c) => c.languages)

    const cities = [...new Set(allClinics.map((c) => c.city))].sort()

    return {
      cities: cities.map((city) => ({ value: city, label: city, count: cityCounts.get(city) ?? 0 })),
      categories: (["dental", "hair", "aesthetic"] as const).map((value) => ({
        value,
        label: CATEGORY_LABEL[value],
        count: categoryCounts.get(value) ?? 0,
      })),
      verification: (["documents_verified", "site_visited"] as const).map((value) => ({
        value,
        label: VERIFICATION_LABEL[value],
        count: verificationCounts.get(value) ?? 0,
      })),
      languages: (["en", "tr", "ar", "de", "ru", "nl", "fr"] as const).map((value) => ({
        value,
        label: LANGUAGE_LABEL[value],
        count: languageCounts.get(value) ?? 0,
      })),
    }
  }, [allClinics, filters])

  const countResults = useCallback(
    (f: ClinicFilters) => filterClinics(allClinics, f).length,
    [allClinics]
  )

  function updateFilters(next: ClinicFilters) {
    setFilters(next)
    if (next.q !== searchDraft) setSearchDraft(next.q)
  }

  function clearAllFilters() {
    updateFilters({ ...EMPTY_FILTERS, sort: filters.sort, view: filters.view })
    setSearchDraft("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <Input
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            placeholder="Search by clinic, city or treatment"
            className="h-10 pl-9"
            aria-label="Search clinics"
          />
        </div>

        <ClinicFiltersBar
          facets={facets}
          priceBounds={priceBounds}
          filters={filters}
          onChange={updateFilters}
          className="hidden flex-wrap items-center gap-2 lg:flex"
        />

        <div className="lg:hidden">
          <ClinicFilterDrawer
            facets={facets}
            priceBounds={priceBounds}
            filters={filters}
            onChange={updateFilters}
            countResults={countResults}
          />
        </div>
      </div>

      <ActiveFilterChips filters={filters} priceBounds={priceBounds} onChange={updateFilters} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-sm text-text-muted">
          <span className="tabular font-medium text-text">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "clinic" : "clinics"} found
        </p>
        <div className="flex items-center gap-2">
          <SortSelect value={filters.sort} onChange={(sort) => updateFilters({ ...filters, sort })} />
          <ViewToggle value={filters.view} onChange={(view) => updateFilters({ ...filters, view })} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={filters.q.trim() || undefined} onClearFilters={clearAllFilters} />
      ) : (
        <>
          {page === 1 ? <SponsoredSection clinics={sponsored} view={filters.view} /> : null}

          <div
            className={
              filters.view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {pageItems.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} variant={filters.view} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(nextPage) => {
              updateFilters({ ...filters, page: nextPage })
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        </>
      )}
    </div>
  )
}
