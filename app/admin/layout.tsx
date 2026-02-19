"use client"

import Sidebar from "@/components/admin/Sidebar"
import Topbar from "@/components/admin/Topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        
        <div style={{ padding: 30 }}>
          {children}
        </div>
      </div>

    </div>
  )
}
