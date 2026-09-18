"use client"

import { ArrowDown, ArrowUp, Minus, type LucideIcon } from "lucide-react"
import { AnimatedNumber } from "@/components/common/animated-number"
import { formatDate } from "@/lib/format"
import { formatPence, formatPercent } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { AmbassadorSummary } from "@/types/ambassador"

type Trend = { direction: "up" | "down" | "flat"; label: string }

function Delta({ trend }: { trend: Trend }) {
  const Icon: LucideIcon = trend.direction === "up" ? ArrowUp : trend.direction === "down" ? ArrowDown : Minus
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm",
        trend.direction === "up" && "text-success",
        trend.direction === "down" && "text-danger",
        trend.direction === "flat" && "text-text-muted"
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {trend.label}
    </span>
  )
}

function referralsTrend(thisMonth: number, lastMonth: number): Trend {
  const delta = thisMonth - lastMonth
  if (delta === 0) return { direction: "flat", label: "Same as last month" }
  return {
    direction: delta > 0 ? "up" : "down",
    label: `${delta > 0 ? "+" : ""}${delta} vs last month`,
  }
}

function conversionTrend(current: number, last90d: number): Trend {
  const deltaPoints = Math.round((current - last90d) * 1000) / 10
  if (deltaPoints === 0) return { direction: "flat", label: "Same as last 90 days" }
  return {
    direction: deltaPoints > 0 ? "up" : "down",
    label: `${deltaPoints > 0 ? "+" : ""}${deltaPoints}pp vs last 90 days`,
  }
}

export function SummaryCards({ summary }: { summary: AmbassadorSummary }) {
  const cards = [
    {
      key: "ready",
      label: "Ready to pay",
      value: summary.readyToPay.amount,
      format: formatPence,
      sub: `Next payout ${formatDate(summary.nextPayoutDate)}`,
    },
    {
      key: "pending",
      label: "Pending earnings",
      value: summary.pendingEarnings.amount,
      format: formatPence,
      sub: "Released after a 30-day hold period",
    },
    {
      key: "referrals",
      label: "Referrals this month",
      value: summary.referralsThisMonth,
      format: (n: number) => String(Math.round(n)),
      trend: referralsTrend(summary.referralsThisMonth, summary.referralsLastMonth),
    },
    {
      key: "conversion",
      label: "Conversion rate",
      value: summary.conversionRate,
      format: (n: number) => formatPercent(n),
      trend: conversionTrend(summary.conversionRate, summary.conversionRateLast90d),
    },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.key} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
          <p className="text-sm font-medium text-text-muted">{card.label}</p>
          <p className="tabular text-3xl font-semibold tracking-tight text-text">
            <AnimatedNumber value={card.value} format={card.format} />
          </p>
          {"trend" in card ? (
            <Delta trend={card.trend} />
          ) : (
            <p className="text-sm text-text-muted">{card.sub}</p>
          )}
        </div>
      ))}
    </div>
  )
}
