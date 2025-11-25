"use client";

import React, { useState, useMemo } from "react";
import { Modal, Form, Input, Button, List, Typography, Alert } from "antd";
import { useCartStore, IProdCart } from "@/store/cartStore";
import { FaWhatsapp } from "react-icons/fa";

const { Text } = Typography;

/* -------------------------------------------
   MISMA LÓGICA QUE EL SIDEBAR (PROMO + ONSALE)
---------------------------------------------- */
function getFinalUnitPrice(prod: IProdCart) {
  const now = new Date();

  const hasPromo =
    prod.promotion &&
    prod.promotion.promo_percentage &&
    prod.promotion.promo_percentage > 0 &&
    new Date(prod.promotion.start_date) <= now &&
    new Date(prod.promotion.expiration_date) >= now;

  if (hasPromo && prod.promotion) {
    const discount = prod.price * (prod.promotion.promo_percentage! / 100);
    return prod.price - discount;
  }

  if (prod.onSale && prod.priceOnSale && prod.priceOnSale > 0) {
    return prod.priceOnSale;
  }

  return prod.price;
}

export default function PedidoFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { prods, clearCart } = useCartStore();

  /* --- TOTAL DE ITEMS Y TOTAL DE PRECIO --- */
  const { totalAmount, totalItems } = useMemo(() => {
    let totalAmount = 0;
    let totalItems = 0;

    prods.forEach((prod) => {
      const unitPrice = getFinalUnitPrice(prod);
      totalAmount += unitPrice * prod.stock_order;
      totalItems += prod.stock_order;
    });

    return { totalAmount, totalItems };
  }, [prods]);

  interface FormValues {
    nombre: string;
    direccion: string;
    localidad: string;
    codigoPostal: string;
    telefono: string;
    correo: string;
  }

  const handleFinish = (values: FormValues) => {
    const { nombre, direccion, localidad, codigoPostal, telefono, correo } =
      values;

    // --- ENCABEZADO NUEVO ---
    let mensaje = `
Hola! Estoy interesado en comprar estos productos 

*--- DATOS DEL CLIENTE ---*
*Nombre:* ${nombre}
*Teléfono:* ${telefono}
*Correo:* ${correo}

*Dirección:*
- ${direccion}
- ${localidad} (CP: ${codigoPostal})

*--- DETALLE DEL CARRITO (${totalItems} artículos) ---*
`;

    // --- PRODUCTOS ---
    prods.forEach((prod, index) => {
      const unitPrice = getFinalUnitPrice(prod);
      const totalProducto = unitPrice * prod.stock_order;

      const isPromo =
        prod.promotion &&
        prod.promotion.promo_percentage &&
        prod.promotion.promo_percentage > 0;

      mensaje += `
*${index + 1}. ${prod.name}*
   - Cantidad: ${prod.stock_order}
   - Precio Unitario: $${unitPrice.toFixed(2)} ${
        isPromo ? "(*Promo*)" : prod.onSale ? "(*Oferta*)" : ""
      }
   - Total Producto: $${totalProducto.toFixed(2)}
   
`;
    });

    // --- RESUMEN ---
    mensaje += `
*--- TOTAL FINAL ---*
$${totalAmount.toFixed(2)}

Me gustaria saber  los medios de pago y cómo seguimos?
`;

    // WhatsApp
    const url = `https://wa.me/5491133324141?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");

    setIsModalOpen(false);
    form.resetFields();
    clearCart();
  };

  return (
    <>
      <button
        className={`flex items-center justify-center gap-2 bg-primary hover:bg-primary/70 px-4 py-2 rounded-lg w-full font-bold text-white text-lg transition-colors duration-200 cursor-pointer ${
          prods.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => prods.length > 0 && setIsModalOpen(true)}
        disabled={prods.length === 0}
      >
        <FaWhatsapp size={20} />
        Solicitar Pedido
      </button>

      <Modal
        title={
          <div className="font-bold text-primary text-xl">
            📋 Formulario de Pedido
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        style={{ zIndex: 999999 }}
      >
        <Alert
          message="Productos sujetos a stock. Los precios de los productos son en efectivo."
          type="info"
          showIcon
          className="mb-4 text-center"
        />
        <div className="bg-gray-50 my-4 p-4 border border-gray-200 rounded-lg">
          <h3 className="mb-2 font-semibold text-primary/80">
            Resumen de la Orden
          </h3>

          <List
            size="small"
            dataSource={prods}
            renderItem={(prod) => {
              const unitPrice = getFinalUnitPrice(prod);
              const totalProducto = unitPrice * prod.stock_order;

              const isPromo =
                prod.promotion &&
                prod.promotion.promo_percentage &&
                prod.promotion.promo_percentage > 0;

              return (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Text strong className="text-sm">
                        {prod.name} (x{prod.stock_order})
                      </Text>
                    }
                    description={
                      <Text
                        className={`text-xs ${
                          isPromo
                            ? "text-green-700"
                            : prod.onSale
                            ? "text-red-600"
                            : "text-gray-700"
                        }`}
                      >
                        {isPromo
                          ? `PROMO: $${unitPrice.toFixed(2)} c/u`
                          : prod.onSale
                          ? `OFERTA: $${unitPrice.toFixed(2)} c/u`
                          : `$${unitPrice.toFixed(2)} c/u`}
                      </Text>
                    }
                  />
                  <div>
                    <Text strong className="text-md text-primary">
                      ${totalProducto.toFixed(2)}
                    </Text>
                  </div>
                </List.Item>
              );
            }}
          />

          <div className="flex justify-between mt-3 pt-2 border-gray-200 border-t">
            <Text strong className="text-md">
              Total Final ({totalItems} items)
            </Text>
            <Text strong className="text-chocolate text-xl">
              ${totalAmount.toFixed(2)}
            </Text>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="nombre"
            label="Nombre completo"
            rules={[{ required: true, message: "Ingrese su nombre completo" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="direccion"
            label="Dirección"
            rules={[{ required: true, message: "Ingrese su dirección" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="localidad"
            label="Localidad"
            rules={[{ required: true, message: "Ingrese su localidad" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="codigoPostal"
            label="Código Postal"
            rules={[{ required: true, message: "Ingrese su código postal" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[{ required: true, message: "Ingrese su teléfono" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="correo"
            label="Correo"
            rules={[
              { required: true, message: "Ingrese su correo" },
              { type: "email", message: "Correo inválido" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="!bg-primary hover:!bg-primary/80 w-full transition-colors"
              size="large"
            >
              <span className="flex justify-center items-center gap-2 text-white">
                <FaWhatsapp size={20} />
                Enviar Pedido por WhatsApp
              </span>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
