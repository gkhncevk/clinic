"use client"

import { useMemo, useState } from "react"
import { ReferralsCardList } from "@/components/ambassador/referrals-card-list"
import { ReferralsTable } from "@/components/ambassador/referrals-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Referral, ReferralStatus } from "@/types/ambassador"

const STATUS_OPTIONS: ReferralStatus[] = [
  "new",
  "contacted",
  "qualified",
  "booked",
  "treated",
  "settled",
  "disqualified",
  "cancelled",
  "disputed",
  "expired",
]

const STATUS_LABEL: Record<ReferralStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  disqualified: "Disqualified",
  booked: "Booked",
  treated: "Treated",
  settled: "Settled",
  cancelled: "Cancelled",
  disputed: "Disputed",
  expired: "Expired",
}

export function ReferralsSection({ referrals }: { referrals: Referral[] }) {
  const [status, setStatus] = useState<ReferralStatus | "all">("all")

  const filtered = useMemo(
    () => (status === "all" ? referrals : referrals.filter((r) => r.status === status)),
    [referrals, status]
  )

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-text">My referrals</h2>
        <Select value={status} onValueChange={(v) => setStatus(v as ReferralStatus | "all")}>
          <SelectTrigger className="w-44 bg-surface text-sm" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {STATUS_LABEL[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border-strong bg-surface px-4 py-10 text-center text-sm text-text-muted">
          No referrals with this status yet.
        </p>
      ) : (
        <>
          <ReferralsTable referrals={filtered} />
          <ReferralsCardList referrals={filtered} />
        </>
      )}
    </section>
  )
}
