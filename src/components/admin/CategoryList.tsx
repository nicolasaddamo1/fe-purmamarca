"use client";

import React from "react";
import CategoryCard from "./CategoryCard";
import { ICategory } from "@/app/axios/categoriasApi"; // usamos un solo origen

interface CategoryListProps {
  categories: ICategory[];
  onEdit?: (category: ICategory) => void;
  onDelete?: (category: ICategory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  if (categories.length === 0) {
    return (
      <p className="mt-10 text-gray-500 text-center">
        No hay categorías todavía 😅
      </p>
    );
  }

  return (
    <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryList;
