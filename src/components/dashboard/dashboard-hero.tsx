"use client"

import {
  Building2,
  CalendarClock,
  ChevronDown,
  DoorOpen,
  ReceiptText,
  UserPlus,
  Wallet,
  Wrench,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const quickActions = [
  { label: "เพิ่มห้องพัก", icon: DoorOpen, variant: "default" as const },
  { label: "เพิ่มผู้เช่า", icon: UserPlus, variant: "secondary" as const },
  { label: "สร้างบิล", icon: ReceiptText, variant: "secondary" as const },
  { label: "บันทึกการชำระเงิน", icon: Wallet, variant: "secondary" as const },
]

const todaySummary = [
  {
    icon: ReceiptText,
    label: "บิลครบกำหนดวันนี้",
    value: "2 รายการ",
    tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Wrench,
    label: "งานซ่อมใหม่วันนี้",
    value: "1 รายการ",
    tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Wallet,
    label: "รับชำระวันนี้",
    value: "฿3,800",
    tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
]

export function DashboardHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm dark:from-indigo-950/40 dark:via-background dark:to-violet-950/20 md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/10"
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
              <Building2 className="size-3.5" />
              ภาพรวมหอพัก
            </span>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              ภาพรวมหอพัก
            </h1>
            <p className="text-sm text-muted-foreground">
              สวัสดีคุณสมชาย นี่คือสรุปข้อมูลสำคัญของหอพักในเดือนนี้
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" className="gap-2 rounded-xl bg-background/80" />}
                >
                  <Building2 className="size-4 text-muted-foreground" />
                  หอพักสุขสันต์ อพาร์ทเมนท์
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>หอพักสุขสันต์ อพาร์ทเมนท์</DropdownMenuItem>
                  <DropdownMenuItem disabled>+ เพิ่มทรัพย์สิน (เร็วๆ นี้)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" className="gap-2 rounded-xl bg-background/80" />}
                >
                  กรกฎาคม 2569
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>กรกฎาคม 2569</DropdownMenuItem>
                  <DropdownMenuItem>มิถุนายน 2569</DropdownMenuItem>
                  <DropdownMenuItem>พฤษภาคม 2569</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl border border-border/60 bg-background/70 p-5 backdrop-blur-sm md:w-[300px]">
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <CalendarClock className="size-4 text-indigo-600 dark:text-indigo-400" />
                สิ่งที่ต้องติดตามวันนี้
              </span>
              <span className="text-[13px] text-muted-foreground">5 กรกฎาคม 2569</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {todaySummary.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-md", item.tone)}>
                    <item.icon className="size-3.5" />
                  </span>
                  <span className="flex-1 text-[13px] text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold tabular-nums">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button key={action.label} variant={action.variant} className="gap-1.5 rounded-xl">
              <action.icon className="size-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
