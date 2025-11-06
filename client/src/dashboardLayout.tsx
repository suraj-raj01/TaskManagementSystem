import { Outlet } from "react-router-dom"
import { AppSidebar } from "./components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "./components/ui/sidebar"
import Header from "./components/Header"

export default function dashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
          <Header/>
        <div className="flex flex-1 flex-col gap-4 p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
