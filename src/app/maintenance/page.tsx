import { Wrench } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function MaintenancePage() {
  return (
    <PagePlaceholder
      icon={Wrench}
      titleTh="งานซ่อม"
      titleEn="Maintenance"
      descriptionTh="รายการแจ้งซ่อม สถานะงาน และผู้รับผิดชอบ จะแสดงที่นี่"
    />
  )
}
