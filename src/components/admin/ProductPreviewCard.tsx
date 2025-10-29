"use client";

import React from "react";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { IoImagesSharp } from "react-icons/io5";

const ProductPreviewCard: React.FC = () => {
  const product = useProductCreationStore();

  return (
    <div className="bg-white shadow-md hover:shadow-xl border border-chocolate/30 rounded-lg w-64 h-auto overflow-hidden transition-shadow duration-300 cursor-pointer">
      {product.imgPreviews.length > 0 ? (
        <img
          src={product.imgPreviews[0]}
          alt={product.name || "Preview"}
          className="w-full h-46 object-cover"
        />
      ) : (
        <div className="flex flex-col justify-center items-center bg-gray-200 w-full h-46">
          <IoImagesSharp className="w-10 h-10 text-chocolate/50" />
          <span className="ml-2 text-chocolate/50">Sin imagen</span>
        </div>
      )}

      <div className="p-4 text-left">
        <h4 className="mb-1 font-semibold text-chocolate text-lg">
          {product.name || "Sin nombre"}
        </h4>
        <p className="mb-1 font-bold text-primary text-xl">
          ${product.price || 0}
        </p>
        <p className="mb-1 text-chocolate/80">Stock: {product.stock || 0}</p>
        <p className="mb-1 text-chocolate/80">
          Tamaño: {product.size || "No definido"}
        </p>
        <p className="text-chocolate/60 text-sm line-clamp-3">
          {product.description || "Sin descripción"}
        </p>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
