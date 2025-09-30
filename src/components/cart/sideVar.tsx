"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CgShoppingCart } from "react-icons/cg";
import { createPortal } from "react-dom";
import { IProdCart, useCartStore } from "@/store/cartStore";
import { div } from "framer-motion/client";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";




export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { order, clearProd } = useCartStore()

  function deleteProd(prod: IProdCart) {
    clearProd(prod)
  }
  return (<>
    {/* Trigger */}
    <div
      onClick={() => setIsOpen(true)}
      className="text-white/70 hover:text-primary duration-300 cursor-pointer"
    >
      <CgShoppingCart size={20} />
    </div>

    {createPortal((
      <AnimatePresence >
        {isOpen && (
          <div className="z-[9999] fixed inset-0">
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
              className="top-0 right-0 z-50 fixed flex flex-col bg-white shadow-xl w-80 h-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <header className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold text-lg">Carrito</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </header>

              <div className="flex-1 p-4 overflow-y-auto">
                {
                  order.prods.length >= 1 ?
                    order.prods.map((prod, i) =>
                      <div key={i} className="flex flex-row gap-2 hover:bg-gray-300 p-2 duration-200">
                        <Image height={80} width={80} alt={prod.name} src={"https://pbs.twimg.com/media/G17wqbcXUAApROI?format=jpg&name=small"} />
                        <section className="w-full">
                          <h6 className="font-medium text-subtitle">{prod.name}</h6>
                          <p>Cant: <span>  {prod.stock_order} </span></p>
                        </section>
                        <FaRegTrashAlt onClick={() => deleteProd(prod)} className="self-start text-red-500 hover:text-red-700 duration-200" size={20} />

                      </div>
                    )
                    :
                    <p className="text-gray-500">Tu carrito está vacío.</p>
                }
              </div>

              <footer className="p-4 border-t">
                <button className="bg-primary hover:bg-primary/90 py-2 rounded-md w-full text-white duration-200">
                  Finalizar compra
                </button>
              </footer>
            </motion.aside>
          </div>
        )}
      </AnimatePresence >

    ), document.body)
    }
  </>)
  return;
}