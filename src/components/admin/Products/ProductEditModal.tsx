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
import { toast } from "react-toastify";

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      const newPreviews = [
        ...previews,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ];
      setPreviews(newPreviews);
    },
    [files, previews]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleRemoveImage = (index: number) => {
    const removedImg = previews[index];
    if (removedImg.startsWith("http")) {
      setExistingImgs((prev) =>
        prev.filter((_, i) => previews.indexOf(prev[i]) !== index)
      );
    } else {
      setFiles((prev) =>
        prev.filter((_, i) => i !== index - existingImgs.length)
      );
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

      toast.success("Producto actualizado correctamente");
      updateProductInStore({ ...formData, imgs: finalImgs });
      onClose();
    } catch (error) {
      toast.error("Error al actualizar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      title="Editar producto"
    >
      <div className="flex flex-col gap-4">
        {/* 🖼️ ZONA DE SUBIDA DE IMÁGENES */}
        <div>
          <p className="mb-1 font-semibold text-primary text-sm">
            Imágenes del producto
          </p>

          {/* Dropzone principal */}
          <div
            {...getRootProps()}
            className="relative flex justify-center items-center bg-gray-50 border-2 border-primary/70 hover:border-chocolate border-dashed rounded-xl h-52 overflow-hidden transition cursor-pointer"
          >
            <input {...getInputProps()} />
            {previews.length > 0 ? (
              <img
                src={previews[0]}
                alt="Imagen principal"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-primary/70">
                <FiCamera className="mb-2 text-3xl" />
                <p className="text-sm text-center">
                  Arrastrá o seleccioná imágenes (podés subir varias)
                </p>
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {previews.length > 1 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {previews.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="group relative shadow-sm rounded-lg w-20 h-20 overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Imagen ${i + 2}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(i + 1);
                    }}
                    className="top-1 right-1 absolute bg-black/50 opacity-0 group-hover:opacity-100 px-1 rounded-full text-white text-xs transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🏷️ CAMPOS DE TEXTO */}
        <div>
          <p className="mb-1 font-semibold text-primary text-sm">Nombre</p>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setField("name", e.target.value)}
          />
        </div>

        <div>
          <p className="mb-1 font-semibold text-primary text-sm">Precio</p>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setField("price", Number(e.target.value))}
          />
        </div>

        <div>
          <p className="mb-1 font-semibold text-primary text-sm">Stock</p>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setField("stock", Number(e.target.value))}
          />
        </div>

        <Flex gap={20}>
          <div className="w-full">
            <p className="mb-1 font-semibold text-primary text-sm">Tamaño</p>
            <Input
              type="text"
              value={formData.size}
              onChange={(e) => setField("size", e.target.value)}
            />
          </div>

          <div className="w-full">
            <p className="mb-1 font-semibold text-primary text-sm">Color</p>
            <Input
              type="text"
              value={formData.color}
              onChange={(e) => setField("color", e.target.value)}
            />
          </div>
        </Flex>

        <div>
          <p className="mb-1 font-semibold text-primary text-sm">Descripción</p>
          <TextArea
            value={formData.description}
            onChange={(e) => setField("description", e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <p className="mb-1 font-semibold text-primary text-sm">Categoría</p>
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
        </div>

        <Flex align="center" gap={10}>
          <span>¿En oferta?</span>
          <input
            type="checkbox"
            checked={formData.onSale}
            onChange={(e) => setField("onSale", e.target.checked)}
          />
        </Flex>

        {formData.onSale && (
          <div>
            <p className="mb-1 font-semibold text-primary text-sm">
              Precio en oferta
            </p>
            <Input
              type="number"
              value={formData.priceOnSale}
              onChange={(e) => setField("priceOnSale", Number(e.target.value))}
            />
          </div>
        )}

        <Flex align="center" gap={10}>
          <span>¿Disponible?</span>
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setField("available", e.target.checked)}
          />
        </Flex>

        <div className="flex justify-center gap-6 mt-4">
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
