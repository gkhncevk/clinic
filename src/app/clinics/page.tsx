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

export const dynamic = "force-dynamic"

export default async function ClinicsPage() {
  const clinics = await getClinics()

  return (
    <main className="flex w-full flex-col">
      <div className="hero-panel relative overflow-hidden">
        {/* Photo bleeds to the true edge of the section on desktop — a
            floating rounded card here read as a widget, not a photo.
            Sized off the viewport (not the 1440px content container) so
            it keeps reaching the real edge on ultra-wide screens too. */}
        <div className="absolute inset-y-0 right-0 hidden w-[46vw] lg:block">
          <Image
            src="/images/hero-clinics.jpg"
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover"
          />
          <div className="hero-photo-fade absolute inset-y-0 left-0 w-24" aria-hidden="true" />
        </div>

        {/* The text column reserves space matching the photo's own width
            (not a fixed max-width) — at wide viewports a fixed cap here
            was squeezing the 4-tile stat grid into ~450px and forcing
            every label to wrap onto two lines. */}
        <div className="relative mx-auto w-full page-container px-4 pb-8 pt-12 sm:px-5 sm:pb-10 lg:py-20 lg:pl-8 lg:pr-[48vw]">
          <div className="flex flex-col gap-6">
            <div className="max-w-xl space-y-3">
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
