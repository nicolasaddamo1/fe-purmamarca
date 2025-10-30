"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import SidebarExample from "../cart/sideVar";
import CategorySidevar from "../categorySideVar/CategorySidevar";

const SEARCH_DEBOUNCE_MS = 250;

const NavBar: React.FC = () => {
  const pathname = usePathname() ?? "/";
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  // Emit search event for pages/components
  const emitSearch = (q: string) => {
    const payload = { query: q, pathname };
    window.dispatchEvent(new CustomEvent("nav:search", { detail: payload }));
  };

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(
      () => emitSearch(query),
      SEARCH_DEBOUNCE_MS
    );
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query, pathname]);

  // Close search on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node))
        setShowSearch(false);
    };
    document.addEventListener("pointerdown", onClick);
    return () => document.removeEventListener("pointerdown", onClick);
  }, []);

  // Close search on route change
  useEffect(() => {
    setShowSearch(false);
    setQuery("");
    emitSearch("");
  }, [pathname]);

  return (
    <header className="top-0 left-0 z-[999] fixed bg-primary md:bg-primary/20 backdrop-blur-md w-full">
      <nav className="flex justify-center md:justify-between items-center mx-auto px-4 md:px-10 max-w-7xl h-[80px]">
        {/* Left: MobileMenu + Logo */}
        <div className="flex items-center gap-4">
          <MobileMenu />

          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/colla.png"
              alt="Logo Colla"
              width={52}
              height={52}
              className="object-contain"
              priority
            />
            <div className="leading-none">
              <span className="block font-semibold text-white md:text-chocolate text-lg md:text-2xl">
                Purmamarca
              </span>
              <span className="block text-maroon text-xs md:text-sm">
                Holística & Decoración
              </span>
            </div>
          </Link>
        </div>

        {/* Right: everything else aligned to right */}
        <div
          ref={containerRef}
          className="flex items-center gap-6 ml-auto font-medium text-white/90 text-sm"
        >
          {/* Search icon + expanding input (solo visible en "/" y md+) */}
          {pathname === "/" && (
            <div className="hidden relative md:flex items-center">
              <button
                aria-label="Buscar"
                onClick={() => {
                  setShowSearch((s) => !s);
                  setTimeout(() => inputRef.current?.focus(), 120);
                }}
                className="p-1 rounded hover:text-primary transition-colors"
              >
                <LiaSearchSolid size={22} />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    key="nav-search-input"
                    ref={inputRef}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="right-6 absolute bg-white px-3 py-1 border border-gray-300 rounded-md outline-none text-black text-sm -translate-x-2"
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Category sidebar (hidden en móvil) */}
          <div className="hidden md:flex">
            <CategorySidevar />
          </div>

          {/* Links: hidden on mobile, visible md+ */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="group relative">
              <span className="text-white/90 hover:text-primary transition-colors">
                PRODUCTOS
              </span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300" />
            </Link>

            <Link href="/aboutUs" className="group relative">
              <span className="text-white/90 hover:text-primary transition-colors">
                SOBRE NOSOTROS
              </span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300" />
            </Link>
          </div>

          {/* Cart / Sidebar */}
          <SidebarExample />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
