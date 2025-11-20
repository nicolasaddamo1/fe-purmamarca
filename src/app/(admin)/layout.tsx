"use client";

import NavbarAdm from "@/components/admin/NavbarAdm";
import SidebarAdm from "@/components/admin/SidebarAdm";
import { useState, Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col bg-gray-50 h-screen">
      <Suspense fallback={<div className="h-[70px] bg-chocolate/10" />}>
        <NavbarAdm sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </Suspense>

      <div className="flex flex-1 overflow-hidden">
        <SidebarAdm open={sidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
