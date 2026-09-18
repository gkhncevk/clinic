import type { CSSProperties } from "react"

/**
 * Deterministic identity color for entities with no real logo/avatar image
 * (clinics, ambassadors). Same id always resolves to the same swatch, in
 * both themes — a curated set, not raw hash-to-hue, so contrast with white
 * text stays predictable everywhere it is used.
 */
const IDENTITY_SWATCHES: { light: string; dark: string }[] = [
  { light: "#1F5FA8", dark: "#2C4A73" }, // blue
  { light: "#0F7A63", dark: "#1E4F44" }, // teal
  { light: "#6E3FA3", dark: "#4A3466" }, // violet
  { light: "#B0435B", dark: "#6B2F3D" }, // rose
  { light: "#B0651F", dark: "#6B4420" }, // amber-brown
  { light: "#3E6E8E", dark: "#2C4E63" }, // slate blue
  { light: "#4C7A2E", dark: "#37501F" }, // olive
  { light: "#7A4A9E", dark: "#4F3468" }, // purple
]

/** FNV-1a, good enough distribution for a handful of swatch buckets. */
function hashString(value: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function identityColor(seed: string): { light: string; dark: string } {
  const index = hashString(seed) % IDENTITY_SWATCHES.length
  return IDENTITY_SWATCHES[index]!
}

/** CSS custom properties to spread onto an element's `style` prop. */
export function identityColorStyle(seed: string): CSSProperties {
  const { light, dark } = identityColor(seed)
  return {
    "--identity-bg-light": light,
    "--identity-bg-dark": dark,
  } as CSSProperties
}
