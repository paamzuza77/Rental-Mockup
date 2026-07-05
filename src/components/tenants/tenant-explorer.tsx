"use client"

import { useMemo, useState } from "react"
import { LayoutGrid, ListFilter, Search, Table2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { TenantCard } from "@/components/tenants/tenant-card"
import { TenantTable } from "@/components/tenants/tenant-table"
import { TenantDetailSheet } from "@/components/tenants/tenant-detail-sheet"
import { TenantEditDialog } from "@/components/tenants/tenant-edit-dialog"
import { TenantContactDialog } from "@/components/tenants/tenant-contact-dialog"
import { TenantPlaceholderDialog } from "@/components/tenants/tenant-placeholder-dialog"
import {
  tenantFloors,
  tenantStatusConfig,
  type Tenant,
  type TenantStatus,
} from "@/lib/mock-tenants"
import { tenantPlaceholderCopy, type TenantPlaceholderAction } from "@/lib/tenant-actions"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "table"
type FloorFilter = "all" | number
type StatusFilter = "all" | TenantStatus

export function TenantExplorer({ tenants }: { tenants: Tenant[] }) {
  const [search, setSearch] = useState("")
  const [floorFilter, setFloorFilter] = useState<FloorFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [view, setView] = useState<ViewMode>("grid")

  const [detailTenant, setDetailTenant] = useState<Tenant | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editTenant, setEditTenant] = useState<Tenant | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [contactTenant, setContactTenant] = useState<Tenant | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [placeholderAction, setPlaceholderAction] = useState<TenantPlaceholderAction | null>(null)
  const [placeholderOpen, setPlaceholderOpen] = useState(false)

  const handleViewDetails = (tenant: Tenant) => {
    setDetailTenant(tenant)
    setDetailOpen(true)
  }

  const handleEdit = (tenant: Tenant) => {
    setEditTenant(tenant)
    setEditOpen(true)
  }

  const handleRecordContact = (tenant: Tenant) => {
    setContactTenant(tenant)
    setContactOpen(true)
  }

  const handlePlaceholder = (action: TenantPlaceholderAction) => {
    setPlaceholderAction(action)
    setPlaceholderOpen(true)
  }

  const filteredTenants = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tenants.filter((tenant) => {
      const matchesSearch =
        query.length === 0 ||
        tenant.name.toLowerCase().includes(query) ||
        tenant.phone.toLowerCase().includes(query) ||
        tenant.roomNumber.toLowerCase().includes(query)
      const matchesFloor = floorFilter === "all" || tenant.floor === floorFilter
      const matchesStatus = statusFilter === "all" || tenant.status === statusFilter
      return matchesSearch && matchesFloor && matchesStatus
    })
  }, [tenants, search, floorFilter, statusFilter])

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อ / เบอร์โทร / ห้อง..."
              className="rounded-xl pl-8"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className="gap-1.5 rounded-xl bg-background/80" />}
              >
                <ListFilter className="size-3.5 text-muted-foreground" />
                {floorFilter === "all" ? "ทุกชั้น/โซน" : `ชั้น ${floorFilter}`}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={String(floorFilter)}
                  onValueChange={(value) =>
                    setFloorFilter(value === "all" ? "all" : Number(value))
                  }
                >
                  <DropdownMenuRadioItem value="all">ทุกชั้น/โซน</DropdownMenuRadioItem>
                  {tenantFloors.map((floor) => (
                    <DropdownMenuRadioItem key={floor} value={String(floor)}>
                      ชั้น {floor}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className="gap-1.5 rounded-xl bg-background/80" />}
              >
                <ListFilter className="size-3.5 text-muted-foreground" />
                {statusFilter === "all" ? "ทุกสถานะ" : tenantStatusConfig[statusFilter].label}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  <DropdownMenuRadioItem value="all">ทุกสถานะ</DropdownMenuRadioItem>
                  {(Object.keys(tenantStatusConfig) as TenantStatus[]).map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {tenantStatusConfig[status].label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-0.5 rounded-xl border border-border/60 bg-background/80 p-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="มุมมองการ์ด"
                aria-pressed={view === "grid"}
                className={cn("rounded-lg", view === "grid" && "bg-muted text-foreground")}
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="มุมมองตาราง"
                aria-pressed={view === "table"}
                className={cn("rounded-lg", view === "table" && "bg-muted text-foreground")}
                onClick={() => setView("table")}
              >
                <Table2 className="size-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-[13px] text-muted-foreground">
        แสดง {filteredTenants.length} จาก {tenants.length} ผู้เช่า
      </p>

      {filteredTenants.length === 0 ? (
        <Card className="rounded-2xl border-dashed border-border/70 bg-muted/20">
          <CardContent className="flex flex-col items-center gap-1 py-10 text-center">
            <p className="text-sm font-medium">ไม่พบผู้เช่าที่ตรงกับเงื่อนไข</p>
            <p className="text-[13px] text-muted-foreground">
              ลองปรับคำค้นหาหรือตัวกรองใหม่อีกครั้ง
            </p>
          </CardContent>
        </Card>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onRecordContact={handleRecordContact}
              onPlaceholder={handlePlaceholder}
            />
          ))}
        </div>
      ) : (
        <TenantTable
          tenants={filteredTenants}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onRecordContact={handleRecordContact}
          onPlaceholder={handlePlaceholder}
        />
      )}

      <TenantDetailSheet
        tenant={detailTenant}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
        onRecordContact={handleRecordContact}
        onPlaceholder={handlePlaceholder}
      />
      <TenantEditDialog
        key={editTenant?.id}
        tenant={editTenant}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <TenantContactDialog
        key={contactTenant?.id}
        tenant={contactTenant}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
      <TenantPlaceholderDialog
        content={placeholderAction ? tenantPlaceholderCopy[placeholderAction] : null}
        open={placeholderOpen}
        onOpenChange={setPlaceholderOpen}
      />
    </div>
  )
}
