"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useProductStore } from "@/store/productsStore";
import { getAllProducts } from "@/app/axios/ProductosApi";

const GalleryProducts: React.FC = () => {
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      getAllProducts()
        .then(setProducts)
        .catch(() => {});
    }
  }, [products.length, setProducts]);

  const galleryItems = useMemo(() => {
    const imgs: string[] = [];

    products.forEach((p) => {
      if (p.imgs?.length) imgs.push(...p.imgs);
    });

    if (imgs.length === 0) return [];

    const shuffled = [...imgs].sort(() => Math.random() - 0.5);

    const base = shuffled.slice(0, 15);

    const spans = ["row-span-1", "row-span-2"];

    const items = base.map((src) => ({
      src,
      span: spans[Math.floor(Math.random() * spans.length)],
    }));

    const units = items.reduce(
      (acc, item) => acc + (item.span === "row-span-2" ? 2 : 1),
      0
    );

    const cols = 6;

    const remainder = units % cols;

    if (remainder !== 0) {
      const needed = cols - remainder;
      for (let i = 0; i < needed; i++) {
        items.push({
          src: shuffled[Math.floor(Math.random() * shuffled.length)],
          span: "row-span-1",
        });
      }
    }

    return items;
  }, [products]);

  if (galleryItems.length === 0) {
    return (
      <div className="py-16 font-medium text-primary text-center">
        Cargando productos...
      </div>
    );
  }

  return (
    <section className="bg-[#f6e4d4] py-10">
      <div className="gap-2 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 auto-rows-[70px] md:auto-rows-[90px] lg:auto-rows-[110px] mx-auto px-4 max-w-7xl">
        {galleryItems.map((item, i) => (
          <div key={i} className={`overflow-hidden rounded-lg ${item.span}`}>
            <Image
              src={item.src}
              alt="Producto"
              width={400}
              height={400}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryProducts;
