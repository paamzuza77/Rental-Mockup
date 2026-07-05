"use client"

import { useMemo, useState } from "react"
import { Eye, FileText, Image as ImageIcon, Pencil, Trash2, Upload } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Tenant } from "@/lib/mock-tenants"
import {
  TENANT_DOCUMENT_LIMIT,
  TENANT_DOCUMENT_MAX_SIZE_MB,
  getMockTenantDocuments,
  tenantDocumentCategories,
  tenantDocumentCategoryConfig,
  tenantDocumentStatusConfig,
  type TenantDocument,
} from "@/lib/mock-tenant-documents"
import { useTenantMockToast } from "@/components/tenants/tenant-mock-toast"

export function TenantDocumentsDialog({
  tenant,
  open,
  onOpenChange,
}: {
  tenant: Tenant | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [documents, setDocuments] = useState<TenantDocument[]>(() =>
    tenant ? getMockTenantDocuments(tenant) : []
  )
  const showToast = useTenantMockToast()

  const grouped = useMemo(() => {
    return tenantDocumentCategories
      .map((category) => ({
        category,
        items: documents.filter((doc) => doc.category === category),
      }))
      .filter((group) => group.items.length > 0)
  }, [documents])

  if (!tenant) return null

  const isFull = documents.length >= TENANT_DOCUMENT_LIMIT

  const handleUploadClick = () => {
    if (isFull) return
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
    setDocuments((current) => current.filter((item) => item.id !== id))
    showToast(`ลบ "${fileName}" ออกจากตัวอย่างแล้ว (ยังไม่มีการลบไฟล์จริง)`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>เอกสารและรูปภาพผู้เช่า • {tenant.name}</DialogTitle>
          <DialogDescription>
            ห้อง {tenant.roomNumber} • ข้อมูลนี้เป็นตัวอย่าง (Mock) เท่านั้น ยังไม่เชื่อมต่อระบบจัดเก็บไฟล์จริง
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3.5">
          {isFull ? (
            <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 px-3.5 py-4 text-center">
              <span className="text-[13px] font-medium text-muted-foreground">
                แนบไฟล์ครบ {TENANT_DOCUMENT_LIMIT} ไฟล์แล้ว
              </span>
              <p className="mt-1 text-[11px] text-muted-foreground">
                กรุณาลบไฟล์เก่าที่ไม่จำเป็นก่อนแนบไฟล์ใหม่
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleUploadClick}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-border/70 bg-muted/20 px-3.5 py-4 text-center transition-colors hover:bg-muted/40"
            >
              <Upload className="size-5 text-muted-foreground" />
              <span className="text-[13px] font-medium">ลากไฟล์มาวาง หรือเลือกไฟล์</span>
              <span className="text-[11px] text-muted-foreground">
                รองรับ PDF, JPG, PNG, WEBP • แนบได้สูงสุด {TENANT_DOCUMENT_LIMIT} ไฟล์ต่อผู้เช่า • สูงสุด{" "}
                {TENANT_DOCUMENT_MAX_SIZE_MB}MB ต่อไฟล์
              </span>
            </button>
          )}

          <p className="text-[12px] text-muted-foreground">
            แนบแล้ว {documents.length} จาก {TENANT_DOCUMENT_LIMIT} ไฟล์
          </p>

          {grouped.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border/60 px-3.5 py-3 text-center text-[12px] text-muted-foreground">
              ยังไม่มีเอกสารหรือรูปภาพของผู้เช่ารายนี้
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {grouped.map(({ category, items }) => (
                <div key={category} className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium text-muted-foreground">
                    {tenantDocumentCategoryConfig[category].label} ({items.length})
                  </span>
                  <div className="flex flex-col gap-2">
                    {items.map((doc) => {
                      const statusConfig = tenantDocumentStatusConfig[doc.status]
                      const FileTypeIcon = doc.fileType === "PDF" ? FileText : ImageIcon
                      return (
                        <div
                          key={doc.id}
                          className="flex items-start gap-2.5 rounded-xl border border-border/60 px-3 py-2.5"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <FileTypeIcon className="size-4" />
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="truncate text-[13px] font-medium">{doc.fileName}</span>
                            <span className="text-[11px] text-muted-foreground">
                              {doc.fileType} • {doc.uploadDate} • {doc.fileSize}
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
                              onClick={() => handlePreview(doc.fileName)}
                            >
                              <Eye className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg"
                              aria-label="เปลี่ยนชื่อ"
                              onClick={() => handleRename(doc.fileName)}
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="rounded-lg text-rose-600 hover:text-rose-600 dark:text-rose-400"
                              aria-label="ลบไฟล์"
                              onClick={() => handleDelete(doc.id, doc.fileName)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>ปิด</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
