"use client"

import { useEffect, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: number
  format: (value: number) => string
  durationMs?: number
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Counts up to `value` once on mount — the brief's suggestion for panel
 * numbers ("bir kez, abartısız"). Skips straight to the final value under
 * prefers-reduced-motion, and if the value changes later (e.g. a filter
 * changes what's shown), it jumps rather than re-animating.
 */
export function AnimatedNumber({ value, format, durationMs = 700 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) {
      setDisplay(value)
      return
    }
    hasAnimated.current = true

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    let frame: number
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / durationMs)
      setDisplay(value * easeOutCubic(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    // Safety net: browsers may throttle rAF to near-zero for backgrounded
    // or unfocused tabs, which would otherwise leave the count stuck part
    // way through indefinitely. Force the final value once the duration
    // has elapsed regardless of how many rAF ticks actually ran.
    const settle = setTimeout(() => setDisplay(value), durationMs + 50)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <>{format(display)}</>
}
