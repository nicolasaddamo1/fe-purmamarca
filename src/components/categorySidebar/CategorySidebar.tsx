"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useCategoryStore } from "@/store/categoryStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoClose, IoMenu } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";

const CategorySidebar = () => {
  const { category } = useParams();
  const categoryId = Array.isArray(category) ? category[0] : category;
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { categories } = useCategoryStore();
  useEffect(() => setMounted(true), []);

  const sortedCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];
    const promoIndex = categories.findIndex((c) => /promo/i.test(c.name));
    if (promoIndex === -1) return categories;
    const promoCat = categories[promoIndex];
    const others = categories.filter((_, i) => i !== promoIndex);
    return [promoCat, ...others];
  }, [categories]);

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="z-[999] fixed inset-0">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="top-0 left-0 fixed flex flex-col bg-white shadow-2xl w-[80%] max-w-xs h-full"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
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

            <ul className="flex flex-col flex-grow gap-1 p-3 w-full overflow-y-auto">
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

              {sortedCategories.map((obj) => {
                const isPromo = /promo/i.test(obj.name);
                const isActive = categoryId === obj.id;

                return (
                  <li
                    key={obj.id}
                    className={`rounded-lg transition-colors duration-200 border
        ${
          isActive
            ? "bg-primary shadow-md text-white font-bold border-primary"
            : isPromo
            ? "bg-orange-100 text-orange-700 hover:bg-orange-200 font-semibold border-orange-300"
            : "text-primary hover:bg-primary/10 font-medium border-transparent"
        }
      `}
                  >
                    <Link
                      href={`/productos/categoria/${obj.id}`}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 text-md decoration-0
          ${
            isActive
              ? "text-white"
              : isPromo
              ? "text-orange-700"
              : "text-primary"
          }
        `}
                    >
                      {obj.name}
                    </Link>
                  </li>
                );
              })}
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
