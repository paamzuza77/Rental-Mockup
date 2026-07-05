export type ContactAttachmentStatus = "attached" | "pending-review"

export type ContactAttachment = {
  id: string
  fileName: string
  uploadDate: string
  uploadTime: string
  fileSize: string
  status: ContactAttachmentStatus
}

export const contactAttachmentStatusConfig: Record<
  ContactAttachmentStatus,
  { label: string; badge: string }
> = {
  attached: {
    label: "แนบแล้ว",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  "pending-review": {
    label: "รอตรวจสอบ",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
}

export const CONTACT_ATTACHMENT_LIMIT = 20
export const CONTACT_ATTACHMENT_MAX_SIZE_MB = 50

export function getMockContactAttachments(tenant: {
  name: string
  lastContact: { date: string; time: string }
}): ContactAttachment[] {
  return [
    {
      id: "slip",
      fileName: `สลิปโอนเงิน_${tenant.name}.jpg`,
      uploadDate: tenant.lastContact.date,
      uploadTime: tenant.lastContact.time,
      fileSize: "1.4 MB",
      status: "attached",
    },
    {
      id: "line-chat",
      fileName: "แชทไลน์_แจ้งปัญหา.png",
      uploadDate: tenant.lastContact.date,
      uploadTime: tenant.lastContact.time,
      fileSize: "820 KB",
      status: "pending-review",
    },
    {
      id: "room-condition",
      fileName: "สภาพห้องที่แจ้ง.jpg",
      uploadDate: tenant.lastContact.date,
      uploadTime: tenant.lastContact.time,
      fileSize: "2.2 MB",
      status: "attached",
    },
  ]
}
