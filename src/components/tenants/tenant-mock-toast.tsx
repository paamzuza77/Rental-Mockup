"use client"

import { createContext, useCallback, useContext, useRef, useState } from "react"
import { Info } from "lucide-react"

type ToastState = { id: number; message: string } | null

const TenantMockToastContext = createContext<((message: string) => void) | null>(null)

export function TenantMockToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const id = Date.now()
    setToast({ id, message })
    timeoutRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
    }, 3200)
  }, [])

  return (
    <TenantMockToastContext.Provider value={showToast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4 sm:justify-end sm:pr-6">
        {toast ? (
          <div className="pointer-events-auto flex max-w-sm items-start gap-2 rounded-xl border border-border/60 bg-foreground px-3.5 py-2.5 text-background shadow-lg">
            <Info className="mt-0.5 size-4 shrink-0 text-background/70" />
            <p className="text-[13px] leading-snug">{toast.message}</p>
          </div>
        ) : null}
      </div>
    </TenantMockToastContext.Provider>
  )
}

export function useTenantMockToast() {
  const showToast = useContext(TenantMockToastContext)
  if (!showToast) {
    throw new Error("useTenantMockToast must be used within TenantMockToastProvider")
  }
  return showToast
}
