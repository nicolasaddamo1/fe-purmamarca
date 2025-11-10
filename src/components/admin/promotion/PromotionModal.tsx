"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Spin, Select, DatePicker, Input } from "antd";
import { useDropzone } from "react-dropzone";
import { FiCamera } from "react-icons/fi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"
import { useCategoryStore } from "@/store/categoryStore";
import { IPromotion } from "@/interfaces/promotionsInterface";

interface PromotionModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  loading?: boolean;
  promotionToEdit?: IPromotion | null;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  promotionToEdit = null,
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("America/Argentina/Buenos_Aires");
  const { categories } = useCategoryStore();

  const [name, setName] = useState(promotionToEdit?.name || "");
  const [promoPercentage, setPromoPercentage] = useState(
    promotionToEdit?.promo_percentage || ""
  );
  const [startDate, setStartDate] = useState<string>(
    promotionToEdit?.start_date || ""
  );
  const [expirationDate, setExpirationDate] = useState<string>(
    promotionToEdit?.expiration_date || ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    promotionToEdit?.category_ids || []
  );
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    promotionToEdit?.image_url || null
  );

  // Reset form when modal changes
  useEffect(() => {
    if (promotionToEdit) {
      setName(promotionToEdit.name);
      setPromoPercentage(promotionToEdit.promo_percentage || "");
      setStartDate(promotionToEdit.start_date);
      setExpirationDate(promotionToEdit.expiration_date);
      setSelectedCategories(promotionToEdit.category_ids || []);
      setPreview(promotionToEdit.image_url || null);
      setFile(null);
    } else {
      setName("");
      setPromoPercentage("");
      setStartDate("");
      setExpirationDate("");
      setSelectedCategories([]);
      setPreview(null);
      setFile(null);
    }
  }, [promotionToEdit, open]);

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
    if (!name.trim() || !startDate || !expirationDate) return;
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("start_date", startDate);
    formData.append("expiration_date", expirationDate);
    if (promoPercentage) formData.append("promo_percentage", promoPercentage);
    if (selectedCategories.length)
      selectedCategories.forEach((id) => {
        formData.append("category_ids", id);
      });
    if (file) formData.append("file", file);

    await onSubmit(formData);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={promotionToEdit ? "Editar promoción" : "Crear promoción"}
      className="rounded-xl"
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
                Arrastra o selecciona una imagen
              </p>
            </>
          )}
        </div>

        {/* Nombre */}
        <Input
          placeholder="Nombre de la promoción"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate w-full"
        />

        {/* Categorías */}
        <Select
          mode="multiple"
          placeholder="Selecciona categorías"
          value={selectedCategories}
          onChange={setSelectedCategories}
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          className="w-full"
        />

        {/* Fechas */}
        <div className="flex gap-4">
          <DatePicker
            placeholder="Fecha de inicio"
            className="w-full"

            value={startDate ? dayjs(startDate) : null}
            onChange={(d) => setStartDate(d ? d.toISOString() : "")}
          />
          <DatePicker
            placeholder="Fecha de expiración"
            className="w-full"
            value={expirationDate ? dayjs(expirationDate) : null}
            onChange={(d) => setExpirationDate(d ? d.toISOString() : "")}
          />
        </div>

        {/* Porcentaje */}
        <Input
          placeholder="Porcentaje de promoción (%)"
          type="number"
          min={0}
          max={100}
          value={promoPercentage}
          onChange={(e) => setPromoPercentage(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate w-full"
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
            {loading ? <Spin /> : promotionToEdit ? "Editar" : "Crear"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PromotionModal;
