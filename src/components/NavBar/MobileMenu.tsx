"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CategorySidevar from "../categorySidebar/CategorySidebar";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  const initialY = -20;
  const finalY = 0;

  return (
    <div className="md:hidden z-50 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col justify-center items-center w-8 h-8"
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
            initial={{ opacity: 0, y: initialY, x: 0 }}
            animate={{ opacity: 1, y: finalY, x: 0 }}
            exit={{ opacity: 0, y: initialY, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              absolute top-full -left-6 mt-2 
              flex flex-col justify-start items-start space-y-4 
              bg-primary shadow-lg  rounded-br-full
              px-18 py-18
              w-max h-max text-white text-lg z-40 
            `}
          >
            {/* Categorías */}
            <div className="right-6 relative">
              <CategorySidevar />
            </div>

            {/* Links */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group relative"
            >
              <span className="right-6 relative text-white/90 hover:text-gray-400 transition-colors">
                PRODUCTOS
              </span>
            </Link>

            <Link
              href="/aboutUs"
              onClick={() => setIsOpen(false)}
              className="group relative"
            >
              <span className="right-6 relative text-white/90 hover:text-gray-400 transition-colors">
                NOSOTROS
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
