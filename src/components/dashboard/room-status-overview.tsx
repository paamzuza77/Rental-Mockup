import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const segments = [
  { key: "vacant", label: "ว่าง", count: 2, color: "bg-emerald-500" },
  { key: "occupied", label: "มีผู้เช่า", count: 14, color: "bg-indigo-500" },
  { key: "overdue", label: "ค้างชำระ", count: 2, color: "bg-rose-500" },
  { key: "maintenance", label: "ปิดซ่อม", count: 1, color: "bg-amber-500" },
  { key: "cleaning", label: "รอทำความสะอาด", count: 1, color: "bg-sky-500" },
]

const total = segments.reduce((sum, s) => sum + s.count, 0)

export function RoomStatusOverview() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm [--card-spacing:--spacing(5)]">
      <CardHeader>
        <CardTitle>ภาพรวมห้องพักตามสถานะ</CardTitle>
        <CardDescription>ทั้งหมด {total} ห้อง</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          {segments.map((s) => (
            <div
              key={s.key}
              className={s.color}
              style={{ width: `${(s.count / total) * 100}%` }}
              title={`${s.label}: ${s.count}`}
            />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
          {segments.map((s) => (
            <li key={s.key} className="flex items-center gap-2 text-sm">
              <span className={`size-2 shrink-0 rounded-full ${s.color}`} />
              <span className="text-muted-foreground">{s.label}</span>
              <span className="ml-auto font-medium tabular-nums">{s.count}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
