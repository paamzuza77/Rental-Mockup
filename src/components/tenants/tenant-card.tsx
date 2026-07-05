import {
  Eye,
  FolderOpen,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Phone,
  Receipt,
  UserMinus,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TenantStatusBadge } from "@/components/tenants/tenant-status-badge"
import { tenantStatusConfig, type Tenant } from "@/lib/mock-tenants"
import type { TenantPlaceholderAction } from "@/lib/tenant-actions"
import { cn } from "@/lib/utils"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function TenantCard({
  tenant,
  onViewDetails,
  onEdit,
  onRecordContact,
  onManageDocuments,
  onPlaceholder,
}: {
  tenant: Tenant
  onViewDetails: (tenant: Tenant) => void
  onEdit: (tenant: Tenant) => void
  onRecordContact: (tenant: Tenant) => void
  onManageDocuments: (tenant: Tenant) => void
  onPlaceholder: (action: TenantPlaceholderAction) => void
}) {
  const config = tenantStatusConfig[tenant.status]

  return (
    <Card
      className={cn(
        "rounded-2xl border-border/60 border-l-2 shadow-sm transition-shadow hover:shadow-md [--card-spacing:--spacing(5)]",
        config.border,
        config.wash
      )}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9">
              <AvatarFallback className={config.badge}>{tenant.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">{tenant.name}</span>
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <Phone className="size-3" />
                {tenant.phone}
              </span>
            </div>
          </div>
          <TenantStatusBadge status={tenant.status} />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted/40 px-3.5 py-2.5">
          <div className="flex flex-col">
            <span className="text-[12px] text-muted-foreground">ห้องที่เช่า</span>
            <span className="text-sm font-medium">{tenant.roomNumber}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-muted-foreground">สัญญาเช่า</span>
            <span className="text-[13px] font-medium">
              {tenant.leaseStart} - {tenant.leaseEnd}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
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

        <div className="flex items-start gap-1.5 rounded-lg bg-muted/30 px-3 py-2">
          <MessageCircle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
          <p className="text-[12px] text-muted-foreground">
            {tenant.lastContact.note} • {tenant.lastContact.date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 rounded-lg"
            onClick={() => onViewDetails(tenant)}
          >
            <Eye className="size-3.5" />
            ดูรายละเอียด
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-lg"
                  aria-label="การจัดการเพิ่มเติม"
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuItem onClick={() => onViewDetails(tenant)}>
                <Eye />
                ดูรายละเอียด
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(tenant)}>
                <Pencil />
                แก้ไขข้อมูลผู้เช่า
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRecordContact(tenant)}>
                <MessageCircle />
                บันทึกการติดต่อ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageDocuments(tenant)}>
                <FolderOpen />
                จัดการเอกสารและรูปภาพ
              </DropdownMenuItem>

              <DropdownMenuSeparator />
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
        </div>
      </CardContent>
    </Card>
  )
}
