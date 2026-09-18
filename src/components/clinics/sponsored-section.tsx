import { ClinicCard } from "@/components/clinics/clinic-card"
import type { Clinic, ClinicViewMode } from "@/types/clinic"

export function SponsoredSection({
  clinics,
  view,
}: {
  clinics: Clinic[]
  view: ClinicViewMode
}) {
  if (clinics.length === 0) return null

  return (
    <section aria-labelledby="sponsored-heading" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h2 id="sponsored-heading" className="text-sm font-medium text-text-muted">
          Sponsored
        </h2>
        <div className="h-px flex-1 bg-border" aria-hidden="true" />
      </div>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4"
        }
      >
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} variant={view} />
        ))}
      </div>
    </section>
  )
}
