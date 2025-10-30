"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useCategoryStore } from "@/store/categoryStore";
import Link from "next/link";
import { useParams } from "next/navigation";

const CategorySidebar = () => {
  const { category } = useParams();
  const categoryId = Array.isArray(category) ? category[0] : category;
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { categories } = useCategoryStore();

  useEffect(() => setMounted(true), []);

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="z-[999] fixed inset-0">
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="top-0 left-0 fixed flex flex-col bg-white shadow-xl w-[70%] md:w-80 h-full"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <header className="flex justify-between items-center p-4">
              <h2 className="font-semibold text-black text-xl tracking-wide">
                Categorías
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="font-extrabold text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </header>

            <ul className="flex flex-col gap-2 m-0 p-2 w-full overflow-y-scroll">
              <li
                className={`hover:bg-chocolate/30 tracking-wide font-semibold duration-200 ${
                  !categoryId ? "bg-chocolate text-white" : "text-black"
                }`}
              >
                <Link
                  href="/productos/categoria/todos"
                  onClick={() => setIsOpen(false)}
                  className="flex px-2 py-1 text-md decoration-0"
                >
                  Todos
                </Link>
              </li>

              {categories?.map((obj) => (
                <li
                  key={obj.id}
                  className={`hover:bg-chocolate/30 tracking-wide font-semibold duration-200 ${
                    categoryId === obj.id
                      ? "bg-chocolate text-white"
                      : "text-black"
                  }`}
                >
                  <Link
                    href={`/productos/categoria/${obj.id}`}
                    onClick={() => setIsOpen(false)}
                    className="flex px-2 py-1 text-md decoration-0"
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
        className="group relative text-white/70 hover:text-primary transition-colors duration-300 cursor-pointer"
      >
        CATEGORÍAS
      </div>

      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
};

export default CategorySidebar;
