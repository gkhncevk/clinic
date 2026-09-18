export type ClinicCategory = "dental" | "hair" | "aesthetic"

export type VerificationLevel = "documents_verified" | "site_visited"

export type LanguageCode = "en" | "tr" | "ar" | "de" | "ru" | "nl" | "fr"

export type Clinic = {
  id: string
  slug: string
  displayName: string
  city: string
  district: string
  category: ClinicCategory
  services: string[]
  priceFrom: number
  priceTo: number
  currency: "GBP"
  verificationLevel: VerificationLevel
  languages: LanguageCode[]
  foundedYear: number
  staffCount: number
  completedReferrals: number
  avgResponseHours: number
  isSponsored: boolean
  isFeatured: boolean
  logoUrl: string
  coverUrl: string
  shortDescription: string
  createdAt: string
}

export type SortOption = "recommended" | "newest" | "price-asc" | "price-desc"

export type ClinicViewMode = "grid" | "list"
