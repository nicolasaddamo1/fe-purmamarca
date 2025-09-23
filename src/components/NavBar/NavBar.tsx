"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import MobileMenu from "./MobileMenu";
import { LiaSearchSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname()
  return (
    <div className="top-0 left-0 z-[999] fixed bg-chocolate md:bg-primary/20 md:backdrop-blur-md w-full">
      <nav className="w-full h-[100px] md:h-[70px]">
        <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
          <div className="flex items-center space-x-3">
            <Image
              src="/colla.png"
              alt="Logo Colla"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
            <div>
              <Link
                href="/"
                className="right-6 relative text-stroke-2 font-semibold text-white md:text-xl text-2xl"
              >
                Purmamarca
              </Link>
              <h2 className="-top-1 relative font-medium text-maroon md:text-xs text-sm">
                Holística & Decoración
              </h2>
            </div>
          </div>

          <div className="hidden relative md:flex space-x-8 font-medium text-sm">
            <Link
              href="/productos"
              className="group relative text-white/70 hover:text-primary transition-colors"
            >
              <span>PRODUCTOS</span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
            </Link>

            <Link
              href="/about"
              className="group relative text-white/70 hover:text-primary transition-colors"
            >
              <span>ABOUT</span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
            </Link>

            <Link
              href="/testimonios"
              className="group relative text-white/70 hover:text-primary transition-colors"
            >
              <span>TESTIMONIOS</span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
            </Link>
          </div>

          <MobileMenu />
        </div>
      </nav>
      {path.includes("productos") &&
        <nav className="w-full">
          <div className="flex justify-between items-center mx-auto px-6 py-4 max-w-7xl">
            <label htmlFor="searchBar" className='flex flex-row items-center bg-white m-auto px-2 rounded-md w-96 h-8 text-secondary text-center'>
              <LiaSearchSolid size={20} className='font-semibold' />
              <input type="text" id='searchBar' className='px-2 border-0 outline-0 w-full h-full' placeholder='Algun producto de busqueda' />
            </label>
            <div
              className="group relative font-medium text-white/70 hover:text-primary text-sm transition-colors"
            >
              <span className='flex flex-row items-center gap-2'>CATEGORIAS <IoMdArrowDropdown size={20} /> </span>
              <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
            </div>

          </div>
        </nav>}
    </div>
  );
};

export default NavBar;
