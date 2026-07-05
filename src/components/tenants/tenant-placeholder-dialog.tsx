"use client"

import { Construction } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function TenantPlaceholderDialog({
  content,
  open,
  onOpenChange,
}: {
  content: { title: string; message: string } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!content) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-1 flex size-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Construction className="size-4" />
          </div>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>เข้าใจแล้ว</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
