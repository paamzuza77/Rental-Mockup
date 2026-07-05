import type { Tenant } from "@/lib/mock-tenants"

export type TenantDocumentCategory =
  | "identity"
  | "lease"
  | "payment-proof"
  | "move-in-photo"
  | "move-out-photo"
  | "guarantor"
  | "extra-photo"

export type TenantDocumentStatus = "complete" | "pending-review" | "expired" | "needs-update"

export type TenantDocumentFileType = "PDF" | "JPG" | "PNG" | "WEBP"

export type TenantDocument = {
  id: string
  category: TenantDocumentCategory
  fileName: string
  fileType: TenantDocumentFileType
  uploadDate: string
  fileSize: string
  status: TenantDocumentStatus
}

export const tenantDocumentCategories: TenantDocumentCategory[] = [
  "identity",
  "lease",
  "payment-proof",
  "move-in-photo",
  "move-out-photo",
  "guarantor",
  "extra-photo",
]

export const tenantDocumentCategoryConfig: Record<TenantDocumentCategory, { label: string }> = {
  identity: { label: "เอกสารยืนยันตัวตน" },
  lease: { label: "สัญญาเช่า" },
  "payment-proof": { label: "หลักฐานการชำระเงิน / เงินประกัน" },
  "move-in-photo": { label: "รูปถ่ายห้องวันเข้าอยู่" },
  "move-out-photo": { label: "รูปถ่ายห้องวันย้ายออก" },
  guarantor: { label: "เอกสารผู้ค้ำประกัน" },
  "extra-photo": { label: "รูปภาพเพิ่มเติม" },
}

export const tenantDocumentStatusConfig: Record<
  TenantDocumentStatus,
  { label: string; badge: string }
> = {
  complete: {
    label: "ครบถ้วน",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  "pending-review": {
    label: "รอตรวจสอบ",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  expired: {
    label: "หมดอายุ",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  "needs-update": {
    label: "ต้องอัปเดต",
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
}

export const TENANT_DOCUMENT_LIMIT = 20
export const TENANT_DOCUMENT_MAX_SIZE_MB = 100

function buildBaseDocuments(tenant: Tenant): TenantDocument[] {
  const docs: TenantDocument[] = [
    {
      id: `${tenant.id}-identity-1`,
      category: "identity",
      fileName: `บัตรประชาชน_${tenant.name}.jpg`,
      fileType: "JPG",
      uploadDate: tenant.leaseStart,
      fileSize: "1.8 MB",
      status: "complete",
    },
    {
      id: `${tenant.id}-identity-2`,
      category: "identity",
      fileName: `ทะเบียนบ้าน_${tenant.name}.pdf`,
      fileType: "PDF",
      uploadDate: tenant.leaseStart,
      fileSize: "890 KB",
      status: "complete",
    },
    {
      id: `${tenant.id}-lease-1`,
      category: "lease",
      fileName: `สัญญาเช่า_${tenant.roomNumber}.pdf`,
      fileType: "PDF",
      uploadDate: tenant.leaseStart,
      fileSize: "2.1 MB",
      status: tenant.status === "ending-soon" ? "expired" : "complete",
    },
    {
      id: `${tenant.id}-payment-1`,
      category: "payment-proof",
      fileName: `สลิปเงินประกัน_${tenant.roomNumber}.jpg`,
      fileType: "JPG",
      uploadDate: tenant.leaseStart,
      fileSize: "1.2 MB",
      status: tenant.status === "overdue" ? "needs-update" : "complete",
    },
    {
      id: `${tenant.id}-movein-1`,
      category: "move-in-photo",
      fileName: "สภาพห้อง_ก่อนเข้าอยู่_1.jpg",
      fileType: "JPG",
      uploadDate: tenant.leaseStart,
      fileSize: "3.4 MB",
      status: "complete",
    },
    {
      id: `${tenant.id}-movein-2`,
      category: "move-in-photo",
      fileName: "สภาพห้อง_ก่อนเข้าอยู่_2.jpg",
      fileType: "JPG",
      uploadDate: tenant.leaseStart,
      fileSize: "3.1 MB",
      status: "complete",
    },
    {
      id: `${tenant.id}-guarantor-1`,
      category: "guarantor",
      fileName: `บัตรประชาชนผู้ค้ำ_${tenant.roomNumber}.jpg`,
      fileType: "JPG",
      uploadDate: tenant.leaseStart,
      fileSize: "1.5 MB",
      status: "pending-review",
    },
  ]

  if (tenant.status === "moved-out") {
    docs.push(
      {
        id: `${tenant.id}-moveout-1`,
        category: "move-out-photo",
        fileName: "สภาพห้อง_วันย้ายออก_1.jpg",
        fileType: "JPG",
        uploadDate: tenant.leaseEnd,
        fileSize: "2.8 MB",
        status: "complete",
      },
      {
        id: `${tenant.id}-moveout-2`,
        category: "move-out-photo",
        fileName: "สภาพห้อง_วันย้ายออก_2.jpg",
        fileType: "JPG",
        uploadDate: tenant.leaseEnd,
        fileSize: "2.6 MB",
        status: "complete",
      }
    )
  }

  if (tenant.status === "overdue") {
    docs.push({
      id: `${tenant.id}-extra-1`,
      category: "extra-photo",
      fileName: "แจ้งเตือนค้างชำระ_แนบภาพ.jpg",
      fileType: "JPG",
      uploadDate: tenant.lastContact.date,
      fileSize: "980 KB",
      status: "pending-review",
    })
  }

  return docs
}

export function getMockTenantDocuments(tenant: Tenant): TenantDocument[] {
  const docs = buildBaseDocuments(tenant)

  if (tenant.id === "t-a101") {
    const extraCount = TENANT_DOCUMENT_LIMIT - docs.length
    for (let i = 0; i < extraCount; i++) {
      docs.push({
        id: `${tenant.id}-extra-filler-${i}`,
        category: "extra-photo",
        fileName: `รูปภาพเพิ่มเติม_${i + 1}.jpg`,
        fileType: "JPG",
        uploadDate: tenant.leaseStart,
        fileSize: "1.1 MB",
        status: "complete",
      })
    }
  }

  return docs
}
