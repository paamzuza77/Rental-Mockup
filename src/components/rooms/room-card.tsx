import {
  Ban,
  Eye,
  Gauge,
  History,
  MoreHorizontal,
  Pencil,
  Receipt,
  RefreshCcw,
  UserMinus,
  UserPlus,
  Wallet,
  Wrench,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RoomStatusBadge } from "@/components/rooms/room-status-badge"
import { lastPaymentLabelStyle, roomStatusConfig, type Room } from "@/lib/mock-rooms"
import type { RoomPlaceholderAction } from "@/lib/room-actions"
import { cn } from "@/lib/utils"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function RoomCard({
  room,
  onViewDetails,
  onEdit,
  onChangeStatus,
  onMeterReading,
  onViewHistory,
  onPlaceholder,
}: {
  room: Room
  onViewDetails: (room: Room) => void
  onEdit: (room: Room) => void
  onChangeStatus: (room: Room) => void
  onMeterReading: (room: Room) => void
  onViewHistory: (room: Room) => void
  onPlaceholder: (action: RoomPlaceholderAction) => void
}) {
  const config = roomStatusConfig[room.status]
  const hasTenant = Boolean(room.tenant) && room.status !== "reserved"

  return (
    <Card
      className={cn(
        "rounded-2xl border-border/60 border-l-2 shadow-sm transition-shadow hover:shadow-md [--card-spacing:--spacing(5)]",
        config.border,
        config.wash
      )}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              {room.roomNumber}
            </span>
            <span className="text-[13px] text-muted-foreground">
              ชั้น {room.floor} • {room.type}
            </span>
          </div>
          <RoomStatusBadge status={room.status} />
        </div>

        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback
              className={room.tenant ? config.badge : "bg-muted text-muted-foreground"}
            >
              {room.tenant ? room.tenant.slice(0, 1) : "-"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">
              {room.tenant ?? "ไม่มีผู้เช่า"}
            </span>
            <span className={cn("text-[12px]", lastPaymentLabelStyle[room.lastPayment.status])}>
              {room.lastPayment.label}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between rounded-xl bg-muted/40 px-3.5 py-2.5">
          <div className="flex flex-col">
            <span className="text-[12px] text-muted-foreground">ค่าเช่า/เดือน</span>
            <span className="text-sm font-semibold tabular-nums">
              {formatCurrency(room.rent)}
            </span>
          </div>
          {room.outstanding ? (
            <div className="flex flex-col items-end">
              <span className="text-[12px] text-rose-600 dark:text-rose-400">
                ยอดค้างชำระ
              </span>
              <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                {formatCurrency(room.outstanding)}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 rounded-lg"
            onClick={() => onViewDetails(room)}
          >
            <Eye className="size-3.5" />
            ดูรายละเอียด
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-lg"
                  aria-label="การจัดการเพิ่มเติม"
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuItem onClick={() => onViewDetails(room)}>
                <Eye />
                ดูรายละเอียด
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(room)}>
                <Pencil />
                แก้ไขข้อมูลห้อง
              </DropdownMenuItem>

              <DropdownMenuSeparator />
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
              <DropdownMenuItem onClick={() => onChangeStatus(room)}>
                <RefreshCcw />
                เปลี่ยนสถานะห้อง
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlaceholder("disable-room")}>
                <Ban />
                ปิดใช้งานห้อง
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onMeterReading(room)}>
                <Gauge />
                บันทึกค่าน้ำค่าไฟ
              </DropdownMenuItem>
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

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onPlaceholder("report-maintenance")}>
                <Wrench />
                แจ้งซ่อม
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewHistory(room)}>
                <History />
                ดูประวัติห้อง
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
