"use client";

import NavbarAdm from "@/components/admin/NavbarAdm";
import SidebarAdm from "@/components/admin/SidebarAdm";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col bg-gray-50 h-screen">
      <NavbarAdm sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <SidebarAdm open={sidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
