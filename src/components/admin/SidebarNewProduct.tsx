"use client";

import React, { useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { HiCamera } from "react-icons/hi";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import CategoryDropdown from "./CategoryDropdown";

const SidebarNewProduct: React.FC = () => {
  const { categories } = useCategoryStore();
  const { setSidebarView } = useSidebarStore();
  const product = useProductCreationStore();
  const setField = product.setField;
  const resetForm = product.resetForm;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [product.description]);

  const onDrop = (acceptedFiles: File[]) => {
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setField("imgs", acceptedFiles);
    setField("imgPreviews", previews);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  return (
    <aside className="flex flex-col items-center bg-chocolate/10 p-4 pt-4 pb-26 border-chocolate/30 border-r w-60 h-screen overflow-y-auto transition-all duration-300">
      <button
        onClick={() => setSidebarView("menu")}
        className="self-start mb-4 font-semibold text-primary hover:text-primary/70 text-sm underline cursor-pointer"
      >
        ← Volver
      </button>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="relative bg-white/70 shadow-sm p-4 border-2 border-chocolate/40 hover:border-chocolate/60 border-dashed rounded-xl w-full text-center transition cursor-pointer"
      >
        <input {...getInputProps()} />
        {!product.imgPreviews.length && (
          <>
            <HiCamera className="mx-auto mb-2 w-10 h-10 text-primary/90" />
            <p className="font-semibold text-primary/90">Agregar imagen</p>
            <p className="text-chocolate/70 text-xs">o soltá tu imagen acá</p>
          </>
        )}

        {/* Imagen principal */}
        {product.imgPreviews[0] && (
          <div className="mb-2">
            <img
              src={product.imgPreviews[0]}
              alt="preview principal"
              className="shadow-sm border border-chocolate/20 rounded-lg w-full h-32 object-cover"
            />
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3 mt-4 w-full">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={(e) => setField("name", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50"
        />

        <input
          type="number"
          placeholder="Precio"
          value={product.price || ""}
          onChange={(e) => setField("price", Number(e.target.value))}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50"
        />
        <CategoryDropdown />

        <input
          type="number"
          placeholder="Stock disponible"
          value={product.stock || ""}
          onChange={(e) => setField("stock", Number(e.target.value))}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50"
        />

        <input
          type="text"
          placeholder="Tamaño"
          value={product.size}
          onChange={(e) => setField("size", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50"
        />

        <textarea
          ref={textareaRef}
          placeholder="Descripción"
          value={product.description}
          onChange={(e) => setField("description", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:outline-none focus:ring-1 focus:ring-chocolate/50 overflow-hidden resize-none"
          rows={1}
        />
      </div>

      {/* Botones Cancelar / Crear */}
      <div className="flex gap-2 mt-6 w-full">
        <button
          onClick={() => resetForm()}
          className="flex-1 bg-white hover:bg-chocolate/10 py-2 border-1 border-chocolate rounded-md text-chocolate transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          onClick={() => console.log("Crear producto")}
          className="flex-1 bg-chocolate/90 hover:bg-chocolate/80 py-2 rounded-md text-white transition cursor-pointer"
        >
          Crear
        </button>
      </div>
    </aside>
  );
};

export default SidebarNewProduct;
