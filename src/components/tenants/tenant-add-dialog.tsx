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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TenantAddDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [leaseStart, setLeaseStart] = useState("")
  const [deposit, setDeposit] = useState("")
  const [note, setNote] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้เช่าใหม่</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลผู้เช่าเบื้องต้น ข้อมูลนี้เป็นตัวอย่าง (Mock) เท่านั้น ยังไม่บันทึกจริง
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-name">ชื่อผู้เช่า</Label>
            <Input
              id="new-tenant-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น สมหญิง ดีใจ"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-phone">เบอร์โทร</Label>
            <Input
              id="new-tenant-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-id">เลขบัตรประชาชน / Passport</Label>
            <Input
              id="new-tenant-id"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-room">ห้อง</Label>
            <Input
              id="new-tenant-room"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="เช่น A101"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-lease-start">วันที่เริ่มเช่า</Label>
            <Input
              id="new-tenant-lease-start"
              value={leaseStart}
              onChange={(e) => setLeaseStart(e.target.value)}
              placeholder="เช่น 10 ก.ค. 2569"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-deposit">เงินประกัน</Label>
            <Input
              id="new-tenant-deposit"
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="new-tenant-note">หมายเหตุ</Label>
            <Textarea
              id="new-tenant-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="รายละเอียดเพิ่มเติม..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => onOpenChange(false)}>บันทึกผู้เช่า</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
