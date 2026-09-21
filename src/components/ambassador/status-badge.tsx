import {
  AlertTriangle,
  Ban,
  CalendarCheck,
  CheckCircle2,
  CircleDot,
  Clock4,
  MessageCircle,
  PiggyBank,
  Stethoscope,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReferralStatus } from "@/types/ambassador"

const STATUS_CONFIG: Record<
  ReferralStatus,
  { label: string; icon: LucideIcon; className: string }
> = {
  new: {
    label: "New",
    icon: CircleDot,
    className: "bg-surface-2 text-text-muted",
  },
  contacted: {
    label: "Contacted",
    icon: MessageCircle,
    className: "bg-surface-2 text-primary",
  },
  booked: {
    label: "Booked",
    icon: CalendarCheck,
    className: "bg-surface-2 text-primary",
  },
  qualified: {
    label: "Qualified",
    icon: CheckCircle2,
    className: "bg-success-bg text-success",
  },
  treated: {
    label: "Treated",
    icon: Stethoscope,
    className: "bg-success-bg text-success",
  },
  settled: {
    label: "Settled",
    icon: PiggyBank,
    className: "bg-success text-white",
  },
  disqualified: {
    label: "Disqualified",
    icon: XCircle,
    className: "bg-danger-bg text-danger",
  },
  cancelled: {
    label: "Cancelled",
    icon: Ban,
    className: "border border-border-strong text-text-muted",
  },
  disputed: {
    label: "Disputed",
    icon: AlertTriangle,
    className: "bg-warning-bg text-warning",
  },
  expired: {
    label: "Expired",
    icon: Clock4,
    className: "text-text-muted opacity-70",
  },
}

export function StatusBadge({ status }: { status: ReferralStatus }) {
  const { label, icon: Icon, className } = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        className
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {label}
    </span>
  )
}
