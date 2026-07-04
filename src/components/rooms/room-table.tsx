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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RoomStatusBadge } from "@/components/rooms/room-status-badge"
import { lastPaymentLabelStyle, type Room } from "@/lib/mock-rooms"
import type { RoomPlaceholderAction } from "@/lib/room-actions"
import { cn } from "@/lib/utils"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function RoomTable({
  rooms,
  onViewDetails,
  onEdit,
  onChangeStatus,
  onMeterReading,
  onViewHistory,
  onPlaceholder,
}: {
  rooms: Room[]
  onViewDetails: (room: Room) => void
  onEdit: (room: Room) => void
  onChangeStatus: (room: Room) => void
  onMeterReading: (room: Room) => void
  onViewHistory: (room: Room) => void
  onPlaceholder: (action: RoomPlaceholderAction) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ห้อง</TableHead>
            <TableHead>ชั้น</TableHead>
            <TableHead>ประเภท</TableHead>
            <TableHead>ผู้เช่า</TableHead>
            <TableHead className="text-right">ค่าเช่า</TableHead>
            <TableHead className="text-right">ยอดค้าง</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">การจัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => {
            const hasTenant = Boolean(room.tenant) && room.status !== "reserved"
            return (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.roomNumber}</TableCell>
                <TableCell className="text-muted-foreground">{room.floor}</TableCell>
                <TableCell className="text-muted-foreground">{room.type}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{room.tenant ?? "ไม่มีผู้เช่า"}</span>
                    <span className={cn("text-[12px]", lastPaymentLabelStyle[room.lastPayment.status])}>
                      {room.lastPayment.label}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(room.rent)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {room.outstanding ? (
                    <span className="font-medium text-rose-600 dark:text-rose-400">
                      {formatCurrency(room.outstanding)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <RoomStatusBadge status={room.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-lg"
                      aria-label="ดูรายละเอียด"
                      onClick={() => onViewDetails(room)}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-lg"
                      aria-label="แก้ไข"
                      onClick={() => onEdit(room)}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg"
                            aria-label="การจัดการเพิ่มเติม"
                          />
                        }
                      >
                        <MoreHorizontal className="size-3.5" />
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
