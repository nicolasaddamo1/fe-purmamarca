"use client";
import Image from "next/image";
import { useState } from "react";

//todo cambiar a backend real
const categories = [
    "Todos",
    "Lamparas de sal",
    "Jardin Zen",
    "Budas",
    "Ganesha",
    "Animales varios",
    "Lechuzas",
    "Trios",
    "Porta Sahumerio/espiral",
    "Sagrada madre",
    "Dijes y pulseras",
    "Llaveros",
    "Bandejas",
    "Cascadas de humo",
    "Hornitos",
    "Velas de cera de soja",
    "Sahumadores",
    "Lamparas de sal c/ cascadas",
    "Contenedores de vidrio",
    "Cadenitas y cordones",
];

type Product = {
    id: number;
    name: string;
    price: number | string;
    img: string;
    rating: number;
    category: string;
};

const products: Product[] = [
  // Lamparas de sal
  { id: 1, name: "CLASSWING", price: 20, img: "/pur1.jpg", rating: 5, category: "Lamparas de sal" },
  { id: 2, name: "MOONLIGHT", price: 22, img: "/pur1.jpg", rating: 4.5, category: "Lamparas de sal" },
  { id: 3, name: "ZENLIGHT", price: 25, img: "/pur1.jpg", rating: 4, category: "Lamparas de sal" },
  { id: 4, name: "NATURAL GLOW", price: 30, img: "/pur1.jpg", rating: 5, category: "Lamparas de sal" },
  { id: 5, name: "PURE SALT", price: 18, img: "/pur1.jpg", rating: 3.5, category: "Lamparas de sal" },
  { id: 6, name: "AURA LIGHT", price: 28, img: "/pur1.jpg", rating: 4.5, category: "Lamparas de sal" },

  // Sahumadores
  { id: 7, name: "HOLDCANE", price: 23, img: "/pur1.jpg", rating: 5, category: "Sahumadores" },
  { id: 8, name: "PALO SANTO", price: 15, img: "/pur1.jpg", rating: 4, category: "Sahumadores" },
  { id: 9, name: "MISTICO", price: 18, img: "/pur1.jpg", rating: 4.5, category: "Sahumadores" },
  { id: 10, name: "TERRA", price: 20, img: "/pur1.jpg", rating: 5, category: "Sahumadores" },
  { id: 11, name: "ALMA", price: 16, img: "/pur1.jpg", rating: 3.5, category: "Sahumadores" },
  { id: 12, name: "ESPIRAL", price: 19, img: "/pur1.jpg", rating: 4.5, category: "Sahumadores" },

  // Jardin Zen
  { id: 13, name: "INAMORATA", price: 12, img: "/pur1.jpg", rating: 4.5, category: "Jardin Zen" },
  { id: 14, name: "ZEN MINI", price: 14, img: "/pur1.jpg", rating: 4, category: "Jardin Zen" },
  { id: 15, name: "ZEN STONE", price: 18, img: "/pur1.jpg", rating: 5, category: "Jardin Zen" },
  { id: 16, name: "MINDFLOW", price: 16, img: "/pur1.jpg", rating: 4, category: "Jardin Zen" },
  { id: 17, name: "LIGHTCOOL", price: 22.5, img: "/pur1.jpg", rating: 5, category: "Jardin Zen" },
  { id: 18, name: "ZEN BALANCE", price: 20, img: "/pur1.jpg", rating: 4.5, category: "Jardin Zen" },
];


/* ------------------------ Subcomponentes UI ------------------------ */
function CategoryPill({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "px-4 py-2 rounded-full text-base md:text-lg",
                "border transition-colors",
                active
                    ? "bg-primary text-white border-primary"
                    : "text-secondary border-secondary/40 bg-white/40 hover:bg-secondary/10",
            ].join(" ")}
        >
            {label}
        </button>
    );
}

function Rating({ value, textColor }: { value: number; textColor: string }) {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: full }).map((_, i) => (
                    <span key={`f-${i}`} className={`text-lg leading-none ${textColor}`}>
                        ★
                    </span>
                ))}
                {hasHalf && (
                    <span className={`text-lg leading-none ${textColor}`}>☆</span>
                )}
            </div>
            <span className={`text-sm ${textColor}`}>{value.toFixed(1)}</span>
        </div>
    );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
    const isSecondRow = index >= 3;
    const textColor = isSecondRow ? "text-primary" : "text-secondary";

    return (
        <div className="border border-secondary/40 rounded-md overflow-hidden">
            <div className="relative w-full aspect-[4/3]">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-4 border-t border-secondary/30">
                <p className={`text-xs uppercase tracking-widest mb-1 ${textColor}`}>
                    {p.name}
                </p>
                <p className={`text-sm mb-2 ${textColor}`}>${p.price}</p>
                <Rating value={p.rating} textColor={textColor} />
            </div>
        </div>
    );
}

/* --------------------------- Sección principal --------------------------- */
const ProductsSection = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const filteredProducts =
        activeCategory === "Todos"
            ? products.slice(0, 6) // solo 6 primeros
            : products.filter((p) => p.category === activeCategory).slice(0, 6);

    return (
        <section className="px-6 md:px-12 py-14">
            <div className="mx-auto max-w-[1400px]">
                {/* Layout 2 columnas: izq categorías / der cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* Columna izquierda (títulos + categorías) */}
                    <div>
                        <p className="text-secondary text-lg md:text-xl">Todos los productos</p>
                        <h2 className="text-primary text-4xl md:text-6xl font-semibold leading-[1.1] mt-3">
                            {activeCategory === "Todos"
                                ? "Todos (nombre de categoría)"
                                : activeCategory}
                        </h2>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {categories.map((c) => (
                                <CategoryPill
                                    key={c}
                                    label={c}
                                    active={activeCategory === c}
                                    onClick={() => setActiveCategory(c)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Columna derecha (grilla + botón) */}
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                            {filteredProducts.map((p, i) => (
                                <ProductCard key={p.id} p={p} index={i} />
                            ))}
                        </div>

                        <div>
                            <button className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/60 rounded-md text-secondary hover:bg-secondary hover:text-white transition">
                                Comprar ahora →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;