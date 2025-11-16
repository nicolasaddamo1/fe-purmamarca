"use client";

import React, { useState, useRef, useEffect } from "react";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { useCategoryStore } from "@/store/categoryStore";
import { HiChevronDown } from "react-icons/hi";

const CategoryDropdown: React.FC = () => {
  const { categories } = useCategoryStore();
  const product = useProductCreationStore();
  const setField = product.setField;

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50 w-full"
      >
        {product.categoryName ? product.categoryName : "Seleccionar categoría"}
        <HiChevronDown className="w-5 h-5 text-chocolate/70" />
      </button>

      {open && (
        <div className="z-50 absolute bg-white shadow-lg mt-1 border border-chocolate/20 rounded-md w-full max-h-48 overflow-y-auto">
          {categories.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setField("categoryId", c.id);
                setField("categoryName", c.name);
                setOpen(false);
              }}
              className="hover:bg-chocolate/10 px-3 py-2 cursor-pointer"
            >
              {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
