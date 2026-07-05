"use client"

import { useMemo } from "react"
import {
  CalendarDays,
  ChevronDown,
  DoorOpen,
  FolderOpen,
  IdCard,
  MessageCircle,
  Pencil,
  Phone,
  Receipt,
  UserMinus,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TenantStatusBadge } from "@/components/tenants/tenant-status-badge"
import { tenantStatusConfig, type Tenant } from "@/lib/mock-tenants"
import type { TenantPlaceholderAction } from "@/lib/tenant-actions"
import {
  getMockTenantDocuments,
  tenantDocumentCategories,
  tenantDocumentCategoryConfig,
} from "@/lib/mock-tenant-documents"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function TenantDetailSheet({
  tenant,
  open,
  onOpenChange,
  onEdit,
  onRecordContact,
  onManageDocuments,
  onPlaceholder,
}: {
  tenant: Tenant | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (tenant: Tenant) => void
  onRecordContact: (tenant: Tenant) => void
  onManageDocuments: (tenant: Tenant) => void
  onPlaceholder: (action: TenantPlaceholderAction) => void
}) {
  const documents = useMemo(
    () => (tenant ? getMockTenantDocuments(tenant) : []),
    [tenant]
  )
  const categorySummaries = useMemo(
    () =>
      tenantDocumentCategories
        .map((category) => ({
          category,
          count: documents.filter((doc) => doc.category === category).length,
        }))
        .filter((summary) => summary.count > 0),
    [documents]
  )

  if (!tenant) return null

  const config = tenantStatusConfig[tenant.status]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-lg data-[side=right]:sm:max-w-lg">
        <SheetHeader className="border-b border-border/60">
          <div className="flex items-center justify-between gap-2 pr-8">
            <div className="flex flex-col">
              <SheetTitle className="text-lg">{tenant.name}</SheetTitle>
              <SheetDescription>ห้อง {tenant.roomNumber} • ชั้น {tenant.floor}</SheetDescription>
            </div>
            <TenantStatusBadge status={tenant.status} />
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
          <div className="flex items-center gap-3 rounded-xl border border-border/60 px-3.5 py-3">
            <Avatar className="size-10">
              <AvatarFallback className={config.badge}>{tenant.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <Phone className="size-3" />
                {tenant.phone}
              </span>
              <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <IdCard className="size-3" />
                {tenant.idNumber}
              </span>
              <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <DoorOpen className="size-3" />
                ห้อง {tenant.roomNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col rounded-xl bg-muted/40 px-3.5 py-2.5">
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <CalendarDays className="size-3" />
                วันที่เริ่มสัญญา
              </span>
              <span className="text-sm font-medium">{tenant.leaseStart}</span>
            </div>
            <div className="flex flex-col rounded-xl bg-muted/40 px-3.5 py-2.5">
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <CalendarDays className="size-3" />
                วันที่สิ้นสุดสัญญา
              </span>
              <span className="text-sm font-medium">{tenant.leaseEnd}</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border/60 px-3.5 py-2.5">
            <div className="flex flex-col">
              <span className="text-[12px] text-muted-foreground">ค่าเช่า/เดือน</span>
              <span className="text-sm font-semibold tabular-nums">{formatCurrency(tenant.rent)}</span>
            </div>
            {tenant.outstanding ? (
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-rose-600 dark:text-rose-400">ยอดค้างชำระ</span>
                <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                  {formatCurrency(tenant.outstanding)}
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">การติดต่อล่าสุด</span>
            <div className="flex items-start gap-3 rounded-xl border border-border/60 px-3.5 py-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <MessageCircle className="size-4" />
              </span>
              <div className="flex flex-1 flex-col">
                <span className="text-sm">{tenant.lastContact.note}</span>
                <span className="text-[12px] text-muted-foreground">
                  ผ่าน{tenant.contactChannel} • {tenant.lastContact.date} • {tenant.lastContact.time}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-medium text-muted-foreground">เอกสารและรูปภาพผู้เช่า</span>
            <div className="flex flex-col gap-2.5 rounded-xl border border-border/60 px-3.5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm">แนบแล้ว {documents.length} ไฟล์</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg"
                  onClick={() => onManageDocuments(tenant)}
                >
                  <FolderOpen className="size-3.5" />
                  จัดการเอกสารและรูปภาพ
                </Button>
              </div>
              {categorySummaries.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {categorySummaries.map(({ category, count }) => (
                    <span
                      key={category}
                      className="rounded-lg bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {tenantDocumentCategoryConfig[category].label} ({count})
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <SheetFooter className="gap-2.5 border-t border-border/60">
          <Button className="gap-1.5 rounded-xl" onClick={() => onEdit(tenant)}>
            <Pencil className="size-4" />
            แก้ไขข้อมูลผู้เช่า
          </Button>

          <Button
            variant="outline"
            className="gap-1.5 rounded-xl"
            onClick={() => onRecordContact(tenant)}
          >
            <MessageCircle className="size-4" />
            บันทึกการติดต่อ
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="w-full gap-1.5 rounded-xl" />}
            >
              เพิ่มเติม
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem onClick={() => onManageDocuments(tenant)}>
                <FolderOpen />
                จัดการเอกสารและรูปภาพ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlaceholder("view-lease")}>
                <Receipt />
                ดูสัญญาเช่า
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlaceholder("view-billing")}>
                <Receipt />
                ดูบิลและการชำระเงิน
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPlaceholder("move-out")}>
                <UserMinus />
                ย้ายออก
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
