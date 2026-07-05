import type { LucideIcon } from "lucide-react"
import { CalendarClock, DoorOpen, Users, Wallet } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { tenants } from "@/lib/mock-tenants"

type SummaryTone = "indigo" | "rose" | "amber" | "violet" | "slate"

const toneStyles: Record<SummaryTone, string> = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  slate: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
}

const summaries: {
  key: string
  label: string
  icon: LucideIcon
  tone: SummaryTone
  count: number
}[] = [
  {
    key: "total",
    label: "ผู้เช่าทั้งหมด",
    icon: Users,
    tone: "indigo",
    count: tenants.length,
  },
  {
    key: "active",
    label: "กำลังเช่าอยู่",
    icon: Users,
    tone: "indigo",
    count: tenants.filter((t) => t.status === "active").length,
  },
  {
    key: "ending-soon",
    label: "ใกล้หมดสัญญา",
    icon: CalendarClock,
    tone: "amber",
    count: tenants.filter((t) => t.status === "ending-soon").length,
  },
  {
    key: "overdue",
    label: "ค้างชำระ",
    icon: Wallet,
    tone: "rose",
    count: tenants.filter((t) => t.status === "overdue").length,
  },
  {
    key: "pending-move-in",
    label: "รอย้ายเข้า",
    icon: DoorOpen,
    tone: "violet",
    count: tenants.filter((t) => t.status === "pending-move-in").length,
  },
]

export function TenantSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
      {summaries.map((s) => (
        <Card
          key={s.key}
          size="sm"
          className="rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md"
        >
          <CardContent className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl",
                toneStyles[s.tone]
              )}
            >
              <s.icon className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tabular-nums leading-tight">
                {s.count}
              </span>
              <span className="text-[13px] leading-tight text-muted-foreground">
                {s.label}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
