import {
  AlertTriangle,
  Banknote,
  CheckCircle2,
  Clock,
  DoorOpen,
  Receipt,
  Smartphone,
  UserPlus,
  Wrench,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const outstandingInvoices = [
  { room: "A101", tenant: "สมหญิง ดีใจ", amount: "฿4,200", daysOverdue: 5 },
  { room: "A105", tenant: "นภา แสงดาว", amount: "฿4,500", daysOverdue: 2 },
  { room: "B208", tenant: "อนุชา ศรีสุข", amount: "฿3,700", daysOverdue: 9 },
]

function overdueSeverity(days: number) {
  return days > 5
    ? {
        level: "urgent" as const,
        icon: AlertTriangle,
        border: "border-l-rose-400/70",
        wash: "bg-rose-50/60 dark:bg-rose-500/[0.06]",
        avatar: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      }
    : {
        level: "mild" as const,
        icon: Clock,
        border: "border-l-amber-400/70",
        wash: "",
        avatar: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      }
}

export function OutstandingInvoicesCard() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm [--card-spacing:--spacing(5)]">
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <CardTitle>บิลค้างจ่ายล่าสุด</CardTitle>
          <CardDescription>ผู้เช่าที่ยังไม่ชำระค่าเช่าเดือนนี้</CardDescription>
        </div>
        <Badge className="gap-1 bg-rose-500/10 text-[11px] text-rose-600 dark:text-rose-400">
          {outstandingInvoices.length} รายการรอติดตาม
        </Badge>
      </CardHeader>
      <CardContent>
        <ul className="-mx-(--card-spacing) divide-y divide-border/60">
          {outstandingInvoices.map((inv) => {
            const severity = overdueSeverity(inv.daysOverdue)
            return (
              <li
                key={inv.room}
                className={cn(
                  "flex items-center gap-3 border-l-2 px-(--card-spacing) py-3.5",
                  severity.border,
                  severity.wash
                )}
              >
                <Avatar className="size-9">
                  <AvatarFallback className={severity.avatar}>
                    {inv.tenant.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">{inv.tenant}</span>
                  <span className="text-[13px] text-muted-foreground">ห้อง {inv.room}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold tabular-nums">{inv.amount}</span>
                  <Badge className={cn("gap-1 text-[11px]", severity.badge)}>
                    <severity.icon className="size-3" />
                    เกินกำหนด {inv.daysOverdue} วัน
                  </Badge>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

const maintenanceItems = [
  { room: "B208", issue: "ก๊อกน้ำรั่ว", status: "กำลังดำเนินการ", time: "2 ชม.ที่แล้ว" },
  { room: "A103", issue: "แอร์ไม่เย็น", status: "รอดำเนินการ", time: "1 วันที่แล้ว" },
]

const maintenanceStatusStyle: Record<string, string> = {
  กำลังดำเนินการ: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  รอดำเนินการ: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  เสร็จสิ้น: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

export function RecentMaintenanceCard() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm [--card-spacing:--spacing(5)]">
      <CardHeader>
        <CardTitle>งานซ่อมล่าสุด</CardTitle>
        <CardDescription>รายการแจ้งซ่อมที่ยังไม่ปิดงาน</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="-mx-(--card-spacing) divide-y divide-border/60">
          {maintenanceItems.map((item) => (
            <li
              key={`${item.room}-${item.issue}`}
              className="flex items-center gap-3 px-(--card-spacing) py-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Wrench className="size-4" />
              </span>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{item.issue}</span>
                <span className="text-[13px] text-muted-foreground">
                  ห้อง {item.room} • {item.time}
                </span>
              </div>
              <Badge variant="secondary" className={cn("text-[11px]", maintenanceStatusStyle[item.status])}>
                {item.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const recentPayments = [
  { tenant: "วิชัย ทองคำ", room: "B203", amount: "฿3,800", method: "โอนธนาคาร", icon: Banknote, date: "3 ก.ค. 2569" },
  { tenant: "ประเสริฐ มั่นคง", room: "C302", amount: "฿3,950", method: "พร้อมเพย์", icon: Smartphone, date: "2 ก.ค. 2569" },
]

export function RecentPaymentsCard() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm [--card-spacing:--spacing(5)]">
      <CardHeader>
        <CardTitle>การชำระเงินล่าสุด</CardTitle>
        <CardDescription>รายการชำระเงินที่บันทึกล่าสุด</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="-mx-(--card-spacing) divide-y divide-border/60">
          {recentPayments.map((p) => (
            <li key={p.tenant} className="flex items-center gap-3 px-(--card-spacing) py-3.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <p.icon className="size-4" />
              </span>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{p.tenant}</span>
                <span className="text-[13px] text-muted-foreground">
                  ห้อง {p.room} • {p.method}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold tabular-nums">{p.amount}</span>
                <span className="text-[13px] text-muted-foreground">{p.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

const activity = [
  { icon: Receipt, text: "สร้างบิลใหม่สำหรับห้อง A101", time: "5 นาทีที่แล้ว" },
  { icon: UserPlus, text: "เพิ่มผู้เช่าใหม่: กมลชนก ศรีวงศ์", time: "1 ชม.ที่แล้ว" },
  { icon: CheckCircle2, text: "ปิดงานซ่อมห้อง C105 เรียบร้อย", time: "3 ชม.ที่แล้ว" },
  { icon: DoorOpen, text: "อัปเดตสถานะห้อง B112 เป็นว่าง", time: "เมื่อวาน" },
]

export function RecentActivityCard() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm [--card-spacing:--spacing(5)]">
      <CardHeader>
        <CardTitle>กิจกรรมล่าสุด</CardTitle>
        <CardDescription>ความเคลื่อนไหวล่าสุดในระบบ</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {activity.map((a) => (
            <li key={a.text} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <a.icon className="size-3.5" />
              </span>
              <div className="flex flex-col pb-0.5">
                <span className="text-sm">{a.text}</span>
                <span className="text-[13px] text-muted-foreground">{a.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
