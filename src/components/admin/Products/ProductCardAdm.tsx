"use client";

import React, { useState } from "react";
import { Card, Tooltip, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { IProduct } from "@/interfaces/productInterface";
import { useProductStore } from "@/store/productsStore";
import { toast } from "react-toastify";
import { updateProductAvailability } from "@/app/axios/ProductosApi";

interface ProductCardAdmProps {
  product: IProduct;
  onEdit?: (product: IProduct) => void;
  onDelete?: (product: IProduct) => void;
}

const ProductCardAdm: React.FC<ProductCardAdmProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const { name, imgs, price, stock, size, description } = product;
  const { toggleAvailability } = useProductStore();
  const [isAvailable, setIsAvailable] = useState(product.available);

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

  const handleToggleAvailable = async () => {
    try {
      const updatedAvailable = !isAvailable;
      setIsAvailable(updatedAvailable);

      // 🔥 Actualiza en el backend
      await updateProductAvailability(product.id, updatedAvailable);

      // 🔄 Actualiza en el store global
      toggleAvailability(product.id, updatedAvailable);

      toast.success(
        `Producto ${updatedAvailable ? "habilitado" : "deshabilitado"}`
      );
    } catch {
      setIsAvailable(isAvailable); // rollback visual
      toast.error("Error al actualizar disponibilidad");
    }
  };

  const isProductActive = isAvailable && stock > 0;

  return (
    <Card
      hoverable
      className={`shadow-md hover:shadow-lg rounded-2xl transition-all ${
        !isProductActive ? "opacity-60" : ""
      }`}
      cover={
        <img
          alt={name}
          src={imageSrc}
          className="rounded-t-2xl w-full h-40 object-cover"
        />
      }
      actions={[
        <Tooltip title="Editar" key="edit">
          <EditOutlined
            onClick={() => onEdit?.(product)}
            className="text-blue-500 hover:text-blue-600"
          />
        </Tooltip>,

        <Tooltip
          title={isAvailable ? "Deshabilitar producto" : "Habilitar producto"}
          key="available"
        >
          {isAvailable ? (
            <CheckCircleOutlined
              onClick={handleToggleAvailable}
              className="text-green-600 hover:text-green-700"
            />
          ) : (
            <StopOutlined
              onClick={handleToggleAvailable}
              className="text-gray-500 hover:text-gray-600"
            />
          )}
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
            <p>
              Stock:{" "}
              {isProductActive ? (
                stock
              ) : (
                <span className="font-semibold text-red-500">
                  No disponible
                </span>
              )}
            </p>
            {size && <p>Tamaño: {size}</p>}
            {description && <p>{description}</p>}
          </>
        }
      />
    </Card>
  );
};

export default ProductCardAdm;
