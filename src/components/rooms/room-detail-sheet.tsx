"use client"

import {
  Ban,
  CalendarDays,
  ChevronDown,
  Droplets,
  Gauge,
  History,
  Pencil,
  Phone,
  Receipt,
  RefreshCcw,
  UserMinus,
  UserPlus,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RoomStatusBadge } from "@/components/rooms/room-status-badge"
import {
  invoiceStatusLabel,
  invoiceStatusStyle,
  lastPaymentLabelStyle,
  roomStatusConfig,
  type Room,
} from "@/lib/mock-rooms"
import type { RoomPlaceholderAction } from "@/lib/room-actions"
import { cn } from "@/lib/utils"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

function MeterRow({
  icon: Icon,
  label,
  reading,
}: {
  icon: typeof Droplets
  label: string
  reading: Room["waterMeter"]
}) {
  const usage = reading.current - reading.previous
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-3.5 py-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
        <Icon className="size-4" />
      </span>
      <div className="flex flex-1 flex-col">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tabular-nums">
          {reading.previous.toLocaleString("th-TH")} → {reading.current.toLocaleString("th-TH")} {reading.unit}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-semibold tabular-nums">
          {usage.toLocaleString("th-TH")} {reading.unit}
        </span>
        <span className="text-[12px] text-muted-foreground">{reading.readAt}</span>
      </div>
    </div>
  )
}

export function RoomDetailSheet({
  room,
  open,
  onOpenChange,
  onEdit,
  onChangeStatus,
  onMeterReading,
  onViewHistory,
  onPlaceholder,
}: {
  room: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (room: Room) => void
  onChangeStatus: (room: Room) => void
  onMeterReading: (room: Room) => void
  onViewHistory: (room: Room) => void
  onPlaceholder: (action: RoomPlaceholderAction) => void
}) {
  if (!room) return null

  const config = roomStatusConfig[room.status]
  const hasTenant = Boolean(room.tenant) && room.status !== "reserved"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-lg data-[side=right]:sm:max-w-lg">
        <SheetHeader className="border-b border-border/60">
          <div className="flex items-center justify-between gap-2 pr-8">
            <div className="flex flex-col">
              <SheetTitle className="text-lg">ห้อง {room.roomNumber}</SheetTitle>
              <SheetDescription>
                ชั้น {room.floor} • {room.type}
              </SheetDescription>
            </div>
            <RoomStatusBadge status={room.status} />
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          {/* Tenant */}
          <div className="flex items-center gap-3 rounded-xl border border-border/60 px-3.5 py-3">
            <Avatar className="size-10">
              <AvatarFallback className={room.tenant ? config.badge : "bg-muted text-muted-foreground"}>
                {room.tenant ? room.tenant.slice(0, 1) : "-"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium">{room.tenant ?? "ไม่มีผู้เช่า"}</span>
              {room.tenantPhone && (
                <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                  <Phone className="size-3" />
                  {room.tenantPhone}
                </span>
              )}
              {room.moveInDate && (
                <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                  <CalendarDays className="size-3" />
                  ย้ายเข้า {room.moveInDate}
                </span>
              )}
            </div>
          </div>

          {/* Rent / deposit / outstanding */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col rounded-xl bg-muted/40 px-3.5 py-2.5">
              <span className="text-[12px] text-muted-foreground">ค่าเช่า/เดือน</span>
              <span className="text-sm font-semibold tabular-nums">{formatCurrency(room.rent)}</span>
            </div>
            <div className="flex flex-col rounded-xl bg-muted/40 px-3.5 py-2.5">
              <span className="text-[12px] text-muted-foreground">เงินประกัน</span>
              <span className="text-sm font-semibold tabular-nums">{formatCurrency(room.deposit)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/60 px-3.5 py-2.5">
            <div className="flex flex-col">
              <span className="text-[12px] text-muted-foreground">สถานะการชำระล่าสุด</span>
              <span className={cn("text-sm font-medium", lastPaymentLabelStyle[room.lastPayment.status])}>
                {room.lastPayment.label}
              </span>
            </div>
            {room.outstanding ? (
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-rose-600 dark:text-rose-400">ยอดค้างชำระ</span>
                <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                  {formatCurrency(room.outstanding)}
                </span>
              </div>
            ) : null}
          </div>

          {/* Meters */}
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">ค่ามิเตอร์ล่าสุด</span>
            <MeterRow icon={Droplets} label="มิเตอร์น้ำ" reading={room.waterMeter} />
            <MeterRow icon={Zap} label="มิเตอร์ไฟฟ้า" reading={room.electricMeter} />
          </div>

          {/* Recent invoice */}
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">บิลล่าสุด</span>
            {room.recentInvoice ? (
              <div className="flex items-center gap-3 rounded-xl border border-border/60 px-3.5 py-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Receipt className="size-4" />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">งวด {room.recentInvoice.period}</span>
                  <span className="text-[12px] text-muted-foreground">
                    {formatCurrency(room.recentInvoice.amount)}
                  </span>
                </div>
                <Badge className={cn("text-[11px]", invoiceStatusStyle[room.recentInvoice.status])}>
                  {invoiceStatusLabel[room.recentInvoice.status]}
                </Badge>
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border/70 px-3.5 py-3 text-[13px] text-muted-foreground">
                ยังไม่มีประวัติบิล
              </p>
            )}
          </div>

          {/* Maintenance notes */}
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">บันทึกงานซ่อม</span>
            {room.maintenanceNotes.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {room.maintenanceNotes.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-start gap-3 rounded-xl border border-border/60 px-3.5 py-2.5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Wrench className="size-4" />
                    </span>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm">{note.issue}</span>
                      <span className="text-[12px] text-muted-foreground">{note.date}</span>
                    </div>
                    <Badge variant="secondary" className="text-[11px]">
                      {note.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-dashed border-border/70 px-3.5 py-3 text-[13px] text-muted-foreground">
                ไม่มีรายการแจ้งซ่อม
              </p>
            )}
          </div>
        </div>

        <SheetFooter className="gap-2.5 border-t border-border/60">
          <Button className="gap-1.5 rounded-xl" onClick={() => onEdit(room)}>
            <Pencil className="size-4" />
            แก้ไขข้อมูลห้อง
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="h-auto flex-col gap-1 rounded-xl py-2.5"
              onClick={() => onChangeStatus(room)}
            >
              <RefreshCcw className="size-4" />
              <span className="text-[12px]">เปลี่ยนสถานะ</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1 rounded-xl py-2.5"
              onClick={() => onMeterReading(room)}
            >
              <Gauge className="size-4" />
              <span className="text-[12px]">บันทึกมิเตอร์</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1 rounded-xl py-2.5"
              onClick={() => onViewHistory(room)}
            >
              <History className="size-4" />
              <span className="text-[12px]">ประวัติห้อง</span>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="w-full gap-1.5 rounded-xl" />}
            >
              เพิ่มเติม
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem onClick={() => onPlaceholder("assign-tenant")}>
                <UserPlus />
                เพิ่ม/เปลี่ยนผู้เช่า
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!hasTenant}
                onClick={() => onPlaceholder("move-out-tenant")}
              >
                <UserMinus />
                ย้ายผู้เช่าออก
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={!hasTenant}
                onClick={() => onPlaceholder("create-invoice")}
              >
                <Receipt />
                สร้างบิล
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={!hasTenant}
                onClick={() => onPlaceholder("record-payment")}
              >
                <Wallet />
                บันทึกการชำระเงิน
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlaceholder("report-maintenance")}>
                <Wrench />
                แจ้งซ่อม
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onPlaceholder("disable-room")}>
                <Ban />
                ปิดใช้งานห้อง
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
