"use client";

import { FaHome, FaSun } from "react-icons/fa";
import { GiMeditation} from "react-icons/gi";

export default function QualitiesSection() {
  const qualities = [
    {
      icon: <FaHome className="text-4xl text-[#4A3F2C]" />,
      subtitle: "En tu espacio favorito...",
      title: "Armoniza tu hogar",
    },
    {
      icon: <FaSun className="text-4xl text-[#4A3F2C]" />,
      subtitle: "Eleva tu vibración, encuentra tu fuerza...",
      title: "Energía para tu día a día",
    },
    {
      icon: <GiMeditation className="text-4xl text-[#4A3F2C]" />,
      subtitle: "Un camino de iluminación y poder...",
      title: "Conexión espiritual",
    },
  ];

  return (
    <section className="bg-[#f6e4d4] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-start gap-12 md:gap-0">
        {qualities.map((q, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center px-6 relative"
          >
            {/* Icono */}
            <div className="mb-4">{q.icon}</div>

            {/* Subtítulo */}
            <p className="text-sm text-gray-500 mb-1">{q.subtitle}</p>

            {/* Título */}
            <h3 className="text-lg font-medium text-[#4A3F2C]">{q.title}</h3>

            {/* Separadores solo en desktop */}
            {i < qualities.length - 1 && (
              <span className="hidden md:block absolute top-0 right-0 h-full w-px bg-gray-300/60"></span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}