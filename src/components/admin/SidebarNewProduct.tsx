// src/components/admin/SidebarNewProduct.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { HiCamera } from "react-icons/hi";
import { toast } from "react-toastify";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { createProduct, uploadProductImages } from "@/app/axios/ProductosApi";
import CategoryDropdown from "./CategoryDropdown";

const SidebarNewProduct: React.FC = () => {
  const { setSidebarView } = useSidebarStore();
  const product = useProductCreationStore();
  const { setField, resetForm } = product;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajuste dinámico de altura del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [product.description]);

  // Manejo de imágenes
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

  const handleCreateProduct = async () => {
    if (
      !product.name ||
      !product.color ||
      !product.price ||
      !product.categoryId
    ) {
      toast.error("Completa los campos requeridos antes de continuar");
      return;
    }

    try {
      const body: {
        name: string;
        description: string;
        color: string;
        categoryId: string;
        price: number;
        stock: number;
        size: string;
        onSale: boolean;
        priceOnSale?: number;
        available: boolean;
      } = {
        name: product.name,
        description: product.description || "Sin descripción",
        color: product.color,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        size: product.size,
        onSale: product.onSale,
        available: product.available,
      };

      if (product.onSale && product.priceOnSale && product.priceOnSale > 0) {
        body.priceOnSale = product.priceOnSale;
      }

      const newProduct = await createProduct(body);

      if (product.imgs.length > 0) {
        await uploadProductImages(newProduct.id, product.imgs);
      }

      toast.success("Producto creado correctamente 🎉");
      resetForm();
      setSidebarView("menu");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Error al crear el producto 😞");
    }
  };

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
        {!product.imgPreviews.length ? (
          <>
            <HiCamera className="mx-auto mb-2 w-10 h-10 text-primary/90" />
            <p className="font-semibold text-primary/90">Agregar imagen</p>
            <p className="text-chocolate/70 text-xs">
              o soltá tus imágenes acá
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* Imagen principal */}
            <img
              src={product.imgPreviews[0]}
              alt="Imagen principal"
              className="shadow-md rounded-lg w-full h-56 object-cover"
            />
            {/* Miniaturas */}
            {product.imgPreviews.length > 1 && (
              <div className="flex gap-2 mt-2 w-full overflow-x-auto">
                {product.imgPreviews.slice(1).map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`miniatura-${i}`}
                    className="flex-shrink-0 shadow-sm border border-chocolate/20 rounded-md w-20 h-20 object-cover"
                  />
                ))}
              </div>
            )}
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
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
        />

        <input
          type="number"
          placeholder="Precio base"
          value={product.price || ""}
          onChange={(e) => setField("price", Number(e.target.value))}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
        />

        <CategoryDropdown />

        <input
          type="number"
          placeholder="Stock disponible"
          value={product.stock || ""}
          onChange={(e) => setField("stock", Number(e.target.value))}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
        />

        <input
          type="text"
          placeholder="Tamaño"
          value={product.size}
          onChange={(e) => setField("size", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
        />

        <input
          type="text"
          placeholder="Color"
          value={product.color}
          onChange={(e) => setField("color", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
        />

        <textarea
          ref={textareaRef}
          placeholder="Descripción"
          value={product.description}
          onChange={(e) => setField("description", e.target.value)}
          className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50 overflow-hidden resize-none"
          rows={1}
        />

        {/* Toggle En oferta */}
        <label className="flex justify-between items-center bg-white shadow-sm p-2 border border-chocolate/20 rounded-md cursor-pointer">
          <span className="font-medium text-primary">En oferta</span>
          <input
            type="checkbox"
            checked={product.onSale}
            onChange={(e) => setField("onSale", e.target.checked)}
            className="w-5 h-5 accent-chocolate cursor-pointer"
          />
        </label>

        {/* Precio en oferta */}
        {product.onSale && (
          <input
            type="number"
            placeholder="Precio en oferta"
            value={product.priceOnSale || ""}
            onChange={(e) => setField("priceOnSale", Number(e.target.value))}
            min={0}
            className="bg-white shadow-sm p-2 border border-chocolate/20 rounded-md focus:ring-1 focus:ring-chocolate/50"
          />
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-2 mt-6 w-full">
        <button
          onClick={() => resetForm()}
          className="flex-1 bg-white hover:bg-chocolate/10 py-2 border border-chocolate rounded-md text-chocolate transition cursor-pointer"
        >
          Cancelar
        </button>
        <button
          onClick={handleCreateProduct}
          className="flex-1 bg-chocolate/90 hover:bg-chocolate/80 py-2 rounded-md text-white transition cursor-pointer"
        >
          Crear
        </button>
      </div>
    </aside>
  );
};

export default SidebarNewProduct;
