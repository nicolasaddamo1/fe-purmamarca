"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "@/components/ProductosView/Category/Category";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { LiaSearchSolid } from "react-icons/lia";
import { useRouter, usePathname } from "next/navigation";

interface CategoryCarouselProps {
  categories: {
    id: string;
    name: string;
    categoryImage?: string | null;
  }[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [page, setPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const maxMobileCategories = 6;

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Resetear el estado de expansión cuando cambia a desktop
  useEffect(() => {
    if (isDesktop) {
      setShowAllMobile(false);
    }
  }, [isDesktop]);

  const promoSet = new Set(["promo", "promos", "promoción", "promociones"]);

  const normalized = categories.map((c) => ({
    ...c,
    normalized: c.name.toLowerCase().trim(),
  }));

  const promosFound = normalized.filter((c) => promoSet.has(c.normalized));

  const uniquePromo =
    promosFound.length > 0
      ? {
          id: promosFound[0].id,
          name: "Promos",
          categoryImage: promosFound[0].categoryImage ?? null,
        }
      : null;

  const nonPromos = normalized.filter((c) => !promoSet.has(c.normalized));

  const allCategories = [
    { id: "todos", name: "Todos", categoryImage: "/logopurma.png" },
    ...(uniquePromo ? [uniquePromo] : []),
    ...nonPromos,
  ];

  const totalPages = Math.ceil(allCategories.length / itemsPerPage);
  const start = page * itemsPerPage;
  const visible = allCategories.slice(start, start + itemsPerPage);

  const nextPage = () => page < totalPages - 1 && setPage((p) => p + 1);
  const prevPage = () => page > 0 && setPage((p) => p - 1);

  // Filtrar categorías por búsqueda
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCategories;
    }
    const query = searchQuery.trim().toLowerCase();
    return allCategories.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );
  }, [allCategories, searchQuery]);

  const categoriesToRender = useMemo(() => {
    if (isDesktop) {
      return visible;
    }
    
    // Si hay búsqueda activa, mostrar todas las categorías filtradas
    if (searchQuery.trim()) {
      return filteredCategories;
    }
    
    // En mobile: mostrar solo 6 si no se ha expandido, o todas si se expandió
    if (showAllMobile || allCategories.length <= maxMobileCategories) {
      return allCategories;
    }
    return allCategories.slice(0, maxMobileCategories);
  }, [isDesktop, visible, allCategories, showAllMobile, filteredCategories, searchQuery]);

  const motionKey = isDesktop ? page : "grid";

  const motionProps = isDesktop
    ? {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.4, ease: "easeInOut" as const },
      }
    : {};

  return (
    <div className="relative flex flex-col items-center mx-auto px-4 md:px-0 w-full max-w-[1200px]">
      <div className="hidden md:block">
        {page > 0 && (
          <button
            onClick={prevPage}
            className="top-1/2 left-0 z-10 absolute bg-primary/80 hover:bg-primary shadow-md p-2 rounded-full transition -translate-y-1/2 cursor-pointer"
          >
            <HiChevronLeft className="text-white text-4xl" />
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            onClick={nextPage}
            className="top-1/2 -right-12 z-10 absolute bg-primary/80 hover:bg-primary shadow-md p-2 rounded-full transition -translate-y-1/2 cursor-pointer"
          >
            <HiChevronRight className="text-white text-4xl" />
          </button>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={motionKey}
            {...motionProps}
            className="flex flex-wrap md:flex-nowrap justify-around md:justify-center items-stretch gap-4 py-6"
          >
            {categoriesToRender.map((cat) => (
              <div
                key={cat.id}
                className="flex-shrink-0 w-[calc(50%-10px)] md:w-auto"
              >
                <Category
                  id={cat.id}
                  name={cat.name}
                  imageUrl={cat.categoryImage ?? ""}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="hidden md:flex gap-2 mt-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === page ? "bg-primary scale-110" : "bg-red-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Botón "Ver más" solo en mobile cuando hay más de 6 categorías */}
      {!isDesktop && allCategories.length > maxMobileCategories && !showAllMobile && !searchQuery.trim() && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAllMobile(true)}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Ver más
          </button>
        </div>
      )}

      {/* Campo de búsqueda solo en mobile */}
      {!isDesktop && (
        <div className="flex justify-center mt-4 w-full px-4">
          <div className="relative flex items-center w-full max-w-sm">
            <LiaSearchSolid className="left-3 absolute text-gray-400 text-xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar una categoría"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="right-3 absolute text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
