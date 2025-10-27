"use client";

import React, { useState, useEffect } from "react";

import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button, message } from "antd";

import CategoryList from "@/components/admin/CategoryList";
import CategoryModal from "@/components/admin/CategoryModal";
import {
  getAllCategories,
  createCategory,
  uploadCategoryImage,
  deleteCategory,
  updateCategory,
  ICategory,
} from "@/app/axios/categoriasApi";
import { toast } from "react-toastify";

import { useCategoryStore } from "@/store/categoryStore";

const CategoryPage: React.FC = () => {
  const {
    categories,
    setCategories,
    addCategory,
    removeCategory,
    updateCategoryInStore,
  } = useCategoryStore();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch {
        toast.error("Error al cargar las categorías");
      }
    };
    fetchCategories();
  }, [setCategories]);

  const handleCreateOrEditCategory = async (
    name: string,
    file: File | null
  ) => {
    setLoading(true);
    try {
      let finalCategory: ICategory;
      if (categoryToEdit) {
        // PATCH solo nombre
        finalCategory = await updateCategory(categoryToEdit.id, { name });
        // Subir imagen si hay
        if (file) {
          const imageUrl = await uploadCategoryImage(categoryToEdit.id, file);
          finalCategory = { ...finalCategory, categoryImage: imageUrl };
        }
        updateCategoryInStore(finalCategory);
        toast.success("Categoría actualizada 😎");
      } else {
        // Crear nueva categoría
        finalCategory = await createCategory(name);
        if (file) {
          const imageUrl = await uploadCategoryImage(finalCategory.id, file);
          finalCategory = { ...finalCategory, categoryImage: imageUrl };
        }
        addCategory(finalCategory);
        toast.success("Categoría creada 😎");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la categoría.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setCategoryToEdit(null);
    }
  };

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
          toast.success("Categoría eliminada 😎");
        } catch {
          toast.error("Error al eliminar la categoría");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleEdit = (category: ICategory) => {
    setCategoryToEdit(category);
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
        Crear Categoría
      </Button>

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCategoryToEdit(null);
        }}
        onSubmit={handleCreateOrEditCategory}
        loading={loading}
        categoryToEdit={categoryToEdit}
      />
    </div>
  );
};

export default CategoryPage;
