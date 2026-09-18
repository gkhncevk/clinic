import { StatusBadge } from "@/components/ambassador/status-badge"
import { formatDate } from "@/lib/format"
import { formatMoney } from "@/lib/money"
import type { Referral } from "@/types/ambassador"

function money(value: { amount: number; currency: "GBP" }) {
  return value.amount === 0 ? <span className="text-text-muted">—</span> : formatMoney(value)
}

export function ReferralsCardList({ referrals }: { referrals: Referral[] }) {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {referrals.map((referral) => (
        <div key={referral.id} className="flex flex-col gap-2.5 rounded-lg border border-border bg-surface p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-text">{referral.leadName}</p>
              <p className="text-sm text-text-muted">{referral.clinicName}</p>
            </div>
            <StatusBadge status={referral.status} />
          </div>

          {referral.status === "treated" && referral.holdEndsAt ? (
            <p className="text-xs text-text-muted">Hold ends {formatDate(referral.holdEndsAt)}</p>
          ) : null}

          <div className="flex items-center justify-between border-t border-border pt-2.5 text-sm">
            <span className="tabular text-text-muted">{formatDate(referral.createdAt)}</span>
            <span className="capitalize text-text-muted">{referral.channel}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-text-muted">
              Lead fee <span className="tabular font-medium text-text">{money(referral.leadFee)}</span>
            </span>
            <span className="text-text-muted">
              Commission{" "}
              <span className="tabular font-medium text-text">{money(referral.treatmentCommission)}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
