import type { Clinic } from "@/types/clinic"

const PHOTOS_PER_CATEGORY = 3

function hashString(value: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function clinicPhoto(clinic: Pick<Clinic, "id" | "category">): string {
  const hash = hashString(`${clinic.id}${clinic.category}`)
  const index = ((hash >>> 8) % PHOTOS_PER_CATEGORY) + 1
  return `/images/clinics/${clinic.category}-${index}.jpg`
}
