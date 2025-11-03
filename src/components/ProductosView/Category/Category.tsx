import Link from "next/link";
import Image from "next/image";
import React from "react";

interface CategoryProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Category: React.FC<CategoryProps> = ({ id, name, imageUrl }) => {
  const href = `/productos/categoria/${id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col justify-center items-center gap-2 hover:drop-shadow-xl hover:scale-105 duration-200"
    >
      <div className="relative rounded-full outline-2 outline-transparent group-hover:outline-[#76644cb6] w-24 h-24 overflow-hidden duration-200">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
          priority
        />
      </div>
      <span className="w-24 font-medium text-primary text-sm text-center truncate">
        {name}
      </span>
    </Link>
  );
};

export default Category;
