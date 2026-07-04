"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RoomStatusBadge } from "@/components/rooms/room-status-badge"
import { roomStatusConfig, type Room, type RoomStatus } from "@/lib/mock-rooms"

export function RoomStatusDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [newStatus, setNewStatus] = useState<RoomStatus>(room?.status ?? "vacant")

  if (!room) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>เปลี่ยนสถานะห้อง</DialogTitle>
          <DialogDescription>
            การเปลี่ยนแปลงนี้เป็นข้อมูลตัวอย่าง (Mock) เท่านั้น ยังไม่บันทึกจริง
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3.5 py-2.5">
            <div className="flex flex-col">
              <span className="text-[12px] text-muted-foreground">ห้องปัจจุบัน</span>
              <span className="text-sm font-medium">
                {room.roomNumber} • ชั้น {room.floor}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[12px] text-muted-foreground">สถานะปัจจุบัน</span>
              <RoomStatusBadge status={room.status} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>เลือกสถานะใหม่</Label>
            <Select value={newStatus} onValueChange={(value) => setNewStatus(value as RoomStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(roomStatusConfig) as RoomStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {roomStatusConfig[s].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => onOpenChange(false)}>บันทึกการเปลี่ยนแปลง</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
