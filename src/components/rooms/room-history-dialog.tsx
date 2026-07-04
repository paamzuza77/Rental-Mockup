"use client"

import {
  DoorOpen,
  Gauge,
  Receipt,
  RefreshCcw,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getRoomHistory, type Room, type RoomHistoryEventType } from "@/lib/mock-rooms"
import { cn } from "@/lib/utils"

const eventStyle: Record<RoomHistoryEventType, { icon: LucideIcon; tone: string }> = {
  "move-in": { icon: DoorOpen, tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  meter: { icon: Gauge, tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  invoice: { icon: Receipt, tone: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  payment: { icon: Wallet, tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  maintenance: { icon: Wrench, tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  status: { icon: RefreshCcw, tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
}

export function RoomHistoryDialog({
  room,
  open,
  onOpenChange,
}: {
  room: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!room) return null

  const events = getRoomHistory(room)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>ประวัติห้อง {room.roomNumber}</DialogTitle>
          <DialogDescription>
            ไทม์ไลน์ความเคลื่อนไหวของห้องนี้ (ข้อมูลตัวอย่างสำหรับ mock UI)
          </DialogDescription>
        </DialogHeader>

        {events.length > 0 ? (
          <ul className="flex max-h-96 flex-col gap-4 overflow-y-auto pr-1">
            {events.map((event, index) => {
              const style = eventStyle[event.type]
              return (
                <li key={event.id} className="relative flex gap-3">
                  {index < events.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-8 left-4 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 bg-border"
                    />
                  )}
                  <span
                    className={cn(
                      "z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                      style.tone
                    )}
                  >
                    <style.icon className="size-3.5" />
                  </span>
                  <div className="flex flex-1 flex-col pb-0.5">
                    <span className="text-sm font-medium">{event.label}</span>
                    <span className="text-[13px] text-muted-foreground">{event.detail}</span>
                    <span className="text-[12px] text-muted-foreground">{event.date}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-border/70 px-3.5 py-6 text-center text-[13px] text-muted-foreground">
            ยังไม่มีประวัติสำหรับห้องนี้
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
