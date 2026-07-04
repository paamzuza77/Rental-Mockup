import {
  Ban,
  CheckCircle2,
  DoorOpen,
  Sparkles,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react"

export type RoomStatus =
  | "vacant"
  | "occupied"
  | "overdue"
  | "maintenance"
  | "cleaning"
  | "reserved"
  | "disabled"

export type RoomType =
  | "ห้องแอร์"
  | "ห้องพัดลม"
  | "ห้องสตูดิโอ"
  | "ห้องมุม"
  | "ห้องพร้อมเฟอร์นิเจอร์"

export const roomTypes: RoomType[] = [
  "ห้องแอร์",
  "ห้องพัดลม",
  "ห้องสตูดิโอ",
  "ห้องมุม",
  "ห้องพร้อมเฟอร์นิเจอร์",
]

export type LastPaymentStatus = "paid" | "pending" | "overdue" | "none"

export type MeterReading = {
  previous: number
  current: number
  unit: string
  readAt: string
}

export type InvoiceSummary = {
  period: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

export type MaintenanceNote = {
  id: string
  issue: string
  status: string
  date: string
}

export type Room = {
  id: string
  roomNumber: string
  floor: number
  type: RoomType
  status: RoomStatus
  tenant?: string
  tenantPhone?: string
  moveInDate?: string
  rent: number
  deposit: number
  outstanding?: number
  lastPayment: {
    status: LastPaymentStatus
    label: string
  }
  waterMeter: MeterReading
  electricMeter: MeterReading
  recentInvoice?: InvoiceSummary
  maintenanceNotes: MaintenanceNote[]
  note?: string
}

export const roomStatusConfig: Record<
  RoomStatus,
  {
    label: string
    icon: LucideIcon
    badge: string
    dot: string
    wash: string
    border: string
  }
> = {
  vacant: {
    label: "ว่าง",
    icon: CheckCircle2,
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    wash: "bg-emerald-50/50 dark:bg-emerald-500/[0.04]",
    border: "border-l-emerald-400/70",
  },
  occupied: {
    label: "มีผู้เช่า",
    icon: Users,
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
    wash: "",
    border: "border-l-indigo-400/70",
  },
  overdue: {
    label: "ค้างชำระ",
    icon: Wallet,
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
    wash: "bg-rose-50/60 dark:bg-rose-500/[0.06]",
    border: "border-l-rose-400/70",
  },
  maintenance: {
    label: "ปิดซ่อม",
    icon: Wrench,
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    wash: "bg-amber-50/50 dark:bg-amber-500/[0.04]",
    border: "border-l-amber-400/70",
  },
  cleaning: {
    label: "รอทำความสะอาด",
    icon: Sparkles,
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    wash: "bg-sky-50/50 dark:bg-sky-500/[0.04]",
    border: "border-l-sky-400/70",
  },
  reserved: {
    label: "จองแล้ว",
    icon: DoorOpen,
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    wash: "bg-violet-50/50 dark:bg-violet-500/[0.04]",
    border: "border-l-violet-400/70",
  },
  disabled: {
    label: "ปิดใช้งาน",
    icon: Ban,
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    dot: "bg-slate-400",
    wash: "bg-slate-50/50 dark:bg-slate-500/[0.04]",
    border: "border-l-slate-400/70",
  },
}

export const lastPaymentLabelStyle: Record<LastPaymentStatus, string> = {
  paid: "text-emerald-600 dark:text-emerald-400",
  pending: "text-muted-foreground",
  overdue: "text-rose-600 dark:text-rose-400",
  none: "text-muted-foreground",
}

export const invoiceStatusStyle: Record<InvoiceSummary["status"], string> = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  overdue: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

export const invoiceStatusLabel: Record<InvoiceSummary["status"], string> = {
  paid: "ชำระแล้ว",
  pending: "รอชำระ",
  overdue: "เกินกำหนด",
}

export const rooms: Room[] = [
  {
    id: "a101",
    roomNumber: "A101",
    floor: 1,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "สมหญิง ดีใจ",
    tenantPhone: "081-234-5678",
    moveInDate: "15 มี.ค. 2568",
    rent: 4200,
    deposit: 4200,
    lastPayment: { status: "paid", label: "ชำระแล้ว 1 ก.ค. 2569" },
    waterMeter: { previous: 120, current: 128, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 420, current: 505, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4950, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "a102",
    roomNumber: "A102",
    floor: 1,
    type: "ห้องพัดลม",
    status: "vacant",
    rent: 3200,
    deposit: 3200,
    lastPayment: { status: "none", label: "ไม่มีผู้เช่า" },
    waterMeter: { previous: 80, current: 80, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 150, current: 150, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [],
  },
  {
    id: "a103",
    roomNumber: "A103",
    floor: 1,
    type: "ห้องแอร์",
    status: "overdue",
    tenant: "อนุชา ศรีสุข",
    tenantPhone: "082-345-6789",
    moveInDate: "1 ส.ค. 2567",
    rent: 3700,
    deposit: 3700,
    outstanding: 3700,
    lastPayment: { status: "overdue", label: "เกินกำหนด 9 วัน" },
    waterMeter: { previous: 95, current: 110, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 300, current: 410, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 3700, status: "overdue" },
    maintenanceNotes: [],
  },
  {
    id: "a104",
    roomNumber: "A104",
    floor: 1,
    type: "ห้องพร้อมเฟอร์นิเจอร์",
    status: "occupied",
    tenant: "กมลชนก ศรีวงศ์",
    tenantPhone: "083-456-7890",
    moveInDate: "10 ม.ค. 2569",
    rent: 4000,
    deposit: 8000,
    lastPayment: { status: "paid", label: "ชำระแล้ว 2 ก.ค. 2569" },
    waterMeter: { previous: 140, current: 150, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 500, current: 580, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4750, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "a105",
    roomNumber: "A105",
    floor: 1,
    type: "ห้องพัดลม",
    status: "cleaning",
    rent: 3200,
    deposit: 3200,
    lastPayment: { status: "none", label: "ย้ายออกแล้ว" },
    waterMeter: { previous: 60, current: 60, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 100, current: 100, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [],
    note: "ทำความสะอาดหลังผู้เช่าย้ายออก",
  },
  {
    id: "a201",
    roomNumber: "A201",
    floor: 2,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "วิชัย ทองคำ",
    tenantPhone: "084-567-8901",
    moveInDate: "5 พ.ย. 2567",
    rent: 3800,
    deposit: 3800,
    lastPayment: { status: "paid", label: "ชำระแล้ว 3 ก.ค. 2569" },
    waterMeter: { previous: 110, current: 119, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 380, current: 460, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4550, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "a202",
    roomNumber: "A202",
    floor: 2,
    type: "ห้องแอร์",
    status: "reserved",
    tenant: "ประเสริฐ มั่นคง",
    tenantPhone: "085-678-9012",
    moveInDate: "10 ก.ค. 2569",
    rent: 3900,
    deposit: 3900,
    lastPayment: { status: "none", label: "รอย้ายเข้า 10 ก.ค. 2569" },
    waterMeter: { previous: 0, current: 0, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 0, current: 0, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [],
  },
  {
    id: "b203",
    roomNumber: "B203",
    floor: 2,
    type: "ห้องสตูดิโอ",
    status: "overdue",
    tenant: "นภา แสงดาว",
    tenantPhone: "086-789-0123",
    moveInDate: "20 ก.พ. 2568",
    rent: 4500,
    deposit: 9000,
    outstanding: 4500,
    lastPayment: { status: "overdue", label: "เกินกำหนด 2 วัน" },
    waterMeter: { previous: 130, current: 148, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 450, current: 560, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4500, status: "overdue" },
    maintenanceNotes: [],
  },
  {
    id: "b204",
    roomNumber: "B204",
    floor: 2,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "รัตนา ทองใบ",
    tenantPhone: "087-890-1234",
    moveInDate: "12 ก.ย. 2567",
    rent: 4100,
    deposit: 4100,
    lastPayment: { status: "paid", label: "ชำระแล้ว 1 ก.ค. 2569" },
    waterMeter: { previous: 115, current: 122, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 400, current: 470, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4800, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "b205",
    roomNumber: "B205",
    floor: 2,
    type: "ห้องแอร์",
    status: "maintenance",
    rent: 4100,
    deposit: 4100,
    lastPayment: { status: "none", label: "แอร์เสีย รอช่าง" },
    waterMeter: { previous: 90, current: 90, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 120, current: 120, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [
      {
        id: "b205-1",
        issue: "แอร์ไม่เย็น ระบบคอมเพรสเซอร์มีปัญหา",
        status: "กำลังดำเนินการ",
        date: "3 ก.ค. 2569",
      },
    ],
    note: "รอช่างแอร์เข้าตรวจซ่อม",
  },
  {
    id: "b301",
    roomNumber: "B301",
    floor: 3,
    type: "ห้องมุม",
    status: "occupied",
    tenant: "สมชาย ใจเย็น",
    tenantPhone: "088-901-2345",
    moveInDate: "1 มิ.ย. 2567",
    rent: 4300,
    deposit: 8600,
    lastPayment: { status: "paid", label: "ชำระแล้ว 4 ก.ค. 2569" },
    waterMeter: { previous: 125, current: 134, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 430, current: 510, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 5000, status: "paid" },
    maintenanceNotes: [
      {
        id: "b301-1",
        issue: "หลอดไฟหน้าห้องดับ",
        status: "เสร็จสิ้น",
        date: "15 มิ.ย. 2569",
      },
    ],
  },
  {
    id: "b302",
    roomNumber: "B302",
    floor: 3,
    type: "ห้องสตูดิโอ",
    status: "occupied",
    tenant: "อรุณี พงษ์ไพร",
    tenantPhone: "089-012-3456",
    moveInDate: "22 เม.ย. 2568",
    rent: 3950,
    deposit: 7900,
    lastPayment: { status: "paid", label: "ชำระแล้ว 2 ก.ค. 2569" },
    waterMeter: { previous: 105, current: 112, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 360, current: 430, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4650, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "c303",
    roomNumber: "C303",
    floor: 3,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "ธนกร บุญมี",
    tenantPhone: "090-123-4567",
    moveInDate: "8 ธ.ค. 2567",
    rent: 4200,
    deposit: 4200,
    lastPayment: { status: "pending", label: "รอครบกำหนด 15 ก.ค. 2569" },
    waterMeter: { previous: 118, current: 126, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 410, current: 480, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "ก.ค. 2569", amount: 4900, status: "pending" },
    maintenanceNotes: [
      {
        id: "c303-1",
        issue: "ก๊อกน้ำห้องน้ำหลวม",
        status: "เสร็จสิ้น",
        date: "20 มิ.ย. 2569",
      },
    ],
  },
  {
    id: "c304",
    roomNumber: "C304",
    floor: 3,
    type: "ห้องพัดลม",
    status: "vacant",
    rent: 3300,
    deposit: 3300,
    lastPayment: { status: "none", label: "ไม่มีผู้เช่า" },
    waterMeter: { previous: 70, current: 70, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 130, current: 130, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [],
  },
  {
    id: "c305",
    roomNumber: "C305",
    floor: 3,
    type: "ห้องแอร์",
    status: "reserved",
    tenant: "ปิยะดา แก้วมณี",
    tenantPhone: "091-234-5678",
    moveInDate: "12 ก.ค. 2569",
    rent: 4000,
    deposit: 4000,
    lastPayment: { status: "none", label: "รอย้ายเข้า 12 ก.ค. 2569" },
    waterMeter: { previous: 0, current: 0, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 0, current: 0, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    maintenanceNotes: [],
  },
  {
    id: "c401",
    roomNumber: "C401",
    floor: 4,
    type: "ห้องสตูดิโอ",
    status: "occupied",
    tenant: "สุรชัย วัฒนา",
    tenantPhone: "092-345-6789",
    moveInDate: "3 ก.พ. 2567",
    rent: 4400,
    deposit: 8800,
    lastPayment: { status: "paid", label: "ชำระแล้ว 1 ก.ค. 2569" },
    waterMeter: { previous: 133, current: 141, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 470, current: 540, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 5150, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "c402",
    roomNumber: "C402",
    floor: 4,
    type: "ห้องพร้อมเฟอร์นิเจอร์",
    status: "occupied",
    tenant: "เบญจมาศ ศรีสุวรรณ",
    tenantPhone: "093-456-7890",
    moveInDate: "19 ต.ค. 2568",
    rent: 4150,
    deposit: 8300,
    lastPayment: { status: "paid", label: "ชำระแล้ว 3 ก.ค. 2569" },
    waterMeter: { previous: 122, current: 131, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 440, current: 520, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4900, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "c403",
    roomNumber: "C403",
    floor: 4,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "กิตติพงษ์ รุ่งเรือง",
    tenantPhone: "094-567-8901",
    moveInDate: "27 พ.ค. 2568",
    rent: 4250,
    deposit: 4250,
    lastPayment: { status: "paid", label: "ชำระแล้ว 2 ก.ค. 2569" },
    waterMeter: { previous: 128, current: 137, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 460, current: 530, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 5000, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "c404",
    roomNumber: "C404",
    floor: 4,
    type: "ห้องมุม",
    status: "occupied",
    tenant: "วราภรณ์ มีสุข",
    tenantPhone: "095-678-9012",
    moveInDate: "14 ม.ค. 2568",
    rent: 4050,
    deposit: 8100,
    lastPayment: { status: "paid", label: "ชำระแล้ว 4 ก.ค. 2569" },
    waterMeter: { previous: 116, current: 124, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 400, current: 470, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 4750, status: "paid" },
    maintenanceNotes: [],
  },
  {
    id: "c405",
    roomNumber: "C405",
    floor: 4,
    type: "ห้องแอร์",
    status: "occupied",
    tenant: "ณัฐพล เจริญสุข",
    tenantPhone: "096-789-0123",
    moveInDate: "9 ส.ค. 2567",
    rent: 4300,
    deposit: 4300,
    lastPayment: { status: "paid", label: "ชำระแล้ว 1 ก.ค. 2569" },
    waterMeter: { previous: 127, current: 136, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    electricMeter: { previous: 450, current: 520, unit: "หน่วย", readAt: "28 มิ.ย. 2569" },
    recentInvoice: { period: "มิ.ย. 2569", amount: 5000, status: "paid" },
    maintenanceNotes: [],
  },
]

export const floors = Array.from(new Set(rooms.map((r) => r.floor))).sort(
  (a, b) => a - b
)

export type RoomHistoryEventType =
  | "move-in"
  | "meter"
  | "invoice"
  | "payment"
  | "maintenance"
  | "status"

export type RoomHistoryEvent = {
  id: string
  type: RoomHistoryEventType
  label: string
  detail: string
  date: string
}

function formatCurrencyForHistory(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function getRoomHistory(room: Room): RoomHistoryEvent[] {
  const events: RoomHistoryEvent[] = []

  if (room.recentInvoice && room.lastPayment.status === "paid") {
    events.push({
      id: `${room.id}-payment`,
      type: "payment",
      label: "ชำระเงินแล้ว",
      detail: `งวด ${room.recentInvoice.period} • ${formatCurrencyForHistory(room.recentInvoice.amount)}`,
      date: room.lastPayment.label,
    })
  }

  if (room.recentInvoice) {
    events.push({
      id: `${room.id}-invoice`,
      type: "invoice",
      label: "สร้างบิล",
      detail: `งวด ${room.recentInvoice.period} • ${formatCurrencyForHistory(room.recentInvoice.amount)}`,
      date: room.recentInvoice.period,
    })
  }

  events.push({
    id: `${room.id}-meter`,
    type: "meter",
    label: "บันทึกมิเตอร์น้ำ-ไฟ",
    detail: `น้ำ ${room.waterMeter.current - room.waterMeter.previous} หน่วย • ไฟ ${room.electricMeter.current - room.electricMeter.previous} หน่วย`,
    date: room.waterMeter.readAt,
  })

  room.maintenanceNotes.forEach((note) => {
    events.push({
      id: note.id,
      type: "maintenance",
      label: "แจ้งซ่อม",
      detail: `${note.issue} (${note.status})`,
      date: note.date,
    })
  })

  if (room.status === "maintenance") {
    events.push({
      id: `${room.id}-status-maintenance`,
      type: "status",
      label: "เปลี่ยนสถานะห้องเป็นปิดซ่อม",
      detail: room.note ?? "รอดำเนินการซ่อม",
      date: room.maintenanceNotes[0]?.date ?? room.waterMeter.readAt,
    })
  }
  if (room.status === "cleaning") {
    events.push({
      id: `${room.id}-status-cleaning`,
      type: "status",
      label: "เปลี่ยนสถานะห้องเป็นรอทำความสะอาด",
      detail: room.note ?? "ผู้เช่าย้ายออกแล้ว",
      date: room.waterMeter.readAt,
    })
  }
  if (room.status === "reserved" && room.moveInDate) {
    events.push({
      id: `${room.id}-status-reserved`,
      type: "status",
      label: "เปลี่ยนสถานะห้องเป็นจองแล้ว",
      detail: room.tenant ?? "มีผู้จอง",
      date: room.moveInDate,
    })
  }

  if (room.moveInDate && room.tenant && room.status !== "reserved") {
    events.push({
      id: `${room.id}-move-in`,
      type: "move-in",
      label: "ผู้เช่าย้ายเข้า",
      detail: room.tenant,
      date: room.moveInDate,
    })
  }

  return events
}
