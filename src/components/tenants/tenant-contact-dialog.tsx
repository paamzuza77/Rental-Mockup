"use client"

import { useState } from "react"
import { Eye, FileImage, Pencil, Trash2, Upload } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Tenant } from "@/lib/mock-tenants"
import {
  CONTACT_ATTACHMENT_LIMIT,
  CONTACT_ATTACHMENT_MAX_SIZE_MB,
  contactAttachmentStatusConfig,
  getMockContactAttachments,
} from "@/lib/mock-contact-attachments"
import { useTenantMockToast } from "@/components/tenants/tenant-mock-toast"

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
  const [attachments, setAttachments] = useState(() =>
    tenant ? getMockContactAttachments(tenant) : []
  )
  const showToast = useTenantMockToast()

  if (!tenant) return null

  const handleUploadClick = () => {
    showToast(
      "ฟีเจอร์แนบไฟล์จริงจะเชื่อมต่อกับ Supabase Storage ในระยะถัดไป ขณะนี้เป็นตัวอย่าง (Mock) เท่านั้น"
    )
  }

  const handlePreview = (fileName: string) => {
    showToast(`ดูตัวอย่าง "${fileName}" จะใช้งานได้จริงเมื่อเชื่อมต่อ Supabase Storage แล้ว`)
  }

  const handleRename = (fileName: string) => {
    showToast(`เปลี่ยนชื่อไฟล์ "${fileName}" จะใช้งานได้จริงในระยะถัดไป`)
  }

  const handleDelete = (id: string, fileName: string) => {
    setAttachments((current) => current.filter((item) => item.id !== id))
    showToast(`ลบ "${fileName}" ออกจากตัวอย่างแล้ว (ยังไม่มีการลบไฟล์จริง)`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
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
            <span className="text-[12px] text-muted-foreground">
              {tenant.lastContact.date} • {tenant.lastContact.time}
            </span>
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

          <div className="flex flex-col gap-2">
            <Label>รูปภาพประกอบการติดต่อ</Label>

            <button
              type="button"
              onClick={handleUploadClick}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-border/70 bg-muted/20 px-3.5 py-4 text-center transition-colors hover:bg-muted/40"
            >
              <Upload className="size-5 text-muted-foreground" />
              <span className="text-[13px] font-medium">ลากรูปมาวาง หรือเลือกไฟล์</span>
              <span className="text-[11px] text-muted-foreground">
                รองรับ JPG, PNG, WEBP • สูงสุด {CONTACT_ATTACHMENT_LIMIT} รูปต่อบันทึก • สูงสุด{" "}
                {CONTACT_ATTACHMENT_MAX_SIZE_MB}MB ต่อไฟล์
              </span>
            </button>

            {attachments.length > 0 ? (
              <div className="flex flex-col gap-2">
                {attachments.map((item) => {
                  const statusConfig = contactAttachmentStatusConfig[item.status]
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-2.5 rounded-xl border border-border/60 px-3 py-2.5"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <FileImage className="size-4" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-[13px] font-medium">{item.fileName}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {item.uploadDate} • {item.uploadTime} • {item.fileSize}
                        </span>
                        <Badge className={`w-fit gap-1 text-[11px] ${statusConfig.badge}`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="flex shrink-0 items-center gap-0.5">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-lg"
                          aria-label="ดูตัวอย่าง"
                          onClick={() => handlePreview(item.fileName)}
                        >
                          <Eye className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-lg"
                          aria-label="เปลี่ยนชื่อ"
                          onClick={() => handleRename(item.fileName)}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-lg text-rose-600 hover:text-rose-600 dark:text-rose-400"
                          aria-label="ลบ"
                          onClick={() => handleDelete(item.id, item.fileName)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border/60 px-3.5 py-3 text-center text-[12px] text-muted-foreground">
                ยังไม่มีรูปภาพประกอบการติดต่อ
              </p>
            )}
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
