"use client";
import React from "react";
import { useProductStore } from "@/store/productsStore";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  size: string;
  description: string;
  available?: boolean;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  stock,
  size,
  description,
  available,
  image,
}) => {
  const product = useProductStore((s) => s.products.find((p) => p.id === id));

  // 🔹 Usa el available del prop si existe, y si no, el del store
  const isAvailable = product?.available ?? available ?? true;
  const isInStock = stock > 0 && isAvailable;

  return (
    <div
      className={`bg-white shadow-md hover:shadow-xl border border-chocolate/30 rounded-lg w-64 h-auto overflow-hidden transition-shadow duration-300 cursor-pointer ${
        !isInStock ? "opacity-60" : ""
      }`}
    >
      <img src={image} alt={name} className="w-full h-46 object-cover" />
      <div className="p-4 text-left">
        <h4 className="mb-1 font-semibold text-chocolate text-lg">{name}</h4>
        <p className="mb-1 font-bold text-primary text-xl">${price}</p>
        <p className="mb-1 text-chocolate/80">
          Stock:{" "}
          {!isAvailable ? (
            <span className="text-red-500">No disponible</span>
          ) : stock > 0 ? (
            stock
          ) : (
            <span className="text-red-500">No disponible</span>
          )}
        </p>
        <p className="mb-1 text-chocolate/80">Tamaño: {size}</p>
        <p className="text-chocolate/60 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
