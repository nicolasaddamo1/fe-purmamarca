"use client";

import React, { useEffect, useState } from "react";
import AdBanner from "@/components/ProductosView/AdBanner/AdBanner";
import Category from "@/components/ProductosView/Category/Category";
import HeadSection from "@/components/ProductosView/HeadOfSection/HeadSection";
import Product from "@/components/ProductosView/Product/Product";
import PromoCarousel from "@/components/ProductosView/PromosCarousel/PromoCarousel";
import { useProductStore } from "@/store/productsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { getAllCategories } from "@/app/axios/categoriasApi";
import { getAllProducts } from "@/app/axios/ProductosApi";

const Page: React.FC = () => {
  const { categories, setCategories } = useCategoryStore();
  const { products, setProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!categories.length) {
          const fetchedCategories = await getAllCategories();
          setCategories(fetchedCategories);
        }
        if (!products.length) {
          const fetchedProducts = await getAllProducts();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [categories.length, products.length, setCategories, setProducts]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { query, pathname } = (
        e as CustomEvent<{ query: string; pathname: string }>
      ).detail;

      if (pathname === "/") {
        setSearchQuery(query.toLowerCase());
      }
    };
    window.addEventListener("nav:search", handler as EventListener);
    return () =>
      window.removeEventListener("nav:search", handler as EventListener);
  }, []);

  const displayProducts = products.filter((prod) => {
    if (!searchQuery.trim()) return true;
    const text = searchQuery.trim().toLowerCase();
    return (
      prod.name.toLowerCase().includes(text) ||
      (prod.description ?? "").toLowerCase().includes(text) ||
      prod.category?.name.toLowerCase().includes(text)
    );
  });

  return (
    <div className="md:pt-32">
      <PromoCarousel />

      <section className="flex flex-col gap-6 md:px-4 py-10">
        {/* Sidebar de categorías */}
        <div className="hidden md:block">
          <HeadSection
            verMas={false}
            link="/home"
            name="Observa nuestras"
            highlight="Categorías"
          />
          <div className="flex flex-row justify-start items-center gap-4 p-6 w-full max-w-[1200px] overflow-x-scroll no-scrollbar">
            <Category id="todos" name="Todos" imageUrl="/logopurma.png" />
            {categories.map((cat) => (
              <Category
                key={cat.id}
                id={cat.id}
                name={cat.name}
                imageUrl={cat.categoryImage ?? ""}
              />
            ))}
          </div>
        </div>

        {/* Productos */}
        <HeadSection
          verMas={false}
          link="/productos/categoria/any"
          name="Obten los mejores productos al"
          highlight="mejor precio"
        />
        <div className="gap-6 grid grid-cols-1 md:grid-cols-5 md:p-4 w-full">
          {displayProducts.map((prod) => (
            <Product
              key={prod.id}
              id={prod.id}
              available={prod.available}
              priceOnSale={prod.priceOnSale}
              name={prod.name}
              price={prod.price}
              imageUrl={prod.imgs?.[0] ?? ""}
              categoryName={prod.category?.name ?? ""}
              stock={prod.stock}
              description={prod.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
