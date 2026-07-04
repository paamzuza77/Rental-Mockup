import { Gauge } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function MeterReadingsPage() {
  return (
    <PagePlaceholder
      icon={Gauge}
      titleTh="ค่าน้ำค่าไฟ"
      titleEn="Meter Readings"
      descriptionTh="บันทึกเลขมิเตอร์น้ำ-ไฟ และคำนวณค่าใช้จ่ายอัตโนมัติ จะแสดงที่นี่"
    />
  )
}
