import { Users } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function TenantsPage() {
  return (
    <PagePlaceholder
      icon={Users}
      titleTh="ผู้เช่า"
      titleEn="Tenants"
      descriptionTh="ข้อมูลผู้เช่า เบอร์ติดต่อ เลขบัตรประชาชน วันเข้า-ออก จะแสดงที่นี่"
    />
  )
}
