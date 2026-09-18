import { StatusBadge } from "@/components/ambassador/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/format"
import { formatMoney } from "@/lib/money"
import type { Referral } from "@/types/ambassador"

function money(value: { amount: number; currency: "GBP" }) {
  return value.amount === 0 ? (
    <span className="text-text-muted">—</span>
  ) : (
    formatMoney(value)
  )
}

export function ReferralsTable({ referrals }: { referrals: Referral[] }) {
  return (
    <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead>Clinic</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Lead fee</TableHead>
            <TableHead className="text-right">Commission</TableHead>
            <TableHead>Channel</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell className="font-medium text-text">{referral.leadName}</TableCell>
              <TableCell className="text-text-muted">
                <span className="text-text">{referral.clinicName}</span>
                <span className="block text-xs capitalize text-text-muted">{referral.category}</span>
              </TableCell>
              <TableCell>
                <StatusBadge status={referral.status} />
                {referral.status === "treated" && referral.holdEndsAt ? (
                  <span className="mt-1 block text-xs text-text-muted">
                    Hold ends {formatDate(referral.holdEndsAt)}
                  </span>
                ) : null}
              </TableCell>
              <TableCell className="tabular text-text-muted">{formatDate(referral.createdAt)}</TableCell>
              <TableCell className="tabular text-right text-text">{money(referral.leadFee)}</TableCell>
              <TableCell className="tabular text-right text-text">
                {money(referral.treatmentCommission)}
              </TableCell>
              <TableCell className="capitalize text-text-muted">{referral.channel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
