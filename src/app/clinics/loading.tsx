import { ClinicCardSkeleton } from "@/components/clinics/clinic-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClinicsLoading() {
  return (
    <div className="mx-auto flex w-full page-container flex-col gap-8 px-4 py-8 sm:px-5 lg:px-8">
      <div className="space-y-3">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:max-w-sm" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ClinicCardSkeleton key={index} variant="grid" />
        ))}
      </div>
    </div>
  )
}
