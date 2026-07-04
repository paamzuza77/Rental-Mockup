import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/app-sidebar";
import { BackgroundDecor } from "@/components/background-decor";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบจัดการหอพัก/ห้องเช่า",
  description: "All-in-one rental & dormitory management (mock UI)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <BackgroundDecor />
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="!bg-transparent">
              <SiteHeader />
              <div className="flex w-full max-w-[1440px] flex-1 flex-col gap-5 p-4 md:gap-7 md:p-6 lg:gap-8 lg:p-8">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
