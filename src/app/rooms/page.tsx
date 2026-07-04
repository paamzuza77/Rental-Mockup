import { DoorOpen } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function RoomsPage() {
  return (
    <PagePlaceholder
      icon={DoorOpen}
      titleTh="ห้องพัก"
      titleEn="Rooms"
      descriptionTh="รายการห้องพัก สถานะห้อง (ว่าง/มีผู้เช่า/ซ่อมบำรุง) จะแสดงที่นี่"
    />
  )
}
