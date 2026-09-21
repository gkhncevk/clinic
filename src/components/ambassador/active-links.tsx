"use client"

import { Check, Copy, Link2Off } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatCompactNumber } from "@/lib/format"
import { formatPercent } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { AmbassadorLink } from "@/types/ambassador"

function LinkRow({ link }: { link: AmbassadorLink }) {
  const [copied, setCopied] = useState(false)
  const shortUrl = `ynsocial.com/r/${link.slug}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(`https://${shortUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between",
        !link.isActive && "opacity-60"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-text">{link.label}</p>
          {!link.isActive ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-border-strong px-2 py-0.5 text-2xs text-text-muted">
              <Link2Off className="size-3" aria-hidden="true" />
              Inactive
            </span>
          ) : null}
        </div>
        <p className="truncate text-sm text-text-muted">
          {link.clinicName} · {shortUrl}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="tabular text-sm font-medium text-text">{formatCompactNumber(link.clickCount)}</p>
          <p className="text-xs text-text-muted">Clicks</p>
        </div>
        <div className="text-right">
          <p className="tabular text-sm font-medium text-text">{link.referralCount}</p>
          <p className="text-xs text-text-muted">Referrals</p>
        </div>
        <div className="text-right">
          <p className="tabular text-sm font-medium text-text">{formatPercent(link.conversionRate)}</p>
          <p className="text-xs text-text-muted">Conv.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!link.isActive}
          onClick={copy}
          className="gap-1.5"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  )
}

export function ActiveLinks({ links }: { links: AmbassadorLink[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-text">My links</h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <LinkRow key={link.id} link={link} />
        ))}
      </div>
    </section>
  )
}
