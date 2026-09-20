"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function pageWindow(page: number, totalPages: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const result: (number | "ellipsis")[] = []
  let previous = 0
  for (const p of sorted) {
    if (previous && p - previous > 1) result.push("ellipsis")
    result.push(p)
    previous = p
  }
  return result
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pageWindow(page, totalPages).map((entry, index) =>
        entry === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-1.5 text-sm text-text-muted">
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            aria-current={entry === page ? "page" : undefined}
            onClick={() => onChange(entry)}
            className={cn(
              "tabular flex size-11 items-center justify-center rounded-md text-sm font-medium transition-transform duration-150 active:scale-90 sm:size-8",
              entry === page
                ? "bg-primary text-text-on-primary"
                : "text-text hover:bg-surface-2"
            )}
          >
            {entry}
          </button>
        )
      )}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  )
}
