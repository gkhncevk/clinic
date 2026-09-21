"use client"

import { Globe2, MapPinned, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react"
import { AnimatedNumber } from "@/components/common/animated-number"
import type { Clinic } from "@/types/clinic"

export function TrustStats({ clinics }: { clinics: Clinic[] }) {
  const cities = new Set(clinics.map((c) => c.city)).size
  const languages = new Set(clinics.flatMap((c) => c.languages)).size
  const siteVisited = clinics.filter((c) => c.verificationLevel === "site_visited").length

  const stats: { value: number; label: string; icon: LucideIcon }[] = [
    { value: clinics.length, label: "Verified clinics", icon: Stethoscope },
    { value: cities, label: "Cities", icon: MapPinned },
    { value: siteVisited, label: "Site-visited", icon: ShieldCheck },
    { value: languages, label: "Languages spoken", icon: Globe2 },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-lg border border-hero-tile-border bg-hero-tile px-3.5 py-3 backdrop-blur-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-hero-icon text-hero-text">
            <stat.icon className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <dd className="tabular text-xl font-semibold leading-tight text-hero-text">
              <AnimatedNumber value={stat.value} format={(n) => String(Math.round(n))} />
            </dd>
            <dt className="text-xs leading-tight text-hero-text-muted">{stat.label}</dt>
          </div>
        </div>
      ))}
    </dl>
  )
}
