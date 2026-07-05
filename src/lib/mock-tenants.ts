import {
  CalendarClock,
  LogOut,
  Users,
  Wallet,
  DoorOpen,
  type LucideIcon,
} from "lucide-react"

export type TenantStatus =
  | "active"
  | "overdue"
  | "ending-soon"
  | "pending-move-in"
  | "moved-out"

export type Tenant = {
  id: string
  name: string
  phone: string
  idNumber: string
  roomNumber: string
  floor: number
  status: TenantStatus
  leaseStart: string
  leaseEnd: string
  rent: number
  outstanding?: number
  contactChannel: string
  lastContact: { note: string; date: string; time: string }
  note?: string
}

export const tenantStatusConfig: Record<
  TenantStatus,
  {
    label: string
    icon: LucideIcon
    badge: string
    wash: string
    border: string
  }
> = {
  active: {
    label: "กำลังเช่า",
    icon: Users,
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    wash: "",
    border: "border-l-indigo-400/70",
  },
  overdue: {
    label: "ค้างชำระ",
    icon: Wallet,
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    wash: "bg-rose-50/60 dark:bg-rose-500/[0.06]",
    border: "border-l-rose-400/70",
  },
  "ending-soon": {
    label: "ใกล้หมดสัญญา",
    icon: CalendarClock,
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    wash: "bg-amber-50/50 dark:bg-amber-500/[0.04]",
    border: "border-l-amber-400/70",
  },
  "pending-move-in": {
    label: "รอย้ายเข้า",
    icon: DoorOpen,
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    wash: "bg-violet-50/50 dark:bg-violet-500/[0.04]",
    border: "border-l-violet-400/70",
  },
  "moved-out": {
    label: "ย้ายออกแล้ว",
    icon: LogOut,
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    wash: "bg-slate-50/50 dark:bg-slate-500/[0.04]",
    border: "border-l-slate-400/70",
  },
}

export const tenants: Tenant[] = [
  {
    id: "t-a101",
    name: "สมหญิง ดีใจ",
    phone: "081-234-5678",
    idNumber: "1-1234-56789-01-2",
    roomNumber: "A101",
    floor: 1,
    status: "active",
    leaseStart: "15 มี.ค. 2568",
    leaseEnd: "14 มี.ค. 2570",
    rent: 4200,
    contactChannel: "LINE",
    lastContact: {
      note: "สอบถามเรื่องที่จอดรถเพิ่มเติม",
      date: "28 มิ.ย. 2569",
      time: "10:15 น.",
    },
  },
  {
    id: "t-a103",
    name: "อนุชา ศรีสุข",
    phone: "082-345-6789",
    idNumber: "1-2345-67890-12-3",
    roomNumber: "A103",
    floor: 1,
    status: "overdue",
    leaseStart: "1 ส.ค. 2567",
    leaseEnd: "31 ก.ค. 2568",
    rent: 3700,
    outstanding: 3700,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "โทรติดตามยอดค้างชำระ ยังไม่รับสาย",
      date: "4 ก.ค. 2569",
      time: "09:40 น.",
    },
  },
  {
    id: "t-a104",
    name: "กมลชนก ศรีวงศ์",
    phone: "083-456-7890",
    idNumber: "1-3456-78901-23-4",
    roomNumber: "A104",
    floor: 1,
    status: "active",
    leaseStart: "10 ม.ค. 2569",
    leaseEnd: "9 ม.ค. 2570",
    rent: 4000,
    contactChannel: "LINE",
    lastContact: {
      note: "แจ้งซ่อมก๊อกน้ำเรียบร้อยแล้ว",
      date: "20 มิ.ย. 2569",
      time: "14:05 น.",
    },
  },
  {
    id: "t-a102-out",
    name: "สุนีย์ ทรัพย์มาก",
    phone: "084-111-2222",
    idNumber: "1-4567-89012-34-5",
    roomNumber: "A102",
    floor: 1,
    status: "moved-out",
    leaseStart: "1 ก.ค. 2567",
    leaseEnd: "30 มิ.ย. 2569",
    rent: 3200,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "ยืนยันคืนเงินประกันเรียบร้อยแล้ว",
      date: "30 มิ.ย. 2569",
      time: "16:20 น.",
    },
  },
  {
    id: "t-a105-out",
    name: "ประยุทธ์ แสนดี",
    phone: "085-222-3333",
    idNumber: "1-5678-90123-45-6",
    roomNumber: "A105",
    floor: 1,
    status: "moved-out",
    leaseStart: "1 ม.ค. 2568",
    leaseEnd: "30 มิ.ย. 2569",
    rent: 3200,
    contactChannel: "LINE",
    lastContact: {
      note: "แจ้งย้ายออกล่วงหน้าตามกำหนด",
      date: "25 มิ.ย. 2569",
      time: "11:00 น.",
    },
  },
  {
    id: "t-a201",
    name: "วิชัย ทองคำ",
    phone: "084-567-8901",
    idNumber: "1-6789-01234-56-7",
    roomNumber: "A201",
    floor: 2,
    status: "active",
    leaseStart: "5 พ.ย. 2567",
    leaseEnd: "4 พ.ย. 2569",
    rent: 3800,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "สอบถามเรื่องบิลค่าไฟเดือนนี้",
      date: "2 ก.ค. 2569",
      time: "13:30 น.",
    },
  },
  {
    id: "t-a202",
    name: "ประเสริฐ มั่นคง",
    phone: "085-678-9012",
    idNumber: "1-7890-12345-67-8",
    roomNumber: "A202",
    floor: 2,
    status: "pending-move-in",
    leaseStart: "10 ก.ค. 2569",
    leaseEnd: "9 ก.ค. 2570",
    rent: 3900,
    contactChannel: "LINE",
    lastContact: {
      note: "ยืนยันวันย้ายเข้าและนัดรับกุญแจ",
      date: "1 ก.ค. 2569",
      time: "15:45 น.",
    },
  },
  {
    id: "t-b203",
    name: "นภา แสงดาว",
    phone: "086-789-0123",
    idNumber: "1-8901-23456-78-9",
    roomNumber: "B203",
    floor: 2,
    status: "overdue",
    leaseStart: "20 ก.พ. 2568",
    leaseEnd: "19 ก.พ. 2569",
    rent: 4500,
    outstanding: 4500,
    contactChannel: "LINE",
    lastContact: {
      note: "ส่งข้อความแจ้งเตือนบิลค้างชำระ",
      date: "3 ก.ค. 2569",
      time: "08:50 น.",
    },
  },
  {
    id: "t-b204",
    name: "รัตนา ทองใบ",
    phone: "087-890-1234",
    idNumber: "1-9012-34567-89-0",
    roomNumber: "B204",
    floor: 2,
    status: "active",
    leaseStart: "12 ก.ย. 2567",
    leaseEnd: "11 ก.ย. 2569",
    rent: 4100,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "แจ้งรับบิลเดือนนี้เรียบร้อย",
      date: "1 ก.ค. 2569",
      time: "12:10 น.",
    },
  },
  {
    id: "t-b301",
    name: "สมชาย ใจเย็น",
    phone: "088-901-2345",
    idNumber: "1-0123-45678-90-1",
    roomNumber: "B301",
    floor: 3,
    status: "ending-soon",
    leaseStart: "1 มิ.ย. 2567",
    leaseEnd: "31 ก.ค. 2569",
    rent: 4300,
    contactChannel: "ในสถานที่",
    lastContact: {
      note: "สอบถามเรื่องต่อสัญญาเช่ารอบใหม่",
      date: "30 มิ.ย. 2569",
      time: "17:00 น.",
    },
  },
  {
    id: "t-b302",
    name: "อรุณี พงษ์ไพร",
    phone: "089-012-3456",
    idNumber: "1-1122-33445-56-7",
    roomNumber: "B302",
    floor: 3,
    status: "active",
    leaseStart: "22 เม.ย. 2568",
    leaseEnd: "21 เม.ย. 2570",
    rent: 3950,
    contactChannel: "LINE",
    lastContact: {
      note: "สอบถามเรื่องที่จอดรถจักรยานยนต์",
      date: "18 มิ.ย. 2569",
      time: "10:30 น.",
    },
  },
  {
    id: "t-c303",
    name: "ธนกร บุญมี",
    phone: "090-123-4567",
    idNumber: "1-2233-44556-67-8",
    roomNumber: "C303",
    floor: 3,
    status: "ending-soon",
    leaseStart: "8 ธ.ค. 2567",
    leaseEnd: "15 ส.ค. 2569",
    rent: 4200,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "สอบถามเรื่องต่อสัญญาเช่า ยังไม่ตัดสินใจ",
      date: "29 มิ.ย. 2569",
      time: "14:50 น.",
    },
  },
  {
    id: "t-c304-out",
    name: "มาลี ขยันดี",
    phone: "091-333-4444",
    idNumber: "1-3344-55667-78-9",
    roomNumber: "C304",
    floor: 3,
    status: "moved-out",
    leaseStart: "1 พ.ค. 2567",
    leaseEnd: "28 มิ.ย. 2569",
    rent: 3300,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "ยืนยันคืนเงินประกันเรียบร้อยแล้ว",
      date: "28 มิ.ย. 2569",
      time: "09:15 น.",
    },
  },
  {
    id: "t-c305",
    name: "ปิยะดา แก้วมณี",
    phone: "091-234-5678",
    idNumber: "1-4455-66778-89-0",
    roomNumber: "C305",
    floor: 3,
    status: "pending-move-in",
    leaseStart: "12 ก.ค. 2569",
    leaseEnd: "11 ก.ค. 2570",
    rent: 4000,
    contactChannel: "LINE",
    lastContact: {
      note: "ยืนยันวันย้ายเข้าและนัดรับกุญแจ",
      date: "2 ก.ค. 2569",
      time: "11:20 น.",
    },
  },
  {
    id: "t-c401",
    name: "สุรชัย วัฒนา",
    phone: "092-345-6789",
    idNumber: "1-5566-77889-90-1",
    roomNumber: "C401",
    floor: 4,
    status: "active",
    leaseStart: "3 ก.พ. 2567",
    leaseEnd: "2 ก.พ. 2570",
    rent: 4400,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "แจ้งรับบิลเดือนนี้เรียบร้อย",
      date: "1 ก.ค. 2569",
      time: "13:00 น.",
    },
  },
  {
    id: "t-c402",
    name: "เบญจมาศ ศรีสุวรรณ",
    phone: "093-456-7890",
    idNumber: "1-6677-88990-01-2",
    roomNumber: "C402",
    floor: 4,
    status: "active",
    leaseStart: "19 ต.ค. 2568",
    leaseEnd: "18 ต.ค. 2570",
    rent: 4150,
    contactChannel: "LINE",
    lastContact: {
      note: "สอบถามเรื่องเฟอร์นิเจอร์เพิ่มเติม",
      date: "22 มิ.ย. 2569",
      time: "15:10 น.",
    },
  },
  {
    id: "t-c403",
    name: "กิตติพงษ์ รุ่งเรือง",
    phone: "094-567-8901",
    idNumber: "1-7788-99001-12-3",
    roomNumber: "C403",
    floor: 4,
    status: "ending-soon",
    leaseStart: "27 พ.ค. 2568",
    leaseEnd: "20 ก.ค. 2569",
    rent: 4250,
    contactChannel: "ในสถานที่",
    lastContact: {
      note: "แจ้งเตือนสัญญาใกล้หมดอายุ รอการตอบกลับ",
      date: "1 ก.ค. 2569",
      time: "09:00 น.",
    },
  },
  {
    id: "t-c404",
    name: "วราภรณ์ มีสุข",
    phone: "095-678-9012",
    idNumber: "1-8899-00112-23-4",
    roomNumber: "C404",
    floor: 4,
    status: "active",
    leaseStart: "14 ม.ค. 2568",
    leaseEnd: "13 ม.ค. 2570",
    rent: 4050,
    contactChannel: "โทรศัพท์",
    lastContact: {
      note: "แจ้งรับบิลเดือนนี้เรียบร้อย",
      date: "4 ก.ค. 2569",
      time: "10:45 น.",
    },
  },
  {
    id: "t-c405",
    name: "ณัฐพล เจริญสุข",
    phone: "096-789-0123",
    idNumber: "1-9900-11223-34-5",
    roomNumber: "C405",
    floor: 4,
    status: "active",
    leaseStart: "9 ส.ค. 2567",
    leaseEnd: "8 ส.ค. 2570",
    rent: 4300,
    contactChannel: "LINE",
    lastContact: {
      note: "สอบถามเรื่องทั่วไป ไม่มีปัญหา",
      date: "1 ก.ค. 2569",
      time: "16:00 น.",
    },
  },
]

export const tenantFloors = Array.from(new Set(tenants.map((t) => t.floor))).sort(
  (a, b) => a - b
)
