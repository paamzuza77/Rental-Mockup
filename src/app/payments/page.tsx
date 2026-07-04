import { Wallet } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function PaymentsPage() {
  return (
    <PagePlaceholder
      icon={Wallet}
      titleTh="การชำระเงิน"
      titleEn="Payments"
      descriptionTh="ประวัติการชำระเงิน (เงินสด/โอน/PromptPay) และใบเสร็จ จะแสดงที่นี่"
    />
  )
}
