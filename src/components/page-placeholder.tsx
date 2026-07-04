import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PagePlaceholderProps = {
  icon: LucideIcon
  titleTh: string
  titleEn: string
  descriptionTh: string
}

export function PagePlaceholder({
  icon: Icon,
  titleTh,
  titleEn,
  descriptionTh,
}: PagePlaceholderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{titleTh}</h1>
          <p className="text-sm text-muted-foreground">{titleEn}</p>
        </div>
        <Badge variant="secondary">ข้อมูลตัวอย่าง (Mock)</Badge>
      </div>

      <Card className="rounded-2xl border-dashed border-border/70 bg-muted/20">
        <CardHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Icon className="size-6" />
          </div>
          <CardTitle>หน้านี้ยังอยู่ระหว่างการพัฒนา</CardTitle>
          <CardDescription>
            {descriptionTh}
            <br />
            This screen is a placeholder for the {titleEn} module — no real
            data or backend yet.
          </CardDescription>
        </CardHeader>
        <CardContent />
      </Card>
    </div>
  )
}
