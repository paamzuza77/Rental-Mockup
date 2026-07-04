import {
  LayoutDashboard,
  DoorOpen,
  Users,
  FileText,
  Receipt,
  Wallet,
  Gauge,
  Wrench,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react"

export const navGroups = [
  "ภาพรวม",
  "การจัดการ",
  "การเงิน",
  "งานและรายงาน",
  "ระบบ",
] as const

export type NavGroup = (typeof navGroups)[number]

export type NavItem = {
  href: string
  labelTh: string
  labelEn: string
  icon: LucideIcon
  group: NavGroup
}

export const navItems: NavItem[] = [
  { href: "/", labelTh: "หน้าแรก", labelEn: "Dashboard", icon: LayoutDashboard, group: "ภาพรวม" },
  { href: "/rooms", labelTh: "ห้องพัก", labelEn: "Rooms", icon: DoorOpen, group: "การจัดการ" },
  { href: "/tenants", labelTh: "ผู้เช่า", labelEn: "Tenants", icon: Users, group: "การจัดการ" },
  { href: "/leases", labelTh: "สัญญาเช่า", labelEn: "Leases", icon: FileText, group: "การจัดการ" },
  { href: "/invoices", labelTh: "บิลค่าเช่า", labelEn: "Invoices", icon: Receipt, group: "การเงิน" },
  { href: "/payments", labelTh: "การชำระเงิน", labelEn: "Payments", icon: Wallet, group: "การเงิน" },
  { href: "/meter-readings", labelTh: "ค่าน้ำค่าไฟ", labelEn: "Meter Readings", icon: Gauge, group: "การเงิน" },
  { href: "/maintenance", labelTh: "งานซ่อม", labelEn: "Maintenance", icon: Wrench, group: "งานและรายงาน" },
  { href: "/reports", labelTh: "รายงาน", labelEn: "Reports", icon: BarChart3, group: "งานและรายงาน" },
  { href: "/settings", labelTh: "ตั้งค่า", labelEn: "Settings", icon: Settings, group: "ระบบ" },
]
