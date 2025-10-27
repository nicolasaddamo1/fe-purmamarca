"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryList from "@/components/admin/CategoryList";
import CategoryForm from "@/components/admin/CategoryForm";
import {
  getAllCategories,
  createCategory,
  uploadCategoryImage,
  deleteCategory,
  ICategory,
} from "@/app/axios/categoriasApi";
import { useCategoryStore } from "@/store/categoryStore";

const CategoryPage: React.FC = () => {
  const { categories, setCategories, addCategory, removeCategory } =
    useCategoryStore();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Traer categorías al montar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch {
        message.error("Error al cargar las categorías");
      }
    };
    fetchCategories();
  }, [setCategories]);

  // Crear categoría
  const handleCreateCategory = async (name: string, file: File | null) => {
    try {
      setLoading(true);

      // Crear la categoría
      const category = await createCategory(name);
      let finalCategory = category;

      // Subir imagen solo si hay archivo
      if (file) {
        const imageUrl = await uploadCategoryImage(category.id, file);
        finalCategory = { ...category, categoryImage: imageUrl };
      }

      addCategory(finalCategory);
      message.success("Categoría creada con éxito 😎");
    } catch (error) {
      console.error(error);
      message.error("Error al crear la categoría.");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar categoría
  const handleDelete = async (category: ICategory) => {
    Modal.confirm({
      title: "Borrar categoría",
      icon: <ExclamationCircleOutlined />,
      content: `¿Seguro querés borrar ${category.name}?`,
      okText: "Eliminar",
      okButtonProps: { danger: true },
      cancelText: "Cancelar",
      onOk: async () => {
        setLoading(true);
        try {
          await deleteCategory(category.id);
          removeCategory(category.id);
          message.success("Categoría eliminada 😎");
        } catch {
          message.error("Error al eliminar la categoría");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleEdit = (category: ICategory) => {
    message.info(`Editar categoría: ${category.name}`);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        loading={loading}
      >
        Crear Categoría
      </Button>

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title="Crear nueva categoría"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <CategoryForm
          onSubmit={handleCreateCategory}
          onClose={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
