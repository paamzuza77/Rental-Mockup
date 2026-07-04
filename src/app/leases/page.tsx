import { FileText } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function LeasesPage() {
  return (
    <PagePlaceholder
      icon={FileText}
      titleTh="สัญญาเช่า"
      titleEn="Leases"
      descriptionTh="ระยะเวลาสัญญา ค่าเช่า เงินประกัน จะแสดงที่นี่"
    />
  )
}
