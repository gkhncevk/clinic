import type { Clinic } from "@/types/clinic"

/** A small strip of real, computed numbers — not decoration, not invented
 *  stats (the platform explicitly has none). Gives the hero some weight
 *  without borrowing a rating system it doesn't have. */
export function TrustStats({ clinics }: { clinics: Clinic[] }) {
  const cities = new Set(clinics.map((c) => c.city)).size
  const languages = new Set(clinics.flatMap((c) => c.languages)).size
  const siteVisited = clinics.filter((c) => c.verificationLevel === "site_visited").length

  const stats = [
    { value: clinics.length, label: "Verified clinics" },
    { value: cities, label: "Cities" },
    { value: siteVisited, label: "Site-visited" },
    { value: languages, label: "Languages spoken" },
  ]

  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-3 divide-x divide-border">
      {stats.map((stat) => (
        <div key={stat.label} className="pl-8 first:pl-0">
          <dt className="text-sm text-text-muted">{stat.label}</dt>
          <dd className="tabular text-2xl font-semibold tracking-tight text-text">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
