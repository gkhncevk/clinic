import { identityColorStyle } from "@/lib/deterministic-color"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"

type IdentityAvatarProps = {
  seed: string
  name: string
  shape?: "circle" | "rounded"
  className?: string
}

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
