"use client";

import {
  HiPlus,
  HiHome,
  HiCube,
  HiCollection,
  HiTag,
  HiChartBar,
} from "react-icons/hi";
import SidebarNewProduct from "./SidebarNewProduct";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
}

export default function SidebarAdm({ open }: Props) {
  const { sidebarView, setSidebarView } = useSidebarStore();
  const router = useRouter();

  if (sidebarView === "newProduct") return <SidebarNewProduct />;

  const handleNewProductClick = () => {
    // 1. Activa la vista del formulario de producto en el sidebar (reemplaza la navegación)
    setSidebarView("newProduct");
    // 2. Redirige a /dashboard, donde se mostrará el ProductPreviewCard en el contenido principal.
    router.push("/dashboard");
  };

  return (
    <aside
      className={`bg-chocolate/10 border-r border-chocolate/30 transition-all duration-300 ${
        open ? "w-60" : "w-20"
      } h-screen overflow-hidden`}
    >
      <div className="flex flex-col gap-4 p-4 py-10">
        {/* Botón para crear producto (Ahora redirige a /dashboard) */}
        <button
          onClick={handleNewProductClick}
          className="flex items-center gap-2 bg-chocolate/90 hover:bg-chocolate/80 px-3 py-2 rounded-md text-white transition cursor-pointer"
        >
          <HiPlus className="w-5 h-5" /> {open && "Nuevo producto"}
        </button>

        {/* Navegación principal */}
        <nav className="flex flex-col gap-2 mt-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <HiHome className="w-5 h-5 text-primary/90" /> {open && "Home"}
          </button>

          <button
            onClick={() => router.push("/dashboard/productos")}
            className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <HiCube className="w-5 h-5 text-primary/90" /> {open && "Productos"}
          </button>

          <button
            onClick={() => router.push("/dashboard/categorias")}
            className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <HiCollection className="w-5 h-5 text-primary/90" />{" "}
            {open && "Categorías"}
          </button>

          {/* Nuevo botón: Promociones */}
          <button
            onClick={() => router.push("/dashboard/promociones")}
            className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <HiTag className="w-5 h-5 text-primary/90" />{" "}
            {open && "Promociones"}
          </button>

          {/* Nuevo botón: Dashboard */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer"
          >
            <HiChartBar className="w-5 h-5 text-primary/90" />{" "}
            {open && "Dashboard"}
          </button>
        </nav>
      </div>
    </aside>
  );
}
