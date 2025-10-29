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

  const sidebarContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="z-[999] fixed inset-0">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <motion.aside
            className="top-0 right-0 z-50 fixed flex flex-col bg-background shadow-xl w-[80%] md:w-80 h-full"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <header className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-chocolate text-xl tracking-wide">Carrito</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </header>

            <div className="flex flex-col flex-1 md:p-4 overflow-y-auto">
              {prods.length >= 1 ? (
                prods.map((prod, i) => (
                  <Link
                    href={`/productos/detalle/${prod.id}`}
                    key={i}
                    className="flex flex-row items-center gap-2 hover:bg-white/40 p-2 duration-200 cursor-default"
                  >
                    <Image height={80} width={80} className="w-14 md:w-20 h-14 md:h-20" alt={prod.name} src={prod.imgs[0]} />
                    <section className="w-full">
                      <h6 className="font-medium text-subtitle">{prod.name}</h6>
                      <p>
                        Cant: <span>{prod.stock_order}</span>
                      </p>
                    </section>
                    <FaRegTrashAlt
                      onClick={() => deleteProd(prod)}
                      className="self-start size-10 md:size-7 text-red-500 hover:text-red-700 duration-200"
                      size={20}
                    />
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">Tu carrito está vacío.</p>
              )}
            </div>

            <footer className="p-4 border-t">
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
        className="text-white/70 hover:text-primary duration-300 cursor-pointer"
      >
        <CgShoppingCart size={20} />
      </div>


      {mounted && createPortal(sidebarContent, document.body)}
    </>
  );
}
