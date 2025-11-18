"use client";

import React, { useState } from "react";
import { Card, Tooltip, App } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { IProduct } from "@/interfaces/productInterface";
import { useProductStore } from "@/store/productsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { toast } from "react-toastify";
import { updateProduct } from "@/app/axios/ProductosApi";

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
  const { toggleAvailability } = useProductStore();
  const { categories } = useCategoryStore();

  const {
    name,
    imgs,
    price,
    stock,
    size,
    onSale,
    priceOnSale,
    promotion,
    categoryId,
  } = product;

  const [isAvailable, setIsAvailable] = useState(product.available);
  const { modal } = App.useApp();

  const categoryName =
    categories.find((c) => c.id === categoryId)?.name ?? null;

  const isCategoryPromo = !!categoryName && /promo/i.test(categoryName);

  const imageSrc =
    imgs && imgs.length > 0 && imgs[0].startsWith("http")
      ? imgs[0]
      : "/placeholder.png";

  const isPromoActive =
    promotion &&
    new Date(promotion.start_date) <= new Date() &&
    new Date(promotion.expiration_date) >= new Date();

  const promoDiscount =
    isPromoActive && promotion?.promo_percentage
      ? price - (price * promotion.promo_percentage) / 100
      : null;

  const showDiscountBadge = isPromoActive || onSale || isCategoryPromo;

  const handleDelete = () => {
    modal.confirm({
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

      await updateProduct(product.id, { available: updatedAvailable });
      toggleAvailability(product.id, updatedAvailable);

      toast.success(
        `Producto ${updatedAvailable ? "habilitado" : "deshabilitado"}`
      );
    } catch {
      setIsAvailable(isAvailable);
      toast.error("Error al actualizar disponibilidad");
    }
  };

  const isProductActive = isAvailable && stock > 0;

  const shouldShowSale =
    onSale &&
    priceOnSale !== null &&
    priceOnSale !== undefined &&
    Number(priceOnSale) < Number(price);

  return (
    <Card
      hoverable
      className={`shadow-md hover:shadow-lg rounded-2xl transition-all relative ${
        !isProductActive ? "opacity-60" : ""
      }`}
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
          {!isAvailable ? (
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
      <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden">
        {showDiscountBadge && (
          <div className="top-2 left-2 z-10 absolute bg-red-600 shadow px-2 py-1 rounded-sm font-bold text-white text-xs">
            {isCategoryPromo ? (
              <span>🏷️ PROMO ESPECIAL</span>
            ) : (
              <span>
                🔥 OFERTA{" "}
                {isPromoActive && promotion?.name
                  ? promotion.name.toUpperCase()
                  : ""}
              </span>
            )}
          </div>
        )}

        <img
          alt={name}
          src={imageSrc}
          className="z-0 p-2 rounded-t-2xl w-full h-48 object-cover"
        />
      </div>

      <Card.Meta
        title={name}
        description={
          <>
            <div className="flex items-center gap-2 mb-2">
              {isPromoActive && promotion?.promo_percentage ? (
                <>
                  <p className="text-gray-500 text-sm line-through">
                    ${Number(price).toLocaleString()}
                  </p>
                  <p className="font-bold text-red-600 text-lg">
                    $
                    {promoDiscount?.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}{" "}
                    <span className="text-gray-500 text-xs">
                      (-{promotion.promo_percentage}%)
                    </span>
                  </p>
                </>
              ) : shouldShowSale ? (
                <>
                  <p className="text-gray-500 text-sm line-through">
                    ${Number(price).toLocaleString()}
                  </p>
                  <p className="font-bold text-red-600 text-lg">
                    ${Number(priceOnSale).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="font-bold text-green-700 text-lg">
                  ${Number(price).toLocaleString()}
                </p>
              )}
            </div>

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
          </>
        }
      />
    </Card>
  );
};

export default ProductCardAdm;
