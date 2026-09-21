import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { ClinicViewMode } from "@/types/clinic"

export function ClinicCardSkeleton({ variant }: { variant: ClinicViewMode }) {
  return (
    <div
      className={cn(
        "flex h-full overflow-hidden rounded-lg border border-border bg-surface",
        variant === "grid" ? "flex-col" : "flex-col sm:flex-row"
      )}
    >
      <Skeleton
        className={cn(
          "shrink-0 rounded-none",
          variant === "grid" ? "aspect-[16/9] w-full" : "aspect-[16/9] w-full sm:aspect-auto sm:w-48"
        )}
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mt-auto border-t border-border pt-3">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    </div>
  )
}
