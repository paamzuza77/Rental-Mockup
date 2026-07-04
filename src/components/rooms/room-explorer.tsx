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
import { RoomCard } from "@/components/rooms/room-card"
import { RoomTable } from "@/components/rooms/room-table"
import { RoomDetailSheet } from "@/components/rooms/room-detail-sheet"
import { RoomEditDialog } from "@/components/rooms/room-edit-dialog"
import { RoomStatusDialog } from "@/components/rooms/room-status-dialog"
import { RoomMeterDialog } from "@/components/rooms/room-meter-dialog"
import { RoomHistoryDialog } from "@/components/rooms/room-history-dialog"
import { RoomPlaceholderDialog } from "@/components/rooms/room-placeholder-dialog"
import { floors, roomStatusConfig, type Room, type RoomStatus } from "@/lib/mock-rooms"
import { roomPlaceholderCopy, type RoomPlaceholderAction } from "@/lib/room-actions"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "table"
type FloorFilter = "all" | number
type StatusFilter = "all" | RoomStatus

export function RoomExplorer({ rooms }: { rooms: Room[] }) {
  const [search, setSearch] = useState("")
  const [floorFilter, setFloorFilter] = useState<FloorFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [view, setView] = useState<ViewMode>("grid")

  const [detailRoom, setDetailRoom] = useState<Room | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [editRoom, setEditRoom] = useState<Room | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [statusRoom, setStatusRoom] = useState<Room | null>(null)
  const [statusOpen, setStatusOpen] = useState(false)
  const [meterRoom, setMeterRoom] = useState<Room | null>(null)
  const [meterOpen, setMeterOpen] = useState(false)
  const [historyRoom, setHistoryRoom] = useState<Room | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [placeholderAction, setPlaceholderAction] = useState<RoomPlaceholderAction | null>(null)
  const [placeholderOpen, setPlaceholderOpen] = useState(false)

  const handleViewDetails = (room: Room) => {
    setDetailRoom(room)
    setDetailOpen(true)
  }

  const handleEdit = (room: Room) => {
    setEditRoom(room)
    setEditOpen(true)
  }

  const handleChangeStatus = (room: Room) => {
    setStatusRoom(room)
    setStatusOpen(true)
  }

  const handleMeterReading = (room: Room) => {
    setMeterRoom(room)
    setMeterOpen(true)
  }

  const handleViewHistory = (room: Room) => {
    setHistoryRoom(room)
    setHistoryOpen(true)
  }

  const handlePlaceholder = (action: RoomPlaceholderAction) => {
    setPlaceholderAction(action)
    setPlaceholderOpen(true)
  }

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase()
    return rooms.filter((room) => {
      const matchesSearch =
        query.length === 0 ||
        room.roomNumber.toLowerCase().includes(query) ||
        (room.tenant?.toLowerCase().includes(query) ?? false)
      const matchesFloor = floorFilter === "all" || room.floor === floorFilter
      const matchesStatus = statusFilter === "all" || room.status === statusFilter
      return matchesSearch && matchesFloor && matchesStatus
    })
  }, [rooms, search, floorFilter, statusFilter])

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาเลขห้องหรือชื่อผู้เช่า..."
              className="rounded-xl pl-8"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" className="gap-1.5 rounded-xl bg-background/80" />}
              >
                <ListFilter className="size-3.5 text-muted-foreground" />
                {floorFilter === "all" ? "ทุกชั้น" : `ชั้น ${floorFilter}`}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={String(floorFilter)}
                  onValueChange={(value) =>
                    setFloorFilter(value === "all" ? "all" : Number(value))
                  }
                >
                  <DropdownMenuRadioItem value="all">ทุกชั้น</DropdownMenuRadioItem>
                  {floors.map((floor) => (
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
                {statusFilter === "all" ? "ทุกสถานะ" : roomStatusConfig[statusFilter].label}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  <DropdownMenuRadioItem value="all">ทุกสถานะ</DropdownMenuRadioItem>
                  {(Object.keys(roomStatusConfig) as RoomStatus[]).map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {roomStatusConfig[status].label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-0.5 rounded-xl border border-border/60 bg-background/80 p-0.5">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="มุมมองตาราง (การ์ด)"
                aria-pressed={view === "grid"}
                className={cn(
                  "rounded-lg",
                  view === "grid" && "bg-muted text-foreground"
                )}
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="มุมมองตาราง (รายการ)"
                aria-pressed={view === "table"}
                className={cn(
                  "rounded-lg",
                  view === "table" && "bg-muted text-foreground"
                )}
                onClick={() => setView("table")}
              >
                <Table2 className="size-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-[13px] text-muted-foreground">
        แสดง {filteredRooms.length} จาก {rooms.length} ห้อง
      </p>

      {filteredRooms.length === 0 ? (
        <Card className="rounded-2xl border-dashed border-border/70 bg-muted/20">
          <CardContent className="flex flex-col items-center gap-1 py-10 text-center">
            <p className="text-sm font-medium">ไม่พบห้องที่ตรงกับเงื่อนไข</p>
            <p className="text-[13px] text-muted-foreground">
              ลองปรับคำค้นหาหรือตัวกรองใหม่อีกครั้ง
            </p>
          </CardContent>
        </Card>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onChangeStatus={handleChangeStatus}
              onMeterReading={handleMeterReading}
              onViewHistory={handleViewHistory}
              onPlaceholder={handlePlaceholder}
            />
          ))}
        </div>
      ) : (
        <RoomTable
          rooms={filteredRooms}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onChangeStatus={handleChangeStatus}
          onMeterReading={handleMeterReading}
          onViewHistory={handleViewHistory}
          onPlaceholder={handlePlaceholder}
        />
      )}

      <RoomDetailSheet
        room={detailRoom}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
        onChangeStatus={handleChangeStatus}
        onMeterReading={handleMeterReading}
        onViewHistory={handleViewHistory}
        onPlaceholder={handlePlaceholder}
      />
      <RoomEditDialog
        key={editRoom?.id}
        room={editRoom}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <RoomStatusDialog
        key={statusRoom?.id}
        room={statusRoom}
        open={statusOpen}
        onOpenChange={setStatusOpen}
      />
      <RoomMeterDialog
        key={meterRoom?.id}
        room={meterRoom}
        open={meterOpen}
        onOpenChange={setMeterOpen}
      />
      <RoomHistoryDialog room={historyRoom} open={historyOpen} onOpenChange={setHistoryOpen} />
      <RoomPlaceholderDialog
        content={placeholderAction ? roomPlaceholderCopy[placeholderAction] : null}
        open={placeholderOpen}
        onOpenChange={setPlaceholderOpen}
      />
    </div>
  )
}
