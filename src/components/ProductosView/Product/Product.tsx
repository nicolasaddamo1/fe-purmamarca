"use client";

import Link from "next/link";
import React from "react";
import type { IPromotion } from "@/interfaces/promotionsInterface";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  priceOnSale?: number;
  onSale?: boolean;
  available?: boolean;
  imageUrl: string;
  categoryName: string;
  promotion: IPromotion | null;
  stock?: number | string;
  description?: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  price,
  priceOnSale,
  onSale = false,
  available = true,
  imageUrl,
  categoryName,
  promotion,
  stock,
}) => {
  const isAvailable: boolean = Boolean(available);

  const isPromotionActive: boolean = React.useMemo(() => {
    if (!promotion || promotion.promo_percentage == null) return false;
    const now = new Date();
    const start = new Date(promotion.start_date);
    const end = new Date(promotion.expiration_date);

    return now >= start && now <= end && Number(promotion.promo_percentage) > 0;
  }, [promotion]);

  const isCategoryPromo: boolean = React.useMemo(() => {
    // Comprueba si el nombre de la categoría (en minúsculas) es 'promo' o 'promos'
    const validPromotions: Set<string> = new Set(["promo", "promos"]);
    return validPromotions.has(categoryName.toLowerCase());
  }, [categoryName]);

  const discountedPrice: number | null = React.useMemo<number | null>(() => {
    if (!isPromotionActive || !promotion) return null;
    const pct: number = Number(promotion.promo_percentage ?? 0);
    const discounted: number = price * (1 - pct / 100);
    // Redondear a 2 decimales
    return Math.round(discounted * 100) / 100;
  }, [isPromotionActive, promotion, price]);

  // displayPrice puede ser el precio con descuento, el precio de oferta manual, o el precio original
  const displayPrice: number = discountedPrice ?? priceOnSale ?? price;

  return (
    <div
      className={`group flex flex-col justify-between rounded-lg outline-1 w-64 md:w-56 h-auto m-auto hover:shadow-2xl duration-200
        ${
          isAvailable
            ? "outline-[#76644c67] hover:outline-[#76644c]"
            : "outline-neutral-400 hover:outline-neutral-700"
        }
        ${!isAvailable ? "opacity-60" : ""} bg-white`}
    >
      <div
        className={`${
          isAvailable ? "bg-[#dbc7ab]" : "bg-gray-200"
        } w-full relative`}
      >
        {/* Lógica del Badge: Ahora prioriza: 1. Promo Especial, 2. Promoción Global, 3. Oferta Manual */}
        {isAvailable && (onSale || isPromotionActive || isCategoryPromo) && (
          <div className="top-2 left-2 z-10 absolute bg-red-600 shadow px-2 py-1 rounded-sm font-bold text-white text-xs">
            {isCategoryPromo ? (
              <span>🏷️ PROMO ESPECIAL</span>
            ) : isPromotionActive ? (
              // Prioridad 2: Promoción Global (activa por fechas)
              <span>🔥 OFERTA {promotion?.name?.toUpperCase() ?? ""}</span>
            ) : (
              // Prioridad 3: Oferta Manual (solo si onSale es true)
              <span>🔥 OFERTA</span>
            )}
          </div>
        )}

        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={imageUrl}
          alt={name}
          title={name}
        />
      </div>

      <div className="flex flex-col items-start gap-1 px-3 py-2 w-full font-medium">
        <Link href={`/productos/detalle/${id}`} title={name} className="w-full">
          <h5 className="text-chocolate text-lg md:text-xl truncate">{name}</h5>
        </Link>

        <div
          className={`text-3xl md:text-2xl font-semibold flex items-center gap-2 ${
            isAvailable ? "text-primary" : "text-gray-800"
          }`}
        >
          {/* PRIMER CASO: Descuento por promoción global (discountedPrice) */}
          {discountedPrice != null ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span>
                  $
                  {discountedPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </span>

                {/* Condición de TACHADO: SOLO si el precio descontado es estrictamente menor al original */}
                {discountedPrice < price && (
                  <del className="text-gray-500 md:text-xs text-lg">
                    ${price.toLocaleString()}
                  </del>
                )}

                {promotion?.promo_percentage && (
                  <span className="font-bold text-red-600 text-sm">
                    -{promotion.promo_percentage}%
                  </span>
                )}
              </div>
            </div>
          ) : priceOnSale != null ? (
            /* SEGUNDO CASO: Precio de oferta manual (priceOnSale) */
            <div className="flex items-center gap-2">
              <span>${Number(priceOnSale).toLocaleString()}</span>

              {/* Condición de TACHADO: SOLO si el precio de oferta es estrictamente menor al original */}
              {Number(priceOnSale) < price && (
                <del className="text-gray-500 md:text-xs text-lg">
                  ${price.toLocaleString()}
                </del>
              )}
            </div>
          ) : (
            /* TERCER CASO: Precio normal */
            <p>${Number(price).toLocaleString()}</p>
          )}
        </div>
      </div>

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
