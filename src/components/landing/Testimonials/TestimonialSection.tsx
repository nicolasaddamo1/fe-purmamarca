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
//TODO fix import types
function ArrowsChange({ prev, next, setCurrent, current }): React.ReactElement {
  return <div className="flex flex-row md:flex-col justify-center items-center gap-4">
    <button
      onClick={prev}
      aria-label="Anterior testimonio"
      className="hover:bg-[#e0d0c0] p-2 rounded transition"
    >
      <IoIosArrowBack size={26} className="text-[#4A3F2C]" />
    </button>

    <div className="flex flex-row md:flex-col items-center gap-2">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrent(i)}
          aria-label={`Ir al testimonio ${i + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition ${i === current ? "bg-[#4A3F2C]" : "bg-gray-400/50"
            }`}
        />
      ))}
    </div>

    <button
      onClick={next}
      aria-label="Siguiente testimonio"
      className="hover:bg-[#e0d0c0] p-2 rounded transition"
    >
      <IoIosArrowForward size={26} className="text-[#4A3F2C]" />
    </button>
  </div>
}


export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="bg-[#f6e4d4] py-12">
      <div className="flex md:flex-row flex-col items-center gap-12 mx-auto mt-28 mb-28 px-6 max-w-6xl">
        <div
          className="flex-shrink-0 shadow-lg rounded-4xl md:rounded-[32rem] md:w-80 h-64 md:h-[32rem] overflow-hidden"
          style={{
          }}
        >
          <Image
            src={t.img}
            alt={t.author}
            width={560}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-row flex-1 items-stretch gap-1 md:gap-6">
          <div className="flex flex-col flex-1 justify-center">
            <h4 className="mb-2 text-secondary text-sm text-left uppercase tracking-wider">
              Testimonios de nuestros clientes
            </h4>

            <div className="flex items-center mb-4 text-left">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} className="mr-1 text-[#4A3F2C] text-lg" />
              ))}
            </div>

            <blockquote className="mb-4 text-[#4A3F2C] text-lg md:text-xl text-left italic leading-relaxed">
              "{t.text}"
            </blockquote>

            <p className="mb-4 text-gray-600 text-sm text-left">-- {t.author}</p>
          </div>
          <div className="hidden md:flex">

            <ArrowsChange next={next} prev={prev} setCurrent={setCurrent} current={current} />
          </div>
        </div>
        <div className="md:hidden flex">
          <ArrowsChange next={next} prev={prev} setCurrent={setCurrent} current={current} />

        </div>
      </div>
    </section>
  );
}
