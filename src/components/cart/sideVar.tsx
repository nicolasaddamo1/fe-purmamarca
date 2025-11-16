"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgShoppingCart } from "react-icons/cg";
import { createPortal } from "react-dom";
import { IProdCart, useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import PedidoFormModal from "../modal/FormInfo";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { prods, clearProd } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  function deleteProd(prod: IProdCart) {
    clearProd(prod);
  }

  function getFinalUnitPrice(prod: IProdCart) {
    const now = new Date();

    const hasPromo =
      prod.promotion &&
      prod.promotion.promo_percentage &&
      prod.promotion.promo_percentage > 0 &&
      new Date(prod.promotion.start_date) <= now &&
      new Date(prod.promotion.expiration_date) >= now;

    if (hasPromo) {
      const discount = prod.price * (prod.promotion!.promo_percentage! / 100);
      return prod.price - discount;
    }

    if (prod.onSale && prod.priceOnSale && prod.priceOnSale > 0) {
      return prod.priceOnSale;
    }

    return prod.price;
  }

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="z-[999] fixed inset-0">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.aside
            className="top-0 right-0 fixed flex flex-col bg-white shadow-2xl w-[80%] max-w-xs h-full"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <header className="top-0 sticky flex justify-between items-center bg-primary/70 shadow-sm p-4 border-gray-100 border-b">
              <h2 className="flex items-center gap-2 font-extrabold text-white text-xl tracking-wide">
                <CgShoppingCart className="w-6 h-6" />
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full text-white/90 transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </header>

            {/* List */}
            <div className="flex flex-col flex-grow p-3 w-full overflow-y-auto">
              {prods.length >= 1 ? (
                prods.map((prod, i) => {
                  const unitPrice = getFinalUnitPrice(prod);
                  const finalPrice = unitPrice * prod.stock_order;

                  const hasPromo =
                    prod.promotion &&
                    prod.promotion.promo_percentage &&
                    prod.promotion.promo_percentage > 0;

                  const isOnSale =
                    prod.onSale &&
                    prod.priceOnSale &&
                    prod.priceOnSale > 0 &&
                    !hasPromo;

                  return (
                    <div
                      key={i}
                      className="flex flex-row items-center gap-3 hover:bg-primary/5 p-2 rounded-lg transition-colors duration-200"
                    >
                      <Link
                        href={`/productos/detalle/${prod.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-grow items-center gap-3"
                      >
                        <Image
                          height={80}
                          width={80}
                          className="flex-shrink-0 border border-gray-200 rounded-md w-16 h-16 object-cover"
                          alt={prod.name}
                          src={prod.imgs[0]}
                        />

                        <section className="w-full">
                          <h6 className="font-semibold text-primary/90 text-sm">
                            {prod.name}
                          </h6>

                          <p className="mt-1 text-gray-600 text-xs">
                            Cant:{" "}
                            <span className="font-bold">
                              {prod.stock_order}
                            </span>
                          </p>

                          {/* Precios */}
                          <div className="flex items-center gap-2 mt-1">
                            {(hasPromo || isOnSale) && (
                              <span className="font-medium text-gray-500 text-xs line-through">
                                ${(prod.price * prod.stock_order).toFixed(2)}
                              </span>
                            )}

                            <p
                              className={`font-bold text-sm ${
                                hasPromo
                                  ? "text-green-600"
                                  : isOnSale
                                  ? "text-red-600"
                                  : "text-chocolate"
                              }`}
                            >
                              ${finalPrice.toFixed(2)}
                            </p>
                          </div>
                        </section>
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProd(prod);
                        }}
                        className="flex-shrink-0 hover:bg-red-100 p-2 rounded-full text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaRegTrashAlt size={16} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center p-4 h-full">
                  <p className="font-medium text-gray-500 text-center">
                    Tu carrito está vacío. ¡Añade algunos productos!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="bottom-0 sticky bg-white shadow-lg p-4 border-gray-200 border-t">
              <PedidoFormModal />
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2 hover:bg-primary/20 p-2 rounded-lg font-bold text-white/90 hover:text-white tracking-wider transition-colors duration-300 cursor-pointer"
      >
        <CgShoppingCart className="w-5 h-5" />
      </div>

      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
}
