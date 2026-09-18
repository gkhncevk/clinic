const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const dateFormatterShort = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
})

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

export function formatDateShort(iso: string): string {
  return dateFormatterShort.format(new Date(iso))
}

export function formatHours(hours: number): string {
  if (hours < 1) return "< 1h"
  if (hours < 24) return `${hours}h`
  const days = Math.round(hours / 24)
  return `${days}d`
}

const compactNumber = new Intl.NumberFormat("en-GB", { notation: "compact" })

export function formatCompactNumber(value: number): string {
  return compactNumber.format(value)
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase()
}
