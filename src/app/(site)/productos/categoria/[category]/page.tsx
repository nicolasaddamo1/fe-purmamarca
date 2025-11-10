"use client";

import React, { useEffect, useState } from "react";
import { useProductStore } from "@/store/productsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { IProduct } from "@/interfaces/productInterface";
import Product from "@/components/ProductosView/Product/Product";
import Category from "@/components/ProductosView/Category/Category";
import HeadSection from "@/components/ProductosView/HeadOfSection/HeadSection";
import { getAllCategories } from "@/app/axios/categoriasApi";
import { getAllProducts } from "@/app/axios/ProductosApi";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const Page: React.FC = () => {
  const { category } = useParams();
  const catId = category ?? "todos";
  const { categories, setCategories } = useCategoryStore();
  const { products, setProducts } = useProductStore();
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (!categories?.length) {
          const catData = await getAllCategories();
          setCategories(catData);
        }
        if (!products?.length) {
          const prodData = await getAllProducts();
          setProducts(prodData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!products?.length) return;
    if (catId === "todos") setData(products);
    else setData(products.filter((p) => p.categoryId === catId));
  }, [catId, products]);

  const catData = categories.find((cat) => cat.id === catId);

  return (
    <div className="py-10 md:pt-36">
      <section className="hidden md:inline">
        <HeadSection
          verMas={false}
          link="/home"
          name="Ve Otras"
          highlight="Categorías"
        />
        <div className="flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar">
          <Category id="todos" name="Todos" imageUrl="/logopurma.png" />
          {categories?.map((cat) => (
            <Category
              key={cat.id}
              id={cat.id}
              name={cat.name}
              imageUrl={cat.categoryImage ?? ""}
            />
          ))}
        </div>
      </section>

      <HeadSection
        verMas={false}
        link="/home"
        name="Nuestros mejores productos en"
        highlight={catData?.name ?? "Todos"}
      />

      <div className="gap-6 grid grid-cols-1 md:grid-cols-5 p-2 md:p-4 w-full min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-200 m-auto rounded-lg w-full h-60 animate-pulse"
                  />
                ))
            : data.map((prod) => (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="m-auto"
                >
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
                    promotion={prod.promotion ?? null}
                  />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
