import { RoomsPageHeader } from "@/components/rooms/rooms-page-header"
import { RoomSummaryCards } from "@/components/rooms/room-summary-cards"
import { RoomExplorer } from "@/components/rooms/room-explorer"
import { rooms } from "@/lib/mock-rooms"

export default function RoomsPage() {
  return (
    <div className="flex flex-col gap-7 md:gap-8">
      <RoomsPageHeader />
      <RoomSummaryCards />
      <RoomExplorer rooms={rooms} />
    </div>
  )
}
