import { Settings } from "lucide-react"
import { PagePlaceholder } from "@/components/page-placeholder"

export default function SettingsPage() {
  return (
    <PagePlaceholder
      icon={Settings}
      titleTh="ตั้งค่า"
      titleEn="Settings"
      descriptionTh="ตั้งค่าทรัพย์สิน ผู้ใช้งาน และสิทธิ์การเข้าถึง จะแสดงที่นี่"
    />
  )
}
