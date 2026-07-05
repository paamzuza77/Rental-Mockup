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
import { Textarea } from "@/components/ui/textarea"
import type { Tenant } from "@/lib/mock-tenants"

const contactChannels = ["LINE", "โทรศัพท์", "ในสถานที่", "อีเมล", "อื่นๆ"]

export function TenantContactDialog({
  tenant,
  open,
  onOpenChange,
}: {
  tenant: Tenant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [channel, setChannel] = useState(tenant?.contactChannel ?? "LINE")
  const [note, setNote] = useState("")

  if (!tenant) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>บันทึกการติดต่อ • {tenant.name}</DialogTitle>
          <DialogDescription>
            ห้อง {tenant.roomNumber} • ข้อมูลนี้เป็นตัวอย่าง (Mock) เท่านั้น ยังไม่บันทึกจริง
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3.5">
          <div className="rounded-xl bg-muted/40 px-3.5 py-2.5">
            <span className="text-[12px] text-muted-foreground">การติดต่อล่าสุด</span>
            <p className="text-sm">{tenant.lastContact.note}</p>
            <span className="text-[12px] text-muted-foreground">{tenant.lastContact.date}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>ช่องทางติดต่อ</Label>
            <Select value={channel} onValueChange={(value) => setChannel(value ?? channel)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contactChannels.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-note">บันทึกการติดต่อ</Label>
            <Textarea
              id="contact-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น โทรติดตามค่าเช่า, แจ้งเตือนสัญญาใกล้หมดอายุ..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => onOpenChange(false)}>บันทึก</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
