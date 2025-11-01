"use client";

import { IPromotion } from "@/interfaces/promotionsInterface";
import { useCategoryStore } from "@/store/categoryStore";
import { Card, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";

interface CardPromotionProps {
    promotion: IPromotion;
    onEdit?: (promotion: IPromotion) => void;
    onDelete?: (promotion: IPromotion) => void;
}

export function CardPromotion({ promotion, onEdit, onDelete }: CardPromotionProps) {
    const { expiration_date, image_url, name, start_date, category_ids, promo_percentage } = promotion;
    const { categories } = useCategoryStore();

    const categories_names: string[] = [];
    category_ids?.forEach((cat_id) => {
        categories.map(
            (categorie) => categorie.id === cat_id && categories_names.push(categorie.name)
        );
    });

    return (
        <Card
            className="shadow-md hover:shadow-lg rounded-2xl transition-all"
            cover={
                <img
                    alt={name}
                    src={image_url}
                    className="rounded-t-2xl w-full h-40 object-cover"
                />
            }
            actions={[
                <Tooltip title="Editar" key="edit">
                    <EditOutlined onClick={() => onEdit?.(promotion)} />
                </Tooltip>,
                <Tooltip title="Eliminar" key="delete">
                    <DeleteOutlined
                        onClick={() => onDelete?.(promotion)}
                        className="text-red-500 hover:text-red-600"
                    />
                </Tooltip>,
            ]}
        >
            <Card.Meta
                title={name}
                description={
                    <div className="min-h-24 text-sm">
                        <p>Inicio: {new Date(start_date).toLocaleDateString()}</p>
                        <p>Fin: {new Date(expiration_date).toLocaleDateString()}</p>
                        {categories_names.length >= 1 && (
                            <p>Categorías: {categories_names.join(", ")}</p>
                        )}
                        {promo_percentage && (
                            <p>Descuento: {promo_percentage}%</p>
                        )}
                    </div>
                }
            />
        </Card>
    );
}
