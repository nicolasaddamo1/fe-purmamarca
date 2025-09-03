"use client";

import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="top-0 left-0 z-50 fixed bg-[#f8e8d59d] backdrop-blur-md border-white/20 border-b w-full">
      <div className="flex justify-between items-center mx-auto px-6 py-4 max-w-7xl">
        <div className="font-bold text-primary text-xl">
          <Link href="/">Purmamarca</Link>
        </div>

        <div className="flex space-x-8 font-medium text-sm">
          <Link
            href="/productos"
            className="group relative text-secondary hover:text-primary transition-colors"
          >
            <span>PRODUCTOS</span>
            <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
          </Link>

          <Link
            href="/about"
            className="group relative text-secondary hover:text-primary transition-colors"
          >
            <span>ABOUT</span>
            <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
          </Link>

          <Link
            href="/testimonios"
            className="group relative text-secondary hover:text-primary transition-colors"
          >
            <span>TESTIMONIOS</span>
            <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
