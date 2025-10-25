"use client";

import React, { useState } from "react";
import { Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";

interface CategoryFormProps {
  onSubmit: (name: string, file: File | null) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  onClose,
  loading,
}) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      message.warning("Poné un nombre para la categoría, che.");
      return;
    }

    await onSubmit(name.trim(), file);
    setName("");
    setFile(null);
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Nombre de la categoría"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Upload
        beforeUpload={(file: RcFile) => {
          const actualFile =
            (file as RcFile & { originFileObj?: File }).originFileObj ?? file;
          setFile(actualFile);
          return false; // Evita que Upload haga la carga automática
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
      </Upload>

      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!name.trim()}
        >
          Crear
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
