import { Badge } from "@/components/ui/badge"
import { roomStatusConfig, type RoomStatus } from "@/lib/mock-rooms"
import { cn } from "@/lib/utils"

export function RoomStatusBadge({
  status,
  className,
}: {
  status: RoomStatus
  className?: string
}) {
  const config = roomStatusConfig[status]
  return (
    <Badge className={cn("gap-1 text-[11px]", config.badge, className)}>
      <config.icon className="size-3" />
      {config.label}
    </Badge>
  )
}
