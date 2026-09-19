"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "/clinics", label: "Clinics" },
  { href: "/ambassador", label: "Ambassador" },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-14 w-full page-container items-center justify-between px-4 sm:px-5 lg:px-8">
        <Link href="/clinics" className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-text-on-primary">
            Y
          </span>
          <span className="text-sm font-semibold tracking-tight text-text">ynsocial</span>
        </Link>

        <nav className="flex h-14 items-center gap-1" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full items-center border-b-2 px-3 text-sm font-medium transition-colors duration-150",
                  active
                    ? "border-primary text-text"
                    : "border-transparent text-text-muted hover:text-text"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pl-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
