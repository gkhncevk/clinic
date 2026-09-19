import type { Clinic } from "@/types/clinic"

/**
 * `logoUrl`/`coverUrl` point to files that don't exist (docs/04-VERI.md —
 * deliberate). Real per-clinic photography isn't available, so instead of
 * a gray box we use category-representative photography: a small curated
 * pool per category, licensed for free commercial use (Unsplash), picked
 * deterministically per clinic id so the same clinic always shows the same
 * photo. This is the same idea the brief itself suggests ("kategoriye göre
 * renk sistemi") applied to photography instead of flat color.
 */
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
  // Hashing id+category (not id alone) and discarding the low bits before
  // the modulo avoids the skew that plain `hash(id) % 3` produced on this
  // data set — ids are sequential per category ("cl_001", "cl_002", ...),
  // which correlated badly with a small modulus.
  const hash = hashString(`${clinic.id}${clinic.category}`)
  const index = ((hash >>> 8) % PHOTOS_PER_CATEGORY) + 1
  return `/images/clinics/${clinic.category}-${index}.jpg`
}
