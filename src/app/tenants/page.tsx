import { TenantsPageHeader } from "@/components/tenants/tenants-page-header"
import { TenantSummaryCards } from "@/components/tenants/tenant-summary-cards"
import { TenantExplorer } from "@/components/tenants/tenant-explorer"
import { tenants } from "@/lib/mock-tenants"

export default function TenantsPage() {
  return (
    <div className="flex flex-col gap-7 md:gap-8">
      <TenantsPageHeader />
      <TenantSummaryCards />
      <TenantExplorer tenants={tenants} />
    </div>
  )
}
