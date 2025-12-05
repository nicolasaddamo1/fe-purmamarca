"use client";

import { FaHome, FaSun } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

export default function QualitiesSection() {
  const qualities = [
    {
      icon: <FaHome className="text-primary text-4xl" />,
      subtitle: "Vende lo que todos",
      title: "Quieren comprar",
    },
    {
      icon: <FaSun className="text-primary text-4xl" />,
      subtitle: "Deco para todos",
      title: "Los espacios",
    },
    {
      icon: <GiMeditation className="text-primary text-4xl" />,
      subtitle: "Holística, protección",
      title: "Calma y bienestar",
    },
  ];

  return (
    <section className="pb-16">
      <div className="items-start gap-12 md:gap-0 grid grid-cols-1 md:grid-cols-3 mx-auto px-6 max-w-6xl">
        {qualities.map((q, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center px-6 text-center"
          >
            {/* Icono */}
            <div className="mb-4">{q.icon}</div>

            {/* Subtítulo */}
            <p className="mb-1 text-gray-500 text-sm">{q.subtitle}</p>

            {/* Título */}
            <h3 className="font-medium text-[#4A3F2C] text-lg">{q.title}</h3>

            {/* Separadores solo en desktop */}
            {i < qualities.length - 1 && (
              <span className="hidden md:block top-0 right-0 absolute bg-gray-300/60 w-px h-full"></span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
