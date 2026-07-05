export type TenantPlaceholderAction = "view-lease" | "view-billing" | "move-out"

export const tenantPlaceholderCopy: Record<
  TenantPlaceholderAction,
  { title: string; message: string }
> = {
  "view-lease": {
    title: "ดูสัญญาเช่า",
    message: "ฟีเจอร์ดูสัญญาเช่าจะทำต่อในหน้า สัญญาเช่า ตอนนี้เป็น mock UI เท่านั้น",
  },
  "view-billing": {
    title: "ดูบิลและการชำระเงิน",
    message: "ฟีเจอร์ดูบิลและการชำระเงินจะทำต่อในหน้า บิลค่าเช่า และ การชำระเงิน ตอนนี้เป็น mock UI เท่านั้น",
  },
  "move-out": {
    title: "ย้ายออก",
    message: "ฟีเจอร์ย้ายออกจะทำต่อหลังจากหน้า สัญญาเช่า และ ห้องพัก เชื่อมข้อมูลกันแล้ว ตอนนี้เป็น mock UI เท่านั้น",
  },
}
