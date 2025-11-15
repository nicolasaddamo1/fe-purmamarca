"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useCategoryStore } from "@/store/categoryStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5"; // Iconos para una UX más moderna
import { BiCategory } from "react-icons/bi"; // Icono de Categorías

const CategorySidebar = () => {
  const { category } = useParams();
  // Se asume que 'chocolate' y 'primary' son colores definidos en Tailwind
  const categoryId = Array.isArray(category) ? category[0] : category;
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { categories } = useCategoryStore();

  useEffect(() => setMounted(true), []);

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="z-[999] fixed inset-0">
          {/* Overlay Oscuro */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Principal */}
          <motion.aside
            className="top-0 left-0 fixed flex flex-col bg-white shadow-2xl w-[80%] max-w-xs h-full"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Encabezado Fijo y Estético */}
            <header className="top-0 sticky flex justify-between items-center bg-primary/70 shadow-sm p-4 border-gray-100 border-b">
              <h2 className="flex items-center gap-2 font-extrabold text-white text-xl tracking-wide">
                <BiCategory className="w-6 h-6" />
                Categorías
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full text-white/90 transition-colors"
                aria-label="Cerrar menú de categorías"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </header>

            {/* Lista de Categorías con Scroll Separado */}
            <ul className="flex flex-col flex-grow gap-1 p-3 w-full overflow-y-auto">
              {/* Enlace: Todas las categorías */}
              <li
                className={`rounded-lg transition-colors duration-200 ${
                  !categoryId || categoryId === "todos"
                    ? "bg-primary shadow-md text-white font-bold"
                    : "text-primary hover:bg-primary/10 font-medium"
                }`}
              >
                <Link
                  href="/productos/categoria/todos"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-md decoration-0 ${
                    !categoryId || categoryId === "todos"
                      ? "text-white"
                      : "text-primary"
                  }`}
                >
                  Todas
                </Link>
              </li>

              {/* Mapeo de Categorías */}
              {categories?.map((obj) => (
                <li
                  key={obj.id}
                  className={`rounded-lg transition-colors duration-200 ${
                    categoryId === obj.id
                      ? "bg-primary shadow-md text-white font-bold"
                      : "text-primary hover:bg-primary/10 font-medium"
                  }`}
                >
                  <Link
                    href={`/productos/categoria/${obj.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-md decoration-0 ${
                      categoryId === obj.id ? "text-white" : "text-primary"
                    }`}
                  >
                    {obj.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 hover:bg-primary/20 p-2 rounded-lg font-bold text-white/90 hover:text-white tracking-wider transition-colors duration-300 cursor-pointer"
      >
        <IoMenu className="w-5 h-5" />
        CATEGORÍAS
      </div>

      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
};

export default CategorySidebar;
