"use client";

import React from "react";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  rate: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  rate,
  image,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rate);

  return (
    <div className="bg-background shadow-md hover:shadow-xl border border-secondary rounded-lg w-64 h-80 overflow-hidden transition-shadow duration-300 cursor-pointer">
      <img src={image} alt={title} className="w-full h-46 object-cover" />
      <div className="p-6 text-left">
        <h4 className="mb-2 font-semibold text-chocolate text-lg">{title}</h4>
        <p className="mb-2 font-bold text-primary text-2xl">${price}</p>
        <div className="flex items-center">
          {stars.map((filled, idx) => (
            <svg
              key={idx}
              className="w-4 h-4 text-chocolate"
              fill={filled ? "currentColor" : "none"}
              stroke={filled ? "none" : "currentColor"}
              strokeWidth={0.5}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.068 9.384c-.784-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
