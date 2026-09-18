import { identityColorStyle } from "@/lib/deterministic-color"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"

type IdentityAvatarProps = {
  seed: string
  name: string
  shape?: "circle" | "rounded"
  className?: string
}

/**
 * Deterministic initials badge used wherever a logo/cover/avatar file is
 * missing (every clinic and the ambassador profile — the mock data ships
 * URLs but no actual files). Same seed always renders the same swatch.
 */
export function IdentityAvatar({ seed, name, shape = "circle", className }: IdentityAvatarProps) {
  return (
    <div
      aria-hidden="true"
      style={identityColorStyle(seed)}
      className={cn(
        "identity-swatch flex shrink-0 items-center justify-center font-semibold",
        shape === "circle" ? "rounded-full" : "rounded-md",
        className
      )}
    >
      {initials(name)}
    </div>
  )
}
