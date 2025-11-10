"use client";

import React, { useState } from "react";
import { Input, Button, message } from "antd";

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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

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
