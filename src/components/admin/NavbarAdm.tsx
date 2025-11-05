"use client";
import Image from "next/image";
import { useState } from "react";
import DropdownUser from "./DropdownUser";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function NavbarAdm({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <nav className="flex justify-between items-center bg-chocolate/10 shadow-md px-6 py-4 w-full h-[70px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-3 cursor-pointer">
          <Image
            src="/colla.png"
            alt="Logo Colla"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
          <div>
            <Link href="/">
              <span className="right-5 relative font-semibold text-chocolate text-xl">
                Purmamarca
              </span>
            </Link>
            <h2 className="-top-1 relative font-medium text-primary text-sm">
              Holística & Decoración
            </h2>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-chocolate/90 hover:bg-chocolate/85 p-1 rounded-lg transition cursor-pointer"
        >
          <HiMenu className="w-6 h-6 text-white" />
        </button>
      </div>
      <DropdownUser />
    </nav>
  );
}
