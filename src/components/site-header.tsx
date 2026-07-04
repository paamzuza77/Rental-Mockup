"use client"

import { usePathname } from "next/navigation"
import { Bell, LogOut, Settings, User } from "lucide-react"

import { navItems } from "@/lib/nav"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const current =
    navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    ) ?? navItems[0]

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:px-6">
      <SidebarTrigger className="rounded-lg" />
      <Separator orientation="vertical" className="h-5" />
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <current.icon className="size-4" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{current.labelTh}</span>
          <span className="text-xs text-muted-foreground">{current.labelEn}</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative rounded-lg"
          aria-label="การแจ้งเตือน"
        >
          <Bell />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-rose-500" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="gap-2 rounded-lg px-2" />}>
            <Avatar className="size-7 ring-2 ring-indigo-500/15">
              <AvatarFallback className="bg-indigo-500/10 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                สจ
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:inline">สมชาย ใจดี</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>สมชาย ใจดี</span>
                <span className="text-xs font-normal text-muted-foreground">
                  เจ้าของหอพัก (Owner)
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              โปรไฟล์ของฉัน
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              ตั้งค่า
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
