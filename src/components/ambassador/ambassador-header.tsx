"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { IdentityAvatar } from "@/components/common/identity-avatar"
import { Button } from "@/components/ui/button"
import type { AmbassadorProfile } from "@/types/ambassador"

const TIER_LABEL: Record<string, string> = {
  standard: "Standard",
  silver: "Silver",
  gold: "Gold",
}

function firstName(fullName: string) {
  return fullName.split(" ")[0] ?? fullName
}

export function AmbassadorHeader({ profile }: { profile: AmbassadorProfile }) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(profile.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore — clipboard may be unavailable in this context
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <IdentityAvatar seed={profile.id} name={profile.fullName} className="size-12 text-base" />
        <div>
          <p className="text-sm text-text-muted">Welcome back,</p>
          <h1 className="text-2xl font-semibold tracking-tight text-text">{firstName(profile.fullName)}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-text">
          {TIER_LABEL[profile.tier] ?? profile.tier} tier
        </span>
        <Button variant="outline" size="sm" className="gap-1.5 font-mono" onClick={copyCode}>
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {profile.referralCode}
        </Button>
      </div>
    </div>
  )
}
