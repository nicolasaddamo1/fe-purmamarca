"use client";

import Link from "next/link";
import React from "react";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  priceOnSale?: number;
  available?: boolean;
  imageUrl: string;
  categoryName: string;
  stock?: number | string;
  description?: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  priceOnSale,
  available = true,
  imageUrl,
  categoryName,
  stock,
  description,
}) => {
  const isAvailable = Boolean(available);

  return (
    <div
      className={`group flex flex-col justify-between rounded-lg outline-1 w-64 md:w-56 h-auto hover:shadow-2xl duration-200
        ${
          isAvailable
            ? "outline-[#76644c67] hover:outline-[#76644c]"
            : "outline-neutral-400 hover:outline-neutral-700"
        }
        ${!isAvailable ? "opacity-60" : ""} bg-white`}
    >
      {/* Imagen */}
      <div className={`${isAvailable ? "bg-[#dbc7ab]" : "bg-gray-200"} w-full`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={imageUrl}
          alt={name}
          title={name}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-start gap-1 px-3 py-2 w-full font-medium">
        {/* Nombre */}
        <Link href={`/productos/detalle/${id}`} title={name} className="w-full">
          <h5 className="text-chocolate text-lg md:text-xl truncate">{name}</h5>
        </Link>

        {/* Precio */}
        <div
          className={`text-base md:text-2xl font-semibold ${
            isAvailable ? "text-primary" : "text-gray-800"
          }`}
        >
          {priceOnSale ? (
            <div className="flex items-center gap-1">
              <span>${Number(priceOnSale).toLocaleString()}</span>
              <del className="text-gray-500 md:text-xs text-sm">
                ${Number(price).toLocaleString()}
              </del>
            </div>
          ) : (
            <p>${Number(price).toLocaleString()}</p>
          )}
        </div>

        {/* Stock */}
        <p className={`${isAvailable ? "text-primary" : "text-red-600"}`}>
          {isAvailable
            ? `Stock: ${stock ?? "No especificado"}`
            : "Stock: Agotado"}
        </p>

        {/* Descripción */}
        {description && (
          <p className="w-full overflow-hidden text-gray-600 text-xs md:text-xs text-ellipsis whitespace-nowrap">
            {description}
          </p>
        )}
      </div>

      {/* Botón Ver Más */}
      <Link
        href={`/productos/detalle/${id}`}
        className="self-center bg-gray-200/60 hover:bg-chocolate group-hover:bg-chocolate/80 m-2 px-4 py-1 rounded-sm text-gray-600 group-hover:text-white transition-all duration-200"
      >
        Ver Más
      </Link>
    </div>
  );
};

export default Product;
