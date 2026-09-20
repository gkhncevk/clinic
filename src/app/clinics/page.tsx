import type { Metadata } from "next"
import Image from "next/image"
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
      <div className="hero-panel relative overflow-hidden">
        {/* Photo bleeds to the true edge of the section on desktop — a
            floating rounded card here read as a widget, not a photo. */}
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          <Image
            src="/images/hero-clinics.jpg"
            alt=""
            fill
            priority
            sizes="42vw"
            className="object-cover"
          />
          <div className="hero-photo-fade absolute inset-y-0 left-0 w-24" aria-hidden="true" />
        </div>

        <div className="relative mx-auto w-full page-container px-4 pb-8 pt-12 sm:px-5 sm:pb-10 lg:px-8 lg:py-20">
          <div className="flex max-w-xl flex-col gap-6 lg:max-w-md">
            <div className="space-y-3">
              <h1 className="font-serif text-4xl font-medium tracking-tight text-hero-text sm:text-5xl">
                Find a <em className="font-serif italic text-hero-text">verified</em> clinic in
                Turkey
              </h1>
              <p className="text-lg text-hero-text-muted">
                Every clinic on ynsocial is either document-verified or visited
                on-site. Filter by city, treatment and language to compare
                options before you talk to anyone.
              </p>
            </div>

            <TrustStats clinics={clinics} />
          </div>
        </div>

        {/* Mobile: the photo becomes a full-bleed strip below the copy
            instead of disappearing. It's a direct child of the (unpadded)
            hero-panel, so it already spans edge to edge with no margin
            tricks — the padding lives on the copy container above it. */}
        <div className="relative aspect-[16/10] w-full lg:hidden">
          <Image
            src="/images/hero-clinics.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto flex w-full page-container flex-col gap-8 px-4 py-8 sm:px-5 lg:px-8">
        <ClinicsExplorer allClinics={clinics} />
      </div>
    </main>
  )
}
