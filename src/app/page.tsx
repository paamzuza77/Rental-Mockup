import { CheckCircle2, DoorOpen, TrendingDown, TrendingUp, Users, Wallet, Wrench } from "lucide-react"

import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { StatCard, type StatCardProps } from "@/components/dashboard/stat-card"
import { RoomStatusOverview } from "@/components/dashboard/room-status-overview"
import {
  OutstandingInvoicesCard,
  RecentActivityCard,
  RecentMaintenanceCard,
  RecentPaymentsCard,
} from "@/components/dashboard/dashboard-widgets"

const roomStats: StatCardProps[] = [
  {
    icon: DoorOpen,
    label: "ห้องทั้งหมด",
    value: "20 ห้อง",
    helper: "กระจาย 4 ชั้น",
    tone: "indigo",
  },
  {
    icon: CheckCircle2,
    label: "ห้องว่าง",
    value: "2 ห้อง",
    helper: "พร้อมให้เช่าได้ทันที",
    tone: "emerald",
  },
  {
    icon: Users,
    label: "ห้องมีผู้เช่า",
    value: "18 ห้อง",
    helper: "สัญญาเช่าที่ใช้งานอยู่",
    tone: "indigo",
  },
  {
    icon: TrendingUp,
    label: "อัตราเข้าพัก",
    value: "90%",
    helper: "เทียบกับเดือนก่อน",
    trend: { direction: "up", label: "+5%" },
    tone: "indigo",
  },
]

const financeStats: StatCardProps[] = [
  {
    icon: Wallet,
    label: "ยอดค้างชำระ",
    value: "฿12,400",
    helper: "3 บิลยังไม่ชำระ",
    trend: { direction: "down", label: "-2 บิล" },
    tone: "rose",
  },
  {
    icon: TrendingUp,
    label: "รายรับเดือนนี้",
    value: "฿86,200",
    helper: "รวมค่าเช่า+ค่าน้ำค่าไฟ",
    trend: { direction: "up", label: "+8%" },
    tone: "emerald",
  },
  {
    icon: TrendingDown,
    label: "รายจ่ายเดือนนี้",
    value: "฿15,300",
    helper: "ค่าซ่อมบำรุง+ส่วนกลาง",
    trend: { direction: "down", label: "-3%" },
    tone: "amber",
  },
  {
    icon: Wrench,
    label: "งานซ่อมค้าง",
    value: "2 รายการ",
    helper: "1 กำลังดำเนินการ",
    tone: "amber",
  },
]

function StatSection({ title, cards }: { title: string; cards: StatCardProps[] }) {
  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-7 md:gap-8">
      <DashboardHero />

      <StatSection title="ภาพรวมห้องพัก" cards={roomStats} />
      <StatSection title="การเงินและงานซ่อม" cards={financeStats} />

      <div className="grid gap-7 lg:grid-cols-3">
        <div className="flex flex-col gap-7 lg:col-span-2">
          <OutstandingInvoicesCard />
          <RecentMaintenanceCard />
        </div>
        <div className="flex flex-col gap-7">
          <RoomStatusOverview />
          <RecentPaymentsCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  )
}
