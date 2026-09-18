import { CheckCircle2, MapPin } from "lucide-react"
import { formatBps, formatMoney } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { Campaign } from "@/types/ambassador"

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div
      className={cn(
        "flex w-72 shrink-0 snap-start flex-col gap-3 rounded-lg border bg-surface p-4 sm:w-auto sm:shrink",
        campaign.hasApplied ? "border-border" : "border-border"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-medium text-text">{campaign.title}</p>
          <p className="truncate text-sm text-text-muted">{campaign.clinicName}</p>
        </div>
        {campaign.hasApplied ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success-bg px-2 py-0.5 text-2xs font-medium text-success">
            <CheckCircle2 className="size-3" aria-hidden="true" />
            Applied
          </span>
        ) : null}
      </div>

      <p className="flex items-center gap-1 text-sm text-text-muted">
        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
        {campaign.city} · <span className="capitalize">{campaign.category}</span>
      </p>

      <div className="flex items-end justify-between rounded-md bg-surface-2 px-3 py-2.5">
        <div>
          <p className="text-2xs uppercase tracking-wide text-text-muted">Qualified lead fee</p>
          <p className="tabular text-lg font-semibold text-text">
            {formatMoney(campaign.qualifiedLeadFee)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xs uppercase tracking-wide text-text-muted">Commission</p>
          <p className="tabular text-lg font-semibold text-text">{formatBps(campaign.commissionBps)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span className="tabular">{campaign.daysLeft} days left</span>
        <span className="tabular">
          {campaign.slotsLeft == null ? "Unlimited slots" : `${campaign.slotsLeft} slots left`}
        </span>
      </div>
    </div>
  )
}

export function CampaignCards({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-text">Campaigns</h2>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}
