"use client";
import Image from "next/image";
import { useState } from "react";
import DropdownUser from "./DropdownUser";
import { HiMenu } from "react-icons/hi";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "antd";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function NavbarAdm({
  sidebarOpen,
  setSidebarOpen,
}: Props): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch: string = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState<string>(currentSearch);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = event.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

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

      <div className="hidden sm:block flex-1 mx-8 max-w-lg">
        <Input
          placeholder="Buscar productos por nombre o descripción..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearchChange}
          className="focus:shadow-primary/50 border-2 border-primary/50 rounded-xl transition duration-150"
          style={{ height: "40px" }}
        />
      </div>

      <DropdownUser />
    </nav>
  );
}
