export type RoomPlaceholderAction =
  | "create-invoice"
  | "record-payment"
  | "report-maintenance"
  | "assign-tenant"
  | "move-out-tenant"
  | "disable-room"

export const roomPlaceholderCopy: Record<
  RoomPlaceholderAction,
  { title: string; message: string }
> = {
  "create-invoice": {
    title: "สร้างบิล",
    message: "ฟีเจอร์สร้างบิลจะทำต่อในหน้า บิลค่าเช่า ตอนนี้เป็น mock UI เท่านั้น",
  },
  "record-payment": {
    title: "บันทึกการชำระเงิน",
    message: "ฟีเจอร์บันทึกการชำระเงินจะทำต่อในหน้า การชำระเงิน ตอนนี้เป็น mock UI เท่านั้น",
  },
  "report-maintenance": {
    title: "แจ้งซ่อม",
    message: "ฟีเจอร์แจ้งซ่อมจะทำต่อในหน้า งานซ่อม ตอนนี้เป็น mock UI เท่านั้น",
  },
  "assign-tenant": {
    title: "เพิ่ม/เปลี่ยนผู้เช่า",
    message: "ฟีเจอร์เพิ่ม/เปลี่ยนผู้เช่าจะทำต่อในหน้า ผู้เช่า และ สัญญาเช่า ตอนนี้เป็น mock UI เท่านั้น",
  },
  "move-out-tenant": {
    title: "ย้ายผู้เช่าออก",
    message: "ฟีเจอร์ย้ายผู้เช่าออกจะทำต่อหลังจากหน้า ผู้เช่า และ สัญญาเช่า พร้อมแล้ว ตอนนี้เป็น mock UI เท่านั้น",
  },
  "disable-room": {
    title: "ปิดใช้งานห้อง",
    message: "ฟีเจอร์ปิดใช้งานห้องจะทำจริงหลังจากมี database และ permission แล้ว ตอนนี้เป็น mock UI เท่านั้น",
  },
}
