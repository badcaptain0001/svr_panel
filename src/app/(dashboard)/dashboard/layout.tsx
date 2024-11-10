import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <Header />
      <main className="flex-1 items-center gap-2 px-4 pt-14">
        {children}
      </main>
      <Toaster />
    </SidebarInset>
  </SidebarProvider>
  )
}
