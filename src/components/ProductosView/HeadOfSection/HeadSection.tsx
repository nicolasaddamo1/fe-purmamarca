import Link from "next/link";
import React from "react";
import { IoMdArrowDropright } from "react-icons/io";

function HeadSection({
  name,
  highlight,
  link,
  verMas,
}: {
  name: string;
  highlight: string | null;
  link: string | null;
  verMas: boolean;
}) {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center md:items-end p-2 md:px-10">
      <h4 className="relative flex md:flex-row flex-col items-center gap-2 font-semibold text-chocolate text-xl md:text-2xl md:text-left text-center tracking-wide">
        {name}
        <span className="font-medium text-primary/80 md:text-2xl text-3xl">
          {highlight ? highlight : null}
        </span>
      </h4>

      {verMas && (
        <Link href={link!} className="group relative transition-colors">
          <span className="flex items-center text-secondary hover:text-maroon text-sm md:text-lg transition-colors">
            Ver Más <IoMdArrowDropright size={20} className="" />
          </span>
          <span className="-bottom-1 left-0 absolute bg-maroon w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
        </Link>
      )}
    </div>
  );
}

export default HeadSection;
