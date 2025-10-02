"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useCartStore } from "@/store/cartStore";

export default function PedidoFormModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { prods, clearCart } = useCartStore()

    const handleFinish = (values: any) => {
        const { nombre, direccion, localidad, codigoPostal, telefono, correo } = values;

        const mensaje = `¡Hola! Quiero solicitar un pedido con los siguientes datos: 
- Nombre completo: ${nombre} 
- Dirección: ${direccion}
- Localidad: ${localidad} 
- Código Postal: ${codigoPostal} 
- Teléfono: ${telefono} 
- Correo: ${correo} 
Estos son los productos: 
    ${prods.map((prod) => {
            return (
                `
            -Nombre: ${prod.name}, 
             -Cantidad: ${prod.stock_order} 
             -Precio: ${prod.priceOnSale ?? prod.price} 
            ---- \n
            `

            )
        }
        )}
`;

        const url = `https://wa.me/phoneNumber?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
        setIsModalOpen(false);
        form.resetFields();
        clearCart()
    };

    return (
        <>
            <button className='bg-subtitle hover:bg-chocolate px-4 py-1 rounded-md w-full font-semibold text-white text-lg duration-200' onClick={() => setIsModalOpen(true)}>
                Solicitar Pedido
            </button>

            <Modal
                title="Formulario de Pedido"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                style={{ zIndex: 999999 }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name="nombre"
                        label="Nombre completo"
                        rules={[{ required: true, message: "Por favor ingrese su nombre completo" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="direccion"
                        label="Dirección"
                        rules={[{ required: true, message: "Por favor ingrese su dirección" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="localidad"
                        label="Localidad"
                        rules={[{ required: true, message: "Por favor ingrese su localidad" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="codigoPostal"
                        label="Código Postal"
                        rules={[{ required: true, message: "Por favor ingrese su código postal" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="telefono"
                        label="Teléfono"
                        rules={[{ required: true, message: "Por favor ingrese su teléfono" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="correo"
                        label="Correo"
                        rules={[
                            { required: true, message: "Por favor ingrese su correo" },
                            { type: "email", message: "Ingrese un correo válido" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Solicitar Pedido
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
