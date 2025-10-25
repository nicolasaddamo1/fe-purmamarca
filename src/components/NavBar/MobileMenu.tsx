"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname()
  const defineHeight = path.includes("productos") ? -50 : -95
  return (
    <div className="md:hidden relative">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 relative flex flex-col justify-center items-center w-8 h-8"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block bg-white rounded-sm w-6 h-[3px]"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="block bg-white my-1 rounded-sm w-6 h-[3px]"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block bg-white rounded-sm w-6 h-[3px]"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: defineHeight, x: -60 }}
            animate={{ opacity: 1, y: defineHeight, x: -25 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="top-[10rem] left-0 -z-20 absolute flex flex-col justify-center items-left space-y-4 bg-chocolate shadow-md p-10 rounded-br-[5rem] w-max h-max text-white text-lg"
          >
            <Link
              href="/productos"
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-primary transition-colors"
            >
              • PRODUCTOS
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-primary transition-colors"
            >
              • ABOUT
            </Link>
            <Link
              href="/testimonios"
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-primary transition-colors"
            >
              • TESTIMONIOS
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default MobileMenu;
