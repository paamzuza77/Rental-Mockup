"use client"

import { useState } from "react"
import { Droplets, Zap } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Room } from "@/lib/mock-rooms"

const WATER_RATE_PER_UNIT = 18
const ELECTRIC_RATE_PER_UNIT = 7

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function RoomMeterDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [waterPrev, setWaterPrev] = useState(room?.waterMeter.current ?? 0)
  const [waterCurr, setWaterCurr] = useState(room?.waterMeter.current ?? 0)
  const [electricPrev, setElectricPrev] = useState(room?.electricMeter.current ?? 0)
  const [electricCurr, setElectricCurr] = useState(room?.electricMeter.current ?? 0)

  if (!room) return null

  const waterUnits = Math.max(0, waterCurr - waterPrev)
  const electricUnits = Math.max(0, electricCurr - electricPrev)
  const waterCost = waterUnits * WATER_RATE_PER_UNIT
  const electricCost = electricUnits * ELECTRIC_RATE_PER_UNIT

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>บันทึกค่าน้ำค่าไฟ • ห้อง {room.roomNumber}</DialogTitle>
          <DialogDescription>
            กรอกเลขมิเตอร์ล่าสุดเพื่อประมาณค่าใช้จ่าย ข้อมูลนี้เป็นตัวอย่าง (Mock) เท่านั้น
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 p-3.5">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-sky-600 dark:text-sky-400">
              <Droplets className="size-3.5" />
              มิเตอร์น้ำ
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="water-prev">เลขมิเตอร์น้ำก่อนหน้า</Label>
                <Input
                  id="water-prev"
                  type="number"
                  value={waterPrev}
                  onChange={(e) => setWaterPrev(Number(e.target.value) || 0)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="water-curr">เลขมิเตอร์น้ำปัจจุบัน</Label>
                <Input
                  id="water-curr"
                  type="number"
                  value={waterCurr}
                  onChange={(e) => setWaterCurr(Number(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
              <span className="text-[13px] text-muted-foreground">หน่วยน้ำที่ใช้ / ค่าน้ำโดยประมาณ</span>
              <span className="text-sm font-semibold tabular-nums">
                {waterUnits} หน่วย • {formatCurrency(waterCost)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 p-3.5">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-amber-600 dark:text-amber-400">
              <Zap className="size-3.5" />
              มิเตอร์ไฟฟ้า
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="electric-prev">เลขมิเตอร์ไฟก่อนหน้า</Label>
                <Input
                  id="electric-prev"
                  type="number"
                  value={electricPrev}
                  onChange={(e) => setElectricPrev(Number(e.target.value) || 0)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="electric-curr">เลขมิเตอร์ไฟปัจจุบัน</Label>
                <Input
                  id="electric-curr"
                  type="number"
                  value={electricCurr}
                  onChange={(e) => setElectricCurr(Number(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
              <span className="text-[13px] text-muted-foreground">หน่วยไฟที่ใช้ / ค่าไฟโดยประมาณ</span>
              <span className="text-sm font-semibold tabular-nums">
                {electricUnits} หน่วย • {formatCurrency(electricCost)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => onOpenChange(false)}>บันทึกข้อมูล</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
