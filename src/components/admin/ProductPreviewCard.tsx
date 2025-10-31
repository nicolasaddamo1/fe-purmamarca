"use client";

import React from "react";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { IoImagesSharp } from "react-icons/io5";

const ProductPreviewCard: React.FC = () => {
  const product = useProductCreationStore();

  // Determinar si hay oferta y precio a mostrar
  const isOnSale =
    product.onSale &&
    product.priceOnSale &&
    product.priceOnSale < product.price;
  const displayPrice = isOnSale ? product.priceOnSale : product.price;

  return (
    <div className="relative bg-white shadow-md hover:shadow-xl border border-chocolate/30 rounded-lg w-64 h-auto overflow-hidden transition-shadow duration-300 cursor-pointer">
      <div className="relative">
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

        {/* Badge de descuento */}
        {isOnSale && (
          <div className="top-2 left-2 absolute bg-red-600 px-2 py-1 rounded-md font-bold text-white text-xs">
            -
            {Math.round(
              ((product.price - product.priceOnSale!) / product.price) * 100
            )}
            %
          </div>
        )}
      </div>

      <div className="p-4 text-left">
        <h4 className="mb-1 font-semibold text-chocolate text-lg">
          {product.name || "Sin nombre"}
        </h4>

        {/* Precio */}
        <div className="flex items-center gap-2 mb-1 font-bold text-primary text-xl">
          {isOnSale ? (
            <>
              <span className="text-chocolate/60 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-600">${displayPrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${displayPrice.toFixed(2)}</span>
          )}
        </div>

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
