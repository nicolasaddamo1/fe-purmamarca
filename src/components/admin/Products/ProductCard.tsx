"use client";

import React from "react";
import { Card, Tooltip, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { IProduct } from "@/interfaces/productInterface";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: IProduct;
  onEdit?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { name, imgs, price, stock, size, description } = product;

  const imageSrc =
    imgs && imgs.length > 0 && imgs[0].startsWith("http")
      ? imgs[0]
      : "/placeholder.png";

  const handleDelete = () => {
    Modal.confirm({
      title: "Borrar producto",
      icon: <ExclamationCircleOutlined />,
      content: `¿Seguro querés borrar ${name}?`,
      okText: "Eliminar",
      okButtonProps: { danger: true },
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await onDelete?.(product);
          toast.success("Producto eliminado 😎");
        } catch {
          toast.error("Error al eliminar el producto");
        }
      },
    });
  };

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
          <EditOutlined onClick={() => onEdit?.(product)} />
        </Tooltip>,
        <Tooltip title="Eliminar" key="delete">
          <DeleteOutlined
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          />
        </Tooltip>,
      ]}
    >
      <Card.Meta
        title={name}
        description={
          <>
            <p>${price}</p>
            <p>Stock: {stock}</p>
            {size && <p>Tamaño: {size}</p>}
            {description && <p>{description}</p>}
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;
