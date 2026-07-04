import { BarChart3 } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function ReportsPage() {
  return (
    <PagePlaceholder
      icon={BarChart3}
      titleTh="รายงาน"
      titleEn="Reports"
      descriptionTh="รายงานอัตราการเข้าพัก ยอดค้างชำระ และสรุปรายได้ จะแสดงที่นี่"
    />
  )
}
