"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TenantAddDialog } from "@/components/tenants/tenant-add-dialog"

export function TenantsPageHeader() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผู้เช่า
        </h1>
        <p className="text-sm text-muted-foreground">
          จัดการข้อมูลผู้เช่า สถานะสัญญา และการติดต่อทั้งหมดในที่เดียว
        </p>
      </div>

      <Button className="gap-1.5 rounded-xl" onClick={() => setAddOpen(true)}>
        <UserPlus className="size-4" />
        เพิ่มผู้เช่า
      </Button>

      <TenantAddDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
