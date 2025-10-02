"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/app/axios/ProductosApi";
import type { IProduct } from "@/interfaces/productInterface";

const SkeletonCard = () => {
  return (
    <div className="bg-tertiary/10 shadow-md rounded-xl w-64 h-80 animate-pulse">
      <div className="bg-primary/25 rounded-t-xl h-40" />
      <div className="space-y-3 p-4">
        <div className="bg-primary/25 rounded w-3/4 h-4" />
        <div className="bg-primary/25 rounded w-1/2 h-4" />
        <div className="bg-primary/25 mt-4 rounded w-1/3 h-6" />
      </div>
    </div>
  );
};

const StarProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: IProduct[] = await getAllProducts();
        setProducts(data.slice(0, 3));
      } catch (error) {
        // TODO agregar toast
        console.error("Error al traer las imagenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto px-4 text-center container">
        <h3 className="mb-4 font-semibold text-secondary text-2xl">
          Nuestros productos Estrellas
        </h3>
        <p className="mx-auto mb-8 max-w-xl text-maroon text-2xl md:text-3xl">
          Productos seleccionados con la mejor calidad y cercanía para vos.
        </p>

        <div className="flex flex-wrap justify-center gap-20">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={parseInt(product.id)}
                  title={product.name}
                  price={
                    product.onSale && product.priceOnSale
                      ? product.priceOnSale
                      : product.price
                  }
                  rate={0} // TODO: valor por defecto
                  image={product.imgs[0] || "/placeholder.jpg"}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default StarProduct;
