"use client"

import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { formatPence } from "@/lib/money"

type PriceRangeFilterProps = {
  bounds: { min: number; max: number }
  value: { min: number | null; max: number | null }
  onChange: (next: { min: number | null; max: number | null }) => void
}

export function PriceRangeFilter({ bounds, value, onChange }: PriceRangeFilterProps) {
  const [local, setLocal] = useState<[number, number]>([
    value.min ?? bounds.min,
    value.max ?? bounds.max,
  ])

  useEffect(() => {
    setLocal([value.min ?? bounds.min, value.max ?? bounds.max])
  }, [value.min, value.max, bounds.min, bounds.max])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm tabular text-text">
        <span>{formatPence(local[0])}</span>
        <span>{formatPence(local[1])}</span>
      </div>
      <Slider
        min={bounds.min}
        max={bounds.max}
        step={1000}
        value={local}
        onValueChange={(next) => setLocal(next as [number, number])}
        onValueCommit={(next) => {
          const [min, max] = next as [number, number]
          onChange({
            min: min <= bounds.min ? null : min,
            max: max >= bounds.max ? null : max,
          })
        }}
        aria-label="Price range"
      />
    </div>
  )
}
