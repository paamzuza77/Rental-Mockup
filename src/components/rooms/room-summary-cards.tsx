import type { LucideIcon } from "lucide-react"
import { CheckCircle2, DoorOpen, Sparkles, Users, Wallet, Wrench } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { rooms } from "@/lib/mock-rooms"

type SummaryTone = "indigo" | "emerald" | "rose" | "amber" | "sky"

const toneStyles: Record<SummaryTone, string> = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
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
    label: "ห้องทั้งหมด",
    icon: DoorOpen,
    tone: "indigo",
    count: rooms.length,
  },
  {
    key: "vacant",
    label: "ห้องว่าง",
    icon: CheckCircle2,
    tone: "emerald",
    count: rooms.filter((r) => r.status === "vacant").length,
  },
  {
    key: "occupied",
    label: "มีผู้เช่า",
    icon: Users,
    tone: "indigo",
    count: rooms.filter((r) => r.status === "occupied").length,
  },
  {
    key: "overdue",
    label: "ค้างชำระ",
    icon: Wallet,
    tone: "rose",
    count: rooms.filter((r) => r.status === "overdue").length,
  },
  {
    key: "maintenance",
    label: "ปิดซ่อม",
    icon: Wrench,
    tone: "amber",
    count: rooms.filter((r) => r.status === "maintenance").length,
  },
  {
    key: "cleaning",
    label: "รอทำความสะอาด",
    icon: Sparkles,
    tone: "sky",
    count: rooms.filter((r) => r.status === "cleaning").length,
  },
]

export function RoomSummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
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
