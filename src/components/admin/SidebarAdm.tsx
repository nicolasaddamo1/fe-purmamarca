"use client";
import { HiPlus, HiHome, HiCube, HiCollection } from "react-icons/hi";

interface Props {
  open: boolean;
}

export default function SidebarAdm({ open }: Props) {
  return (
    <aside
      className={` bg-chocolate/10 border-r border-chocolate/30 transition-all duration-300 ${
        open ? "w-60" : "w-20"
      } h-screen overflow-hidden`}
    >
      <div className="flex flex-col gap-4 p-4">
        <button className="flex items-center gap-2 bg-chocolate/90 hover:bg-chocolate/80 px-3 py-2 rounded-md text-white transition cursor-pointer">
          <HiPlus className="w-5 h-5" /> {open && "Nuevo producto"}
        </button>
        <nav className="flex flex-col gap-2 mt-6">
          <button className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer">
            <HiHome className="w-5 h-5 text-primary/90" /> {open && "Dashboard"}
          </button>
          <button className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer">
            <HiCube className="w-5 h-5 text-primary/90" /> {open && "Productos"}
          </button>
          <button className="flex items-center gap-3 hover:bg-chocolate/10 px-3 py-2 rounded-md transition cursor-pointer">
            <HiCollection className="w-5 h-5 text-primary/90" />{" "}
            {open && "Categorías"}
          </button>
        </nav>
      </div>
    </aside>
  );
}
