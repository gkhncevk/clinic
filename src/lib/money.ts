import type { Money } from "@/types/ambassador"

const gbpWithDecimals = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const gbpWhole = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** Formats an integer pence amount as GBP, hiding decimals when they are zero. */
export function formatPence(pence: number): string {
  const pounds = pence / 100
  return Number.isInteger(pounds) ? gbpWhole.format(pounds) : gbpWithDecimals.format(pounds)
}

export function formatMoney(money: Money): string {
  return formatPence(money.amount)
}

/** Formats a "from–to" price range sharing a single currency symbol. */
export function formatPriceRange(fromPence: number, toPence: number): string {
  const from = formatPence(fromPence)
  const to = formatPence(toPence)
  return `${from} – ${to}`
}

/** Converts basis points (600 = 6%) to a percentage string. */
export function formatBps(bps: number): string {
  return `${(bps / 100).toFixed(bps % 100 === 0 ? 0 : 1)}%`
}

export function formatPercent(ratio: number, fractionDigits = 0): string {
  return `${(ratio * 100).toFixed(fractionDigits)}%`
}
