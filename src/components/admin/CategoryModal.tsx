"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spin } from "antd";
import { useDropzone } from "react-dropzone";
import { FiCamera } from "react-icons/fi";
import { ICategory } from "@/app/axios/categoriasApi";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, file: File | null) => Promise<void>;
  loading?: boolean;
  categoryToEdit?: ICategory | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  categoryToEdit = null,
}) => {
  const [name, setName] = useState(categoryToEdit?.name || "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    categoryToEdit?.categoryImage || null
  );

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setPreview(categoryToEdit.categoryImage || null);
      setFile(null);
    } else {
      setName("");
      setPreview(null);
      setFile(null);
    }
  }, [categoryToEdit, open]);

  useEffect(() => {
    return () => {
      if (preview && file) URL.revokeObjectURL(preview);
    };
  }, [preview, file]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async () => {
    if (!name.trim()) return;
    await onSubmit(name.trim(), file);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      title={categoryToEdit ? "Editar categoría" : "Crear categoría"}
      className="rounded-xl"
    >
      <div className="flex flex-col gap-4">
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
                Arrastra o selecciona una imagen
              </p>
            </>
          )}
        </div>

        <input
          type="text"
          placeholder="Nombre de la categoría"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
            {loading ? <Spin /> : categoryToEdit ? "Editar" : "Crear"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
