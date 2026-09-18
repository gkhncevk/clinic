export type Money = {
  amount: number
  currency: "GBP"
}

export type AmbassadorTier = "standard" | "silver" | "gold"

export type ReferralStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "disqualified"
  | "booked"
  | "treated"
  | "settled"
  | "cancelled"
  | "disputed"
  | "expired"

export type AmbassadorProfile = {
  id: string
  fullName: string
  avatarUrl: string
  city: string
  country: string
  referralCode: string
  tier: AmbassadorTier
  tierProgress: { current: number; nextTier: string; required: number }
  memberSince: string
  primaryCategory: string
  profileCompletion: number
}

export type AmbassadorSummary = {
  readyToPay: Money
  pendingEarnings: Money
  paidToDate: Money
  referralsThisMonth: number
  referralsLastMonth: number
  conversionRate: number
  conversionRateLast90d: number
  nextPayoutDate: string
  minimumPayout: Money
}

export type Referral = {
  id: string
  publicRef: string
  leadName: string
  clinicName: string
  category: string
  status: ReferralStatus
  createdAt: string
  leadFee: Money
  treatmentCommission: Money
  holdEndsAt: string | null
  channel: string
}

export type AmbassadorLink = {
  id: string
  slug: string
  label: string
  clinicName: string
  channel: string
  clickCount: number
  referralCount: number
  conversionRate: number
  isActive: boolean
  createdAt: string
}

export type Campaign = {
  id: string
  title: string
  clinicName: string
  category: string
  city: string
  qualifiedLeadFee: Money
  commissionBps: number
  daysLeft: number
  slotsLeft: number | null
  hasApplied: boolean
}

export type ClickSeriesPoint = { date: string; clicks: number }

export type AmbassadorData = {
  profile: AmbassadorProfile
  summary: AmbassadorSummary
  referrals: Referral[]
  links: AmbassadorLink[]
  campaigns: Campaign[]
  clickSeries: ClickSeriesPoint[]
}
