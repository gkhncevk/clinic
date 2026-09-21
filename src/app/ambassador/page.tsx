import type { Metadata } from "next"
import { ActiveLinks } from "@/components/ambassador/active-links"
import { AmbassadorHeader } from "@/components/ambassador/ambassador-header"
import { CampaignCards } from "@/components/ambassador/campaign-cards"
import { ClickChart } from "@/components/ambassador/click-chart"
import { ReferralsSection } from "@/components/ambassador/referrals-section"
import { SummaryCards } from "@/components/ambassador/summary-cards"
import { TierProgress } from "@/components/ambassador/tier-progress"
import { getAmbassadorData } from "@/data/get-ambassador"

export const metadata: Metadata = {
  title: "Ambassador dashboard | ynsocial",
  description: "Track referrals, earnings and active campaigns as a ynsocial ambassador.",
}

export const dynamic = "force-dynamic"

export default async function AmbassadorPage() {
  const data = await getAmbassadorData()

  return (
    <main className="mx-auto flex w-full page-container flex-col gap-6 px-4 py-6 sm:px-5 lg:px-8">
      <AmbassadorHeader profile={data.profile} />
      <SummaryCards summary={data.summary} />
      <TierProgress profile={data.profile} />
      <ClickChart data={data.clickSeries} />
      <ReferralsSection referrals={data.referrals} />
      <ActiveLinks links={data.links} />
      <CampaignCards campaigns={data.campaigns} />
    </main>
  )
}
