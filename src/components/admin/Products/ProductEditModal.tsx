"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spin, message } from "antd";
import { useDropzone } from "react-dropzone";
import { FiCamera } from "react-icons/fi";
import { IProduct } from "@/interfaces/productInterface";
import { useProductStore } from "@/store/productsStore";
import { uploadProductImages } from "@/app/axios/ProductosApi";

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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(productToEdit);
    setPreview(productToEdit.imgs?.[0] || null);
    setFile(null);
  }, [productToEdit]);

  const setField = <K extends keyof IProduct>(key: K, value: IProduct[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ✅ Helper para limpiar payload según Swagger
  const cleanProductPayload = (data: IProduct) => ({
    name: data.name,
    description: data.description,
    categoryId: data.categoryId,
    price: data.price,
    stock: data.stock,
    imgs: data.imgs,
    size: data.size,
    onSale: data.onSale,
    available: data.available,
  });

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      let uploadedImages = formData.imgs || [];

      if (file) {
        const newUrls = await uploadProductImages(formData.id, [file]);
        // reemplaza la primera imagen y mantiene las demás
        uploadedImages = [
          ...(Array.isArray(newUrls) ? newUrls : []), // aseguramos que newUrls sea un array
          ...(formData.imgs?.slice(1) || []), // si imgs es undefined, usamos []
        ];
      }

      const payload = cleanProductPayload({
        ...formData,
        imgs: uploadedImages,
      });
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
        {/* Imagen */}
        <div
          {...getRootProps()}
          className="relative flex flex-col justify-center items-center p-6 border-2 border-primary/70 hover:border-chocolate border-dashed rounded-lg transition cursor-pointer"
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mb-2 rounded-lg w-32 h-32 object-cover"
            />
          ) : (
            <>
              <FiCamera className="mb-2 text-primary text-4xl" />
              <p className="text-primary/70 hover:text-chocolate/70 text-sm text-center">
                Arrastrá o seleccioná una imagen
              </p>
            </>
          )}
        </div>

        {/* Campos */}
        <input
          type="text"
          placeholder="Nombre"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.name}
          onChange={(e) => setField("name", e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.price}
          onChange={(e) => setField("price", Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Stock"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full"
          value={formData.stock}
          onChange={(e) => setField("stock", Number(e.target.value))}
        />
        <textarea
          placeholder="Descripción"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-chocolate w-full resize-none"
          value={formData.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={3}
        />

        {/* Botones */}
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
