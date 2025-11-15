"use client";

import React, { useState, useMemo } from "react";
import { Modal, Form, Input, Button, List, Typography } from "antd";
import { useCartStore } from "@/store/cartStore";
import { FaWhatsapp } from "react-icons/fa";

const { Text } = Typography;

export default function PedidoFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { prods, clearCart } = useCartStore();

  const { totalAmount, totalItems } = useMemo(() => {
    let totalAmount = 0;
    let totalItems = 0;

    prods.forEach((prod) => {
      const unitPrice =
        prod.onSale && prod.priceOnSale && prod.priceOnSale > 0
          ? prod.priceOnSale
          : prod.price;
      totalAmount += unitPrice * prod.stock_order;
      totalItems += prod.stock_order;
    });

    return { totalAmount: totalAmount, totalItems: totalItems };
  }, [prods]);

  const handleFinish = (values: any) => {
    const { nombre, direccion, localidad, codigoPostal, telefono, correo } =
      values;

    // --- 1. ENCABEZADO Y DATOS DEL CLIENTE ---
    let mensaje = `
*--- PEDIDO DE PRODUCTOS ---*

*Cliente:* ${nombre}
*Teléfono:* ${telefono}
*Correo:* ${correo}
*Dirección de Envío:*
- ${direccion}
- ${localidad} (CP: ${codigoPostal})

*---  DETALLE DE LA ORDEN (${totalItems} artículos) ---*
`;
    // --- 2. LISTA DE PRODUCTOS (incluyendo URL de la imagen) ---
    prods.forEach((prod, index) => {
      const unitPrice =
        prod.onSale && prod.priceOnSale && prod.priceOnSale > 0
          ? prod.priceOnSale
          : prod.price;
      const totalProducto = unitPrice * prod.stock_order;

      const imageUrl = prod.imgs?.[0] || "No disponible";

      mensaje += `
*${index + 1}. ${prod.name}*
   - Cantidad: ${prod.stock_order}
   - Precio Unitario: $${unitPrice.toFixed(2)} ${
        prod.onSale ? "(*Oferta*)" : ""
      }
   - Total Producto: $${totalProducto.toFixed(2)}
   - Imagen: ${imageUrl} 
`;
    });

    // --- 3. RESUMEN FINAL ---
    mensaje += `
*---  RESUMEN DE COBRO ---*
*Total a Pagar:* $${totalAmount.toFixed(2)}

¡Gracias por su pedido!`;

    // Envío a WhatsApp
    const url = `https://wa.me/542615515398?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");

    // Limpieza
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
        <div className="bg-gray-50 my-4 p-4 border border-gray-200 rounded-lg">
          <h3 className="mb-2 font-semibold text-primary/80">
            Resumen de la Orden
          </h3>
          <List
            size="small"
            dataSource={prods}
            renderItem={(prod) => {
              const unitPrice =
                prod.onSale && prod.priceOnSale && prod.priceOnSale > 0
                  ? prod.priceOnSale
                  : prod.price;
              const totalProducto = unitPrice * prod.stock_order;
              return (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Text strong className="text-sm">
                        {prod.name} (x{prod.stock_order})
                      </Text>
                    }
                    description={
                      prod.onSale ? (
                        <Text type="danger" className="text-xs">
                          OFERTA: ${unitPrice.toFixed(2)} c/u
                        </Text>
                      ) : (
                        <Text className="text-xs">
                          ${unitPrice.toFixed(2)} c/u
                        </Text>
                      )
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
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre completo",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="direccion"
            label="Dirección"
            rules={[
              { required: true, message: "Por favor ingrese su dirección" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="localidad"
            label="Localidad"
            rules={[
              { required: true, message: "Por favor ingrese su localidad" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="codigoPostal"
            label="Código Postal"
            rules={[
              { required: true, message: "Por favor ingrese su código postal" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[
              { required: true, message: "Por favor ingrese su teléfono" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="correo"
            label="Correo"
            rules={[
              { required: true, message: "Por favor ingrese su correo" },
              { type: "email", message: "Ingrese un correo válido" },
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
