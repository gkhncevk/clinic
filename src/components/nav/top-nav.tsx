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
    <header className="sticky top-0 z-40 bg-nav-bg">
      <div className="mx-auto flex h-14 w-full page-container items-center justify-between px-4 sm:px-5 lg:px-8">
        <Link
          href="/clinics"
          className="nav-focusable rounded-sm text-sm font-semibold tracking-tight text-nav-text"
        >
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
                  "nav-focusable rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                  active ? "bg-nav-active text-nav-text" : "text-nav-text-muted hover:text-nav-text"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle className="nav-focusable text-nav-text-muted hover:bg-nav-active hover:text-nav-text dark:hover:bg-nav-active" />
        </nav>
      </div>
    </header>
  )
}
