"use client"

import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type FilterPopoverButtonProps = {
  label: string
  activeCount: number
  children: ReactNode
  align?: "start" | "center" | "end"
}

export function FilterPopoverButton({
  label,
  activeCount,
  children,
  align = "start",
}: FilterPopoverButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 gap-1.5 rounded-md border-border bg-surface text-sm font-normal text-text",
            activeCount > 0 && "border-primary/40 bg-surface-2 font-medium"
          )}
        >
          {label}
          {activeCount > 0 ? (
            <span className="tabular flex size-5 items-center justify-center rounded-full bg-primary text-2xs font-semibold text-text-on-primary">
              {activeCount}
            </span>
          ) : null}
          <ChevronDown className="size-3.5 text-text-muted" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-72 p-3">
        {children}
      </PopoverContent>
    </Popover>
  )
}
