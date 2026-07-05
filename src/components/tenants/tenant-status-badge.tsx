import { Badge } from "@/components/ui/badge"
import { tenantStatusConfig, type TenantStatus } from "@/lib/mock-tenants"
import { cn } from "@/lib/utils"

export function TenantStatusBadge({
  status,
  className,
}: {
  status: TenantStatus
  className?: string
}) {
  const config = tenantStatusConfig[status]
  return (
    <Badge className={cn("gap-1 text-[11px]", config.badge, className)}>
      <config.icon className="size-3" />
      {config.label}
    </Badge>
  )
}
