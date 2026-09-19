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
    <header className="sticky top-0 z-40 border-b border-border bg-surface-2">
      <div className="mx-auto flex h-14 w-full page-container items-center justify-between px-4 sm:px-5 lg:px-8">
        <Link href="/clinics" className="text-sm font-semibold tracking-tight text-text">
          ynsocial
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary">
          {LINKS.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                  active ? "bg-bg text-text shadow-sm" : "text-text-muted hover:text-text"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
