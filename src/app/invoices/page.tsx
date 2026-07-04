import { Receipt } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function InvoicesPage() {
  return (
    <PagePlaceholder
      icon={Receipt}
      titleTh="บิลค่าเช่า"
      titleEn="Invoices"
      descriptionTh="บิลรวมค่าเช่า ค่าน้ำ ค่าไฟ และค่าเฟอร์นิเจอร์ จะแสดงที่นี่"
    />
  )
}
