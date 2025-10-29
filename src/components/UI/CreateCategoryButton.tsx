"use client";

import React from "react";
import { TbPlus } from "react-icons/tb";

interface CreateCategoryButtonProps {
  loading: boolean;
  onClick: () => void;
  className?: string;
}

const CreateCategoryButton: React.FC<CreateCategoryButtonProps> = ({
  loading,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center justify-center gap-2
        bg-chocolate/90 hover:bg-chocolate/80
        text-white 
        px-16 py-3 rounded-md
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        shadow-lg  shadow-chocolate/60
        hover:shadow-chocolate/80
        ${className}
      `}
    >
      {loading ? (
        <span className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
      ) : (
        <TbPlus className="w-5 h-5" />
      )}
      <span>Crear Categoría</span>
    </button>
  );
};

export default CreateCategoryButton;
