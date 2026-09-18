import { Skeleton } from "@/components/ui/skeleton"

export default function AmbassadorLoading() {
  return (
    <main className="mx-auto flex w-full page-container flex-col gap-6 px-4 py-6 sm:px-5 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-36" />
          </div>
        </div>
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-20 rounded-lg" />
      <Skeleton className="h-72 rounded-lg" />
      <Skeleton className="h-96 rounded-lg" />
    </main>
  )
}
