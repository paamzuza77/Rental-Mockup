import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type StatTrend = {
  direction: "up" | "down" | "flat"
  label: string
}

export type StatTone = "default" | "indigo" | "amber" | "rose" | "emerald"

export type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
  helper?: string
  trend?: StatTrend
  tone?: StatTone
}

const toneStyles: Record<StatTone, string> = {
  default: "bg-muted text-muted-foreground",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

const trendStyles: Record<StatTrend["direction"], string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  flat: "text-muted-foreground",
}

const trendIcons: Record<StatTrend["direction"], LucideIcon> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
}

export function StatCard({ icon: Icon, label, value, helper, trend, tone = "default" }: StatCardProps) {
  const TrendIcon = trend ? trendIcons[trend.direction] : null

  return (
    <Card className="rounded-2xl border-border/60 shadow-sm transition-shadow hover:shadow-md [--card-spacing:--spacing(5)]">
      <CardContent className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <span className={cn("flex size-9 items-center justify-center rounded-xl", toneStyles[tone])}>
            <Icon className="size-4" />
          </span>
          {trend && TrendIcon && (
            <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendStyles[trend.direction])}>
              <TrendIcon className="size-3.5" />
              {trend.label}
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {helper && <p className="text-[13px] text-muted-foreground">{helper}</p>}
      </CardContent>
    </Card>
  )
}
