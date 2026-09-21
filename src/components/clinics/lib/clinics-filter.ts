import type {
  Clinic,
  ClinicCategory,
  ClinicViewMode,
  LanguageCode,
  SortOption,
  VerificationLevel,
} from "@/types/clinic"

export type ClinicFilters = {
  cities: string[]
  categories: ClinicCategory[]
  verification: VerificationLevel[]
  languages: LanguageCode[]
  priceMin: number | null
  priceMax: number | null
  q: string
  sort: SortOption
  view: ClinicViewMode
  page: number
}

export const PAGE_SIZE = 9

export const EMPTY_FILTERS: ClinicFilters = {
  cities: [],
  categories: [],
  verification: [],
  languages: [],
  priceMin: null,
  priceMax: null,
  q: "",
  sort: "recommended",
  view: "grid",
  page: 1,
}

const SORT_OPTIONS: SortOption[] = ["recommended", "newest", "price-asc", "price-desc"]
const CATEGORY_OPTIONS: ClinicCategory[] = ["dental", "hair", "aesthetic"]
const VERIFICATION_OPTIONS: VerificationLevel[] = ["documents_verified", "site_visited"]
const LANGUAGE_OPTIONS: LanguageCode[] = ["en", "tr", "ar", "de", "ru", "nl", "fr"]

function parseListParam<T extends string>(
  params: URLSearchParams,
  key: string,
  allowed: readonly T[]
): T[] {
  const raw = params.get(key)
  if (!raw) return []
  return raw
    .split(",")
    .filter((value): value is T => (allowed as readonly string[]).includes(value))
}

export function parseFilters(searchParams: URLSearchParams): ClinicFilters {
  const priceMinRaw = searchParams.get("priceMin")
  const priceMaxRaw = searchParams.get("priceMax")
  const sortRaw = searchParams.get("sort")
  const viewRaw = searchParams.get("view")
  const pageRaw = searchParams.get("page")

  return {
    cities: (searchParams.get("city") ?? "").split(",").filter(Boolean),
    categories: parseListParam(searchParams, "category", CATEGORY_OPTIONS),
    verification: parseListParam(searchParams, "verification", VERIFICATION_OPTIONS),
    languages: parseListParam(searchParams, "lang", LANGUAGE_OPTIONS),
    priceMin: priceMinRaw ? Number(priceMinRaw) : null,
    priceMax: priceMaxRaw ? Number(priceMaxRaw) : null,
    q: searchParams.get("q") ?? "",
    sort: (SORT_OPTIONS as string[]).includes(sortRaw ?? "")
      ? (sortRaw as SortOption)
      : "recommended",
    view: viewRaw === "list" ? "list" : "grid",
    page: pageRaw && Number(pageRaw) > 0 ? Number(pageRaw) : 1,
  }
}

export function filtersToSearchParams(filters: ClinicFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.cities.length) params.set("city", filters.cities.join(","))
  if (filters.categories.length) params.set("category", filters.categories.join(","))
  if (filters.verification.length) params.set("verification", filters.verification.join(","))
  if (filters.languages.length) params.set("lang", filters.languages.join(","))
  if (filters.priceMin != null) params.set("priceMin", String(filters.priceMin))
  if (filters.priceMax != null) params.set("priceMax", String(filters.priceMax))
  if (filters.q) params.set("q", filters.q)
  if (filters.sort !== "recommended") params.set("sort", filters.sort)
  if (filters.view !== "grid") params.set("view", filters.view)
  if (filters.page > 1) params.set("page", String(filters.page))
  return params
}

type FilterDimension = "cities" | "categories" | "verification" | "languages"

function applyFilters(
  clinics: Clinic[],
  filters: ClinicFilters,
  omit?: FilterDimension
): Clinic[] {
  return clinics.filter((clinic) => {
    if (omit !== "cities" && filters.cities.length && !filters.cities.includes(clinic.city)) {
      return false
    }
    if (
      omit !== "categories" &&
      filters.categories.length &&
      !filters.categories.includes(clinic.category)
    ) {
      return false
    }
    if (
      omit !== "verification" &&
      filters.verification.length &&
      !filters.verification.includes(clinic.verificationLevel)
    ) {
      return false
    }
    if (
      omit !== "languages" &&
      filters.languages.length &&
      !filters.languages.some((lang) => clinic.languages.includes(lang))
    ) {
      return false
    }
    if (filters.priceMin != null && clinic.priceTo < filters.priceMin) return false
    if (filters.priceMax != null && clinic.priceFrom > filters.priceMax) return false
    if (filters.q.trim()) {
      const q = filters.q.trim().toLowerCase()
      const haystack = `${clinic.displayName} ${clinic.city} ${clinic.services.join(" ")}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function filterClinics(clinics: Clinic[], filters: ClinicFilters): Clinic[] {
  return applyFilters(clinics, filters)
}

export function countByOption(
  clinics: Clinic[],
  filters: ClinicFilters,
  dimension: FilterDimension,
  getOptionValue: (clinic: Clinic) => string[]
): Map<string, number> {
  const pool = applyFilters(clinics, filters, dimension)
  const counts = new Map<string, number>()
  for (const clinic of pool) {
    for (const value of getOptionValue(clinic)) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
  }
  return counts
}

// verification 40% + referral volume 35% + response speed 25%
export function recommendedScore(clinic: Clinic, bounds: { maxReferrals: number; maxResponseHours: number }): number {
  const verificationScore = clinic.verificationLevel === "site_visited" ? 1 : 0.55
  const referralScore = bounds.maxReferrals > 0 ? clinic.completedReferrals / bounds.maxReferrals : 0
  const responseScore =
    bounds.maxResponseHours > 0 ? 1 - clinic.avgResponseHours / bounds.maxResponseHours : 0
  return verificationScore * 0.4 + referralScore * 0.35 + responseScore * 0.25
}

export function sortClinics(clinics: Clinic[], sort: SortOption): Clinic[] {
  const maxReferrals = Math.max(1, ...clinics.map((c) => c.completedReferrals))
  const maxResponseHours = Math.max(1, ...clinics.map((c) => c.avgResponseHours))
  const bounds = { maxReferrals, maxResponseHours }

  const sorted = [...clinics]
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case "price-asc":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom)
    case "price-desc":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom)
    case "recommended":
    default:
      return sorted.sort((a, b) => recommendedScore(b, bounds) - recommendedScore(a, bounds))
  }
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): T[] {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function activeFilterCount(filters: ClinicFilters): number {
  return (
    filters.cities.length +
    filters.categories.length +
    filters.verification.length +
    filters.languages.length +
    (filters.priceMin != null || filters.priceMax != null ? 1 : 0) +
    (filters.q.trim() ? 1 : 0)
  )
}
