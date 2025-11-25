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
import { IPromotion } from "@/interfaces/promotionsInterface";
import CategoryCarousel from "@/components/CategoryCarousel/CategoryCarousel";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

const Page: React.FC = () => {
  const { category } = useParams();
  const catId = category ?? "todos";
  const { categories, setCategories } = useCategoryStore();
  const { products, setProducts } = useProductStore();
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(20);

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
    // Resetear el contador cuando cambia la categoría
    setDisplayedCount(20);
  }, [catId, products]);

  // Autoscroll en mobile cuando cambia la categoría
  useEffect(() => {
    // Solo hacer scroll en mobile (ancho menor a 768px)
    const isMobile = window.innerWidth < 768;
    if (isMobile && !loading) {
      // Pequeño delay para asegurar que el DOM se haya actualizado
      setTimeout(() => {
        const productosSection = document.getElementById("productos-section");
        if (productosSection) {
          productosSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 300);
    }
  }, [catId, loading]);

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 20);
  };

  const displayedProducts = data.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < data.length;

  const catData = categories.find((cat) => cat.id === catId);

  return (
    <div className="py-10 md:pt-36">
      {/* Categorías - Visible en mobile y desktop */}
      <section className="mb-6 md:mb-0">
        <HeadSection
          verMas={false}
          link="/home"
          name="Ve Otras"
          highlight="Categorías"
        />
        <CategoryCarousel categories={categories} />
      </section>

      <div className="relative">
        <HeadSection
          verMas={false}
          link="/home"
          name="Nuestros mejores productos en"
          highlight={catData?.name ?? "Todos"}
        />

        <Link
          href="/"
          className="md:hidden flex items-center gap-1 -mt-2 mb-4 pl-6 font-medium text-primary hover:text-primary/80 text-lg transition-colors"
        >
          <HiArrowLeft size={18} className="text-primary" />
          <span className="text-primary">Volver</span>
        </Link>
      </div>

      <div id="productos-section" className="gap-6 grid grid-cols-1 md:grid-cols-5 p-2 md:p-4 w-full min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            Array(5)
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
          ) : data.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center col-span-full py-20 text-gray-600 text-center"
            >
              <p className="font-medium text-lg md:text-xl">
                No encontramos productos en esta categoría.
              </p>
              <p className="mt-1 text-sm md:text-base">
                Probá con otra categoría o volvé más tarde.
              </p>
            </motion.div>
          ) : (
            displayedProducts.map((prod) => (
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
                  id={prod.id}
                  available={prod.available}
                  priceOnSale={prod.priceOnSale}
                  name={prod.name}
                  price={prod.price}
                  imageUrl={prod.imgs?.[0] || null}
                  categoryName={prod.category?.name ?? ""}
                  stock={prod.stock}
                  description={prod.description}
                  promotion={prod.promotion as IPromotion | null}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Botón Ver Más */}
      {!loading && hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
