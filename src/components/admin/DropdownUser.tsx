"use client";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function DropdownUser() {
  const [open, setOpen] = useState(false);

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
        <div className="right-0 absolute bg-white shadow-lg mt-2 p-2 border rounded-md w-40">
          <button className="hover:bg-gray-100 px-2 py-1 rounded w-full text-left">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
