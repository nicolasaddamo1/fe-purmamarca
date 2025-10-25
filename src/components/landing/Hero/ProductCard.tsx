"use client";

import React from "react";

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
  return (
    <div className="bg-white shadow-md hover:shadow-xl border border-chocolate/30 rounded-lg w-64 h-80 overflow-hidden transition-shadow duration-300 cursor-pointer">
      <img src={image} alt={name} className="w-full h-46 object-cover" />
      <div className="p-4 text-left">
        <h4 className="mb-1 font-semibold text-chocolate text-lg">{name}</h4>
        <p className="mb-1 font-bold text-primary text-xl">${price}</p>
        <p className="mb-1 text-chocolate/80">Stock: {stock}</p>
        <p className="mb-1 text-chocolate/80">Tamaño: {size}</p>
        <p className="text-chocolate/60 text-sm line-clamp-3">{description}</p>
        {/* TODO: Ver como manejamos esto */}
        {available !== undefined && (
          <p className="mt-1 font-semibold text-green-600">
            {available ? "Disponible" : "No disponible"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
