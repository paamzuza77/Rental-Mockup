"use client"

import { Building2, ChevronDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RoomsPageHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            ห้องพัก
          </h1>
          <p className="text-sm text-muted-foreground">
            จัดการสถานะห้อง ค่าเช่า และผู้เช่าปัจจุบัน
          </p>
        </div>

        <Button className="gap-1.5 rounded-xl">
          <Plus className="size-4" />
          เพิ่มห้องพัก
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="gap-2 rounded-xl bg-background/80" />}
          >
            <Building2 className="size-4 text-muted-foreground" />
            หอพักสุขสันต์ อพาร์ทเมนท์
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>หอพักสุขสันต์ อพาร์ทเมนท์</DropdownMenuItem>
            <DropdownMenuItem disabled>+ เพิ่มทรัพย์สิน (เร็วๆ นี้)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="gap-2 rounded-xl bg-background/80" />}
          >
            กรกฎาคม 2569
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>กรกฎาคม 2569</DropdownMenuItem>
            <DropdownMenuItem>มิถุนายน 2569</DropdownMenuItem>
            <DropdownMenuItem>พฤษภาคม 2569</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
