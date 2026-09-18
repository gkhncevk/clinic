import type { Metadata } from "next"
import { ClinicsExplorer } from "@/components/clinics/clinics-explorer"
import { TrustStats } from "@/components/clinics/trust-stats"
import { getClinics } from "@/data/get-clinics"

export const metadata: Metadata = {
  title: "Verified clinics in Turkey | ynsocial",
  description:
    "Browse dental, hair transplant and aesthetic clinics in Turkey, filtered by city, verification level, language and price.",
}

// Force per-request rendering so the mock network delay (and the loading
// skeleton it exists to demonstrate) actually happens on every visit —
// otherwise Next would statically render this once at build time.
export const dynamic = "force-dynamic"

export default async function ClinicsPage() {
  const clinics = await getClinics()

  return (
    <main className="flex w-full flex-col">
      <div className="hero-panel border-b border-border">
        <div className="mx-auto flex w-full page-container flex-col gap-6 px-4 py-10 sm:px-5 lg:px-8">
          <div className="max-w-2xl space-y-2">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-text sm:text-5xl">
              Find a verified clinic in Turkey
            </h1>
            <p className="text-lg text-text-muted">
              Every clinic on ynsocial is either document-verified or visited
              on-site. Filter by city, treatment and language to compare
              options before you talk to anyone.
            </p>
          </div>

          <TrustStats clinics={clinics} />
        </div>
      </div>

      <div className="mx-auto flex w-full page-container flex-col gap-8 px-4 py-8 sm:px-5 lg:px-8">
        <ClinicsExplorer allClinics={clinics} />
      </div>
    </main>
  )
}
