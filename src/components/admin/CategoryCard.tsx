"use client";

import React from "react";
import { Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ICategory } from "@/app/axios/categoriasApi";

interface CategoryCardProps {
  category: ICategory;
  onEdit?: (category: ICategory) => void;
  onDelete?: (category: ICategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const { name, categoryImage } = category;

  const imageSrc =
    categoryImage && categoryImage.startsWith("http")
      ? categoryImage
      : "No hay imagen disponible";

  return (
    <Card
      hoverable
      className="shadow-md hover:shadow-lg rounded-2xl transition-all"
      cover={
        <img
          alt={name}
          src={imageSrc}
          className="rounded-t-2xl w-full h-40 object-cover"
        />
      }
      actions={[
        <Tooltip title="Editar" key="edit">
          <EditOutlined onClick={() => onEdit?.(category)} />
        </Tooltip>,
        <Tooltip title="Eliminar" key="delete">
          <DeleteOutlined
            onClick={() => onDelete?.(category)}
            className="text-red-500 hover:text-red-600"
          />
        </Tooltip>,
      ]}
    >
      <Card.Meta title={name} />
    </Card>
  );
};

export default CategoryCard;
