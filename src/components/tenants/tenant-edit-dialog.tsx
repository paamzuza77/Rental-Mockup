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
import { tenantStatusConfig, type Tenant, type TenantStatus } from "@/lib/mock-tenants"

export function TenantEditDialog({
  tenant,
  open,
  onOpenChange,
}: {
  tenant: Tenant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [name, setName] = useState(tenant?.name ?? "")
  const [phone, setPhone] = useState(tenant?.phone ?? "")
  const [idNumber, setIdNumber] = useState(tenant?.idNumber ?? "")
  const [roomNumber, setRoomNumber] = useState(tenant?.roomNumber ?? "")
  const [status, setStatus] = useState<TenantStatus>(tenant?.status ?? "active")
  const [leaseStart, setLeaseStart] = useState(tenant?.leaseStart ?? "")
  const [leaseEnd, setLeaseEnd] = useState(tenant?.leaseEnd ?? "")
  const [rent, setRent] = useState(tenant ? String(tenant.rent) : "")
  const [note, setNote] = useState(tenant?.note ?? "")

  if (!tenant) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>แก้ไขข้อมูลผู้เช่า</DialogTitle>
          <DialogDescription>
            อัปเดตข้อมูลผู้เช่า การเปลี่ยนแปลงนี้เป็นข้อมูลตัวอย่าง (Mock) เท่านั้น
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="tenant-name">ชื่อผู้เช่า</Label>
            <Input id="tenant-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenant-phone">เบอร์โทร</Label>
            <Input id="tenant-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenant-id">เลขบัตรประชาชน / Passport</Label>
            <Input id="tenant-id" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenant-room">ห้องที่เช่า</Label>
            <Input
              id="tenant-room"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>สถานะผู้เช่า</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as TenantStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(tenantStatusConfig) as TenantStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {tenantStatusConfig[s].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenant-lease-start">วันที่เริ่มสัญญา</Label>
            <Input
              id="tenant-lease-start"
              value={leaseStart}
              onChange={(e) => setLeaseStart(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tenant-lease-end">วันที่สิ้นสุดสัญญา</Label>
            <Input
              id="tenant-lease-end"
              value={leaseEnd}
              onChange={(e) => setLeaseEnd(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="tenant-rent">ค่าเช่ารายเดือน</Label>
            <Input
              id="tenant-rent"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="tenant-note">หมายเหตุ</Label>
            <Textarea
              id="tenant-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับผู้เช่ารายนี้..."
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
