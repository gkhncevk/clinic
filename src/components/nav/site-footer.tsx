import Link from "next/link"

const LINKS = [
  { href: "/clinics", label: "Clinics" },
  { href: "/ambassador", label: "Ambassador" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full flex-col gap-5 page-container px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-text-on-primary">
            Y
          </span>
          <div>
            <p className="text-sm font-semibold text-text">ynsocial</p>
            <p className="text-xs text-text-muted">Health tourism marketplace</p>
          </div>
        </div>

        <nav className="flex items-center gap-5" aria-label="Footer">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-text-muted">© {new Date().getFullYear()} ynsocial</p>
      </div>
    </footer>
  )
}
