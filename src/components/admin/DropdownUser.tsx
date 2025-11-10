"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { HiChevronDown } from "react-icons/hi";
import { useAuthActions } from "@/store/useStore";
import { MdOutlineLogout } from "react-icons/md";

export default function DropdownUser() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { handleLogoutAndClearStorage } = useAuthActions();

  const handleLogout = () => {
    handleLogoutAndClearStorage();

    router.push("/");

    toast.info("Sesión cerrada correctamente.");

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 text-primary cursor-pointer"
      >
        <span className="font-semibold group-hover:scale-105 transition-transform duration-200 ease-out">
          Administrador
        </span>
        <HiChevronDown
          className={`w-5 h-5 transition-transform duration-200 ease-out group-hover:scale-105 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="right-0 z-50 absolute bg-white shadow-lg mt-2 p-2 rounded-md w-40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded w-full font-medium text-red-600 text-left cursor-pointer"
          >
            <MdOutlineLogout size={18} />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
