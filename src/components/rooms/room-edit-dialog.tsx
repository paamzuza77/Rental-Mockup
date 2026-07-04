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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { roomStatusConfig, roomTypes, type Room, type RoomStatus, type RoomType } from "@/lib/mock-rooms"

export function RoomEditDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [roomNumber, setRoomNumber] = useState(room?.roomNumber ?? "")
  const [floor, setFloor] = useState(room ? String(room.floor) : "")
  const [type, setType] = useState<RoomType>(room?.type ?? "ห้องแอร์")
  const [rent, setRent] = useState(room ? String(room.rent) : "")
  const [deposit, setDeposit] = useState(room ? String(room.deposit) : "")
  const [status, setStatus] = useState<RoomStatus>(room?.status ?? "vacant")
  const [note, setNote] = useState(room?.note ?? "")

  if (!room) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลห้อง {room.roomNumber}</DialogTitle>
          <DialogDescription>
            อัปเดตข้อมูลห้องพัก การเปลี่ยนแปลงนี้เป็นข้อมูลตัวอย่าง (Mock) เท่านั้น
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-number">เลขห้อง</Label>
            <Input
              id="room-number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-floor">ชั้น</Label>
            <Input
              id="room-floor"
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>ประเภทห้อง</Label>
            <Select value={type} onValueChange={(value) => setType(value as RoomType)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-rent">ค่าเช่ารายเดือน</Label>
            <Input
              id="room-rent"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-deposit">เงินประกัน</Label>
            <Input
              id="room-deposit"
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>สถานะห้อง</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as RoomStatus)}>
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

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="room-note">หมายเหตุ</Label>
            <Textarea
              id="room-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับห้องนี้..."
            />
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
