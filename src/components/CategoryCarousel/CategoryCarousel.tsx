"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Category from "@/components/ProductosView/Category/Category";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface CategoryCarouselProps {
  categories: {
    id: string;
    name: string;
    categoryImage?: string | null;
  }[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  // Incluye la categoría "Todos" al principio
  const allCategories = [
    { id: "todos", name: "Todos", categoryImage: "/logopurma.png" },
    ...categories,
  ];

  const totalPages = Math.ceil(allCategories.length / itemsPerPage);
  const start = page * itemsPerPage;
  const visible = allCategories.slice(start, start + itemsPerPage);

  const nextPage = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className="relative flex flex-col items-center mx-auto w-full max-w-[1200px]">
      {/* Botones laterales */}
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

      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex justify-center items-center gap-4 py-6"
          >
            {visible.map((cat) => (
              <Category
                key={cat.id}
                id={cat.id}
                name={cat.name}
                imageUrl={cat.categoryImage ?? ""}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-2">
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
    </div>
  );
};

export default CategoryCarousel;
