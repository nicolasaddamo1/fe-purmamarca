// components/NavBar/AdminDropdown.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore"; // Asegúrate de que useStore sea importable

interface AdminDropdownProps {
  onLogout: () => void;
  userName: string;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({
  onLogout,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="Menú de Administrador"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none text-white/90 hover:text-primary transition-colors cursor-pointer"
      >
        <FaUserCircle size={24} className="text-white md:text-chocolate" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="top-full right-0 z-[1000] absolute bg-white shadow-xl mt-3 border border-gray-200 rounded-lg w-48 overflow-hidden"
          >
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <span className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 text-chocolate transition-colors">
                <MdOutlineDashboard size={18} />
                Dashboard
              </span>
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 hover:bg-red-50 px-4 py-2 w-full text-red-500 text-left transition-colors cursor-pointer"
            >
              <MdOutlineLogout size={18} />
              Cerrar Sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDropdown;
