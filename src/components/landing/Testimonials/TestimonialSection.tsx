"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Testimonial = {
  id: number;
  img: string;
  text: string;
  author: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    img: "/pur2.jpg",
    text:
      "Una pieza única para crear un ambiente de paz y armonía. Al encender un cono de incienso, el humo fluye suavemente hacia abajo, como una pequeña cascada, llenando el espacio con fragancias relajantes.",
    author: "Ramon W",
    rating: 5,
  },
  {
    id: 2,
    img: "/pur2.jpg",
    text:
      "Los productos llegaron en perfectas condiciones, excelente calidad y atención al detalle.",
    author: "María G",
    rating: 5,
  },
  {
    id: 3,
    img: "/pur2.jpg",
    text:
      "Recomendado al 100%, muy buena atención al cliente y el envío fue rápido.",
    author: "Lucas R",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-12 bg-[#f6e4d4]">
      <div className="max-w-6xl mt-28 mb-28 mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* IMAGEN */}
        <div
          className="overflow-hidden flex-shrink-0 shadow-lg"
          style={{
            width: 280,
            height: 400,
            borderRadius: "50%/30%",
          }}
        >
          <Image
            src={t.img}
            alt={t.author}
            width={560}
            height={800}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* BLOQUE DE TEXTO + NAVEGACIÓN */}
        <div className="flex-1 flex flex-row items-stretch gap-6">
          {/* TEXTO */}
          <div className="flex-1 flex flex-col justify-center">
            <h4 className="text-secondary uppercase text-sm tracking-wider mb-2 text-left">
              Testimonios de nuestros clientes
            </h4>

            <div className="flex items-center mb-4 text-left">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} className="text-[#4A3F2C] text-lg mr-1" />
              ))}
            </div>

            <blockquote className="text-[#4A3F2C] italic text-lg md:text-xl leading-relaxed mb-4 text-left">
              "{t.text}"
            </blockquote>

            <p className="text-gray-600 text-sm mb-4 text-left">-- {t.author}</p>
          </div>

          {/* NAVEGACIÓN VERTICAL */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Flecha izquierda */}
            <button
              onClick={prev}
              aria-label="Anterior testimonio"
              className="p-2 hover:bg-[#e0d0c0] rounded transition"
            >
              <IoIosArrowBack size={26} className="text-[#4A3F2C]" />
            </button>

            {/* Dots */}
            <div className="flex flex-col items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    i === current ? "bg-[#4A3F2C]" : "bg-gray-400/50"
                  }`}
                />
              ))}
            </div>

            {/* Flecha derecha */}
            <button
              onClick={next}
              aria-label="Siguiente testimonio"
              className="p-2 hover:bg-[#e0d0c0] rounded transition"
            >
              <IoIosArrowForward size={26} className="text-[#4A3F2C]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
