"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import { useProductStore } from "@/store/productsStore";
import { getAllPromotions, createPromotion, patchPromotion, uploadPromotionImage, deletePromotion } from "@/app/axios/PromotionsApi";
import { IPromotion } from "@/interfaces/promotionsInterface";
import PromotionModal from "@/components/admin/promotion/PromotionModal";
import { CardPromotion } from "@/components/admin/promotion/CardPromotion";

function PromoPage() {
  const { promotions, setPromotions } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotionToEdit, setPromotionToEdit] = useState<IPromotion | null>(null);

  useEffect(() => {
    async function fetchPromotions() {
      try {
        const data = await getAllPromotions();
        setPromotions(data);
      } catch {
        toast.error("Error al cargar las promociones");
      }
    }
    fetchPromotions();
  }, [setPromotions]);

  const handleCreateOrEditPromotion = async (formData: FormData) => {
    setLoading(true);
    try {
      const file = formData.get("file") as File | null;
      let imageUrl = "";

      // 1️⃣ Subir imagen si existe
      if (file) {
        imageUrl = await uploadPromotionImage(file);
      }

      // 2️⃣ Preparar payload con image_url ya listo
      if (imageUrl) formData.append("image_url", imageUrl);

      // 3️⃣ Crear o editar promoción
      let updatedPromotions: IPromotion[] = [];
      let savedPromotion: IPromotion;

      if (promotionToEdit) {
        savedPromotion = await patchPromotion(promotionToEdit.id, formData);
        updatedPromotions = promotions.map((p) =>
          p.id === savedPromotion.id ? savedPromotion : p
        );
        toast.success("Promoción actualizada 😎");
      } else {
        savedPromotion = await createPromotion(formData);
        updatedPromotions = [...promotions, savedPromotion];
        toast.success("Promoción creada 😎");
      }

      setPromotions(updatedPromotions);
    } catch (error) {
      toast.error("Error al guardar la promoción.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setPromotionToEdit(null);
    }
  };

  const handleDelete = async (promotion: IPromotion) => {
    Modal.confirm({
      title: "Borrar promoción",
      icon: <ExclamationCircleOutlined />,
      content: `¿Seguro querés borrar "${promotion.name}"?`,
      okText: "Eliminar",
      okButtonProps: { danger: true },
      cancelText: "Cancelar",
      onOk: async () => {
        setLoading(true);
        try {
          await deletePromotion(promotion.id);
          setPromotions(promotions.filter((p) => p.id !== promotion.id));
          toast.success("Promoción eliminada 😎");
        } catch {
          toast.error("Error al eliminar la promoción");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleEdit = (promotion: IPromotion) => {
    setPromotionToEdit(promotion);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        loading={loading}
      >
        Crear Promoción
      </Button>

      {promotions.length === 0 ? (
        <p className="mt-10 text-gray-500 text-center">
          No hay Promociones todavía 😅
        </p>
      ) : (
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {promotions.map((promo) => (
            <CardPromotion
              key={promo.id}
              promotion={promo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <PromotionModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPromotionToEdit(null);
        }}
        onSubmit={handleCreateOrEditPromotion}
        loading={loading}
        promotionToEdit={promotionToEdit}
      />
    </div>
  );
}

export default PromoPage;
