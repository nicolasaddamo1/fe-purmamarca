"use client";

import React from "react";
import ProductCardAdm from "./ProductCardAdm";
import { IProduct } from "@/interfaces/productInterface";

interface ProductListProps {
  products: IProduct[];
  onEdit?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <p className="mt-10 text-gray-500 text-center">
        No hay productos todavía 😅
      </p>
    );
  }

  return (
    <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCardAdm
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
