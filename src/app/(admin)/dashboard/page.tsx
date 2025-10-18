"use client";

import { useSidebarStore } from "@/store/useSidebarStore";
import ProductPreviewCard from "@/components/admin/ProductPreviewCard";
import CardAdm from "@/components/admin/CardAdm";

export default function AdminPage() {
  const { sidebarView } = useSidebarStore();

  if (sidebarView === "newProduct") {
    return (
      <div className="space-y-4">
        <h2 className="flex justify-center font-semibold text-primary/90 text-3xl text-center">
          Vista previa del producto
        </h2>
        <div className="flex justify-center bg-primary/10 p-8 rounded-2xl">
          <ProductPreviewCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-semibold text-primary/90 text-4xl">Hola, Natalia</h1>
      <p className="flex justify-center font-semibold text-chocolate/60 text-2xl text-center">
        ¿Qué deseas hacer hoy?
      </p>
      <CardAdm />
    </div>
  );
}
