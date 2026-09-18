"use client"

import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type FilterOption = {
  value: string
  label: string
  count: number
}

type FilterCheckboxGroupProps = {
  legend: string
  options: FilterOption[]
  selected: string[]
  onChange: (next: string[]) => void
  /** Show an inline search box once the option list passes this length. */
  searchThreshold?: number
  className?: string
}

export function FilterCheckboxGroup({
  legend,
  options,
  selected,
  onChange,
  searchThreshold = 8,
  className,
}: FilterCheckboxGroupProps) {
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    if (!query.trim()) return options
    const q = query.trim().toLowerCase()
    return options.filter((option) => option.label.toLowerCase().includes(q))
  }, [options, query])

  function toggle(value: string) {
    onChange(
      selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
    )
  }

  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="text-sm font-medium text-text">{legend}</legend>

      {options.length > searchThreshold ? (
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${legend.toLowerCase()}`}
            className="h-8 pl-8 text-sm"
            aria-label={`Search ${legend.toLowerCase()}`}
          />
        </div>
      ) : null}

      <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto pr-1">
        {visible.map((option) => {
          const disabled = option.count === 0 && !selected.includes(option.value)
          const id = `filter-${legend}-${option.value}`
          return (
            <Label
              key={option.value}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-sm font-normal text-text hover:bg-surface-2",
                disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
              )}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Checkbox
                  id={id}
                  checked={selected.includes(option.value)}
                  disabled={disabled}
                  onCheckedChange={() => toggle(option.value)}
                />
                <span className="truncate">{option.label}</span>
              </span>
              <span className="tabular shrink-0 text-xs text-text-muted">{option.count}</span>
            </Label>
          )
        })}
        {visible.length === 0 ? (
          <p className="px-2 py-3 text-sm text-text-muted">No matches.</p>
        ) : null}
      </div>
    </fieldset>
  )
}
