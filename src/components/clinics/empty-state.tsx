import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  query?: string
  onClearFilters: () => void
}

export function EmptyState({ query, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
      <SearchX className="size-8 text-text-muted" aria-hidden="true" />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-text">
          {query ? `No clinics found for "${query}"` : "No clinics match these filters"}
        </p>
        <p className="mx-auto max-w-sm text-sm text-text-muted">
          Try widening your price range, removing a language or verification
          filter, or clearing everything to see the full list again.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onClearFilters}>
        Clear all filters
      </Button>
    </div>
  )
}
