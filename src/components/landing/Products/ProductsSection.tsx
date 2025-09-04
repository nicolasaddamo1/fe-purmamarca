"use client";
import Image from "next/image";
import { useState } from "react";

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

const products = [
  { id: 1, name: "CLASSWING", price: 20, img: "/prod1.jpg", rating: 5 },
  { id: 2, name: "HOLDCANE", price: 23, img: "/prod2.jpg", rating: 5 },
  { id: 3, name: "HOLDCANE", price: 23, img: "/prod2.jpg", rating: 5 },
  { id: 4, name: "INUMDATIA", price: 12, img: "/prod3.jpg", rating: 4.5 },
  { id: 5, name: "LIGHTCOOL", price: 22.5, img: "/prod4.jpg", rating: 5 },
  { id: 6, name: "LIGHTCOOL", price: 22.5, img: "/prod4.jpg", rating: 5 },
];

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  return (
    <section className="px-6 md:px-12 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        Todos los productos
      </h2>

      {/* Categorías */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "border-secondary text-secondary hover:bg-secondary hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-3 flex flex-col items-center"
          >
            <div className="relative w-full h-40 mb-3">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-maroon">${p.price}</p>
            <p className="text-yellow-600">{"★".repeat(Math.floor(p.rating))}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition">
          Comprar ahora →
        </button>
      </div>
    </section>
  );
};

export default ProductsSection;
