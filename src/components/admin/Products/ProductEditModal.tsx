"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spin, message, Input, Flex, Select } from "antd";
import { useDropzone } from "react-dropzone";
import { FiCamera, FiX } from "react-icons/fi";
import { IProduct } from "@/interfaces/productInterface";
import { useProductStore } from "@/store/productsStore";
import { updateProduct, uploadProductImages } from "@/app/axios/ProductosApi";
import TextArea from "antd/es/input/TextArea";
import { useCategoryStore } from "@/store/categoryStore";

interface ProductEditModalProps {
  open: boolean;
  onClose: () => void;
  productToEdit: IProduct;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  open,
  onClose,
  productToEdit,
}) => {
  const { updateProductInStore } = useProductStore();
  const [formData, setFormData] = useState<IProduct>(productToEdit);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImgs, setExistingImgs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string>(
    productToEdit?.categoryId || ""
  );
  const { categories } = useCategoryStore();

  useEffect(() => {
    setFormData(productToEdit);
    setExistingImgs(productToEdit.imgs || []);
    setPreviews(productToEdit.imgs || []);
    setFiles([]);
  }, [productToEdit]);

  const setField = <K extends keyof IProduct>(key: K, value: IProduct[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    const newPreviews = [
      ...previews,
      ...acceptedFiles.map((file) => URL.createObjectURL(file)),
    ];
    setPreviews(newPreviews);
  }, [files, previews]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    const removedImg = previews[index];
    if (removedImg.startsWith("http")) {
      setExistingImgs((prev) => prev.filter((_, i) => previews.indexOf(prev[i]) !== index));
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== index - existingImgs.length));
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  const cleanProductPayload = (data: IProduct) => ({
    name: data.name,
    description: data.description,
    categoryId: data.categoryId,
    price: data.price,
    stock: data.stock,
    imgs: data.imgs,
    size: data.size,
    onSale: data.onSale,
    priceOnSale: data.priceOnSale,
    available: data.available,
  });

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      let finalImgs = [...existingImgs];

      if (files.length > 0) {
        const updatedProduct = await uploadProductImages(formData.id, files);
        const newUrls = updatedProduct.imgs ?? [];
        finalImgs = [...finalImgs, ...newUrls.slice(-files.length)];
      }

      const payload = cleanProductPayload({
        ...formData,
        categoryId: selectedCategories,
        imgs: finalImgs,
      });

      const cleanId = formData.id?.replace(/[{}]/g, "");
      await updateProduct(cleanId, payload);

      message.success("Producto actualizado correctamente");
      updateProductInStore({ ...formData, imgs: finalImgs });
      onClose();
    } catch (error) {
      console.error(error);
      message.error("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title="Editar producto"
    >
      <div className="flex flex-col gap-4">

        {/* 🖼️ ZONA DE SUBIDA DE IMÁGENES */}
        {previews.length > 0 && (
          <div className="flex flex-row gap-2 p-2 max-h-[40rem] overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll no-scrollbar">
            {previews.map((img, i) => (
              <div
                key={i}
                className="group relative flex justify-center items-center rounded-sm overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Imagen ${i + 1}`}
                  className="m-auto rounded-sm w-20 h-16 object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(i);
                  }}
                  className="top-0 right-0 absolute bg-black/50 opacity-0 group-hover:opacity-100 p-1 rounded-full text-white transition"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div
          {...getRootProps()}
          className="relative flex flex-col justify-center items-center p-6 border-2 border-primary/70 hover:border-chocolate border-dashed rounded-lg h-60 transition cursor-pointer"
        >
          <input {...getInputProps()} />
          <FiCamera className="mb-2 text-primary text-4xl" />
          <p className="text-primary/70 hover:text-chocolate/70 text-sm text-center">
            Arrastrá o seleccioná imágenes (podés subir varias)
          </p>
        </div>

        <Input
          type="text"
          placeholder="Nombre"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <Input
          type="number"
          placeholder="Precio"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.price}
          onChange={(e) => setField("price", Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Stock"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.stock}
          onChange={(e) => setField("stock", Number(e.target.value))}
        />

        <Flex gap={20}>
          <Input
            type="text"
            placeholder="Tamaño"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
            value={formData.size}
            onChange={(e) => setField("size", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Color"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
            value={formData.color}
            onChange={(e) => setField("color", e.target.value)}
          />
        </Flex>

        <TextArea
          placeholder="Descripción"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full resize-none"
          value={formData.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={3}
        />

        <Select
          placeholder="Selecciona categoría"
          value={selectedCategories}
          onChange={setSelectedCategories}
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          className="w-full"
        />

        <Flex align="center" gap={10}>
          <span>¿En oferta?</span>
          <input
            type="checkbox"
            checked={formData.onSale}
            onChange={(e) => setField("onSale", e.target.checked)}
          />
        </Flex>

        {formData.onSale && (
          <Input
            type="number"
            placeholder="Precio en oferta"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
            value={formData.priceOnSale}
            onChange={(e) => setField("priceOnSale", Number(e.target.value))}
          />
        )}

        <Flex align="center" gap={10}>
          <span>¿Disponible?</span>
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setField("available", e.target.checked)}
          />
        </Flex>

        <div className="flex justify-center gap-6 mt-2">
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="primary"
            className="bg-chocolate hover:bg-chocolate/80"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spin /> : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductEditModal;
