"use client"

import { LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ClinicViewMode } from "@/types/clinic"

export function ViewToggle({
  value,
  onChange,
}: {
  value: ClinicViewMode
  onChange: (value: ClinicViewMode) => void
}) {
  return (
    <div
      role="group"
      aria-label="Result layout"
      className="inline-flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5"
    >
      {(
        [
          { mode: "grid" as const, icon: LayoutGrid, label: "Grid view" },
          { mode: "list" as const, icon: List, label: "List view" },
        ]
      ).map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          type="button"
          aria-label={label}
          aria-pressed={value === mode}
          onClick={() => onChange(mode)}
          className={cn(
            "flex size-8 items-center justify-center rounded transition-colors duration-150",
            value === mode
              ? "bg-primary text-text-on-primary"
              : "text-text-muted hover:bg-surface-2 hover:text-text"
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
