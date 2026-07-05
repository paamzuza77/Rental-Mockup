import {
  Eye,
  FolderOpen,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Receipt,
  UserMinus,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TenantStatusBadge } from "@/components/tenants/tenant-status-badge"
import type { Tenant } from "@/lib/mock-tenants"
import type { TenantPlaceholderAction } from "@/lib/tenant-actions"

function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString("th-TH")}`
}

export function TenantTable({
  tenants,
  onViewDetails,
  onEdit,
  onRecordContact,
  onManageDocuments,
  onPlaceholder,
}: {
  tenants: Tenant[]
  onViewDetails: (tenant: Tenant) => void
  onEdit: (tenant: Tenant) => void
  onRecordContact: (tenant: Tenant) => void
  onManageDocuments: (tenant: Tenant) => void
  onPlaceholder: (action: TenantPlaceholderAction) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>ผู้เช่า</TableHead>
            <TableHead>ห้อง</TableHead>
            <TableHead>เริ่มสัญญา</TableHead>
            <TableHead>สิ้นสุดสัญญา</TableHead>
            <TableHead className="text-right">ค่าเช่า</TableHead>
            <TableHead className="text-right">ยอดค้าง</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">การจัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{tenant.name}</span>
                  <span className="text-[12px] text-muted-foreground">{tenant.phone}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{tenant.roomNumber}</TableCell>
              <TableCell className="text-muted-foreground">{tenant.leaseStart}</TableCell>
              <TableCell className="text-muted-foreground">{tenant.leaseEnd}</TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrency(tenant.rent)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {tenant.outstanding ? (
                  <span className="font-medium text-rose-600 dark:text-rose-400">
                    {formatCurrency(tenant.outstanding)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <TenantStatusBadge status={tenant.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-lg"
                    aria-label="ดูรายละเอียด"
                    onClick={() => onViewDetails(tenant)}
                  >
                    <Eye className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-lg"
                    aria-label="แก้ไข"
                    onClick={() => onEdit(tenant)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-lg"
                          aria-label="การจัดการเพิ่มเติม"
                        />
                      }
                    >
                      <MoreHorizontal className="size-3.5" />
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
