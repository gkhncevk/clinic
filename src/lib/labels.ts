import type { ClinicCategory, LanguageCode, VerificationLevel } from "@/types/clinic"

export const CATEGORY_LABEL: Record<ClinicCategory, string> = {
  dental: "Dental",
  hair: "Hair transplant",
  aesthetic: "Aesthetic",
}

export const VERIFICATION_LABEL: Record<VerificationLevel, string> = {
  documents_verified: "Documents verified",
  site_visited: "Site visited",
}

export const LANGUAGE_LABEL: Record<LanguageCode, string> = {
  en: "English",
  tr: "Turkish",
  ar: "Arabic",
  de: "German",
  ru: "Russian",
  nl: "Dutch",
  fr: "French",
}
