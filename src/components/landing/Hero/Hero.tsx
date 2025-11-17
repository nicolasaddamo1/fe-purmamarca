"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/productsStore";
import { useMemo } from "react";

const Hero: React.FC = () => {
  const products = useProductStore((s) => s.products);

  const images = useMemo(() => {
    if (!products || products.length === 0) return [];
    const imgs = products
      .map((p) => {
        if (!p.imgs || p.imgs.length === 0) return null;
        return p.imgs[Math.floor(Math.random() * p.imgs.length)];
      })
      .filter(Boolean) as string[];

    return imgs.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [products]);

  return (
    <section className="relative flex md:flex-row flex-col w-full h-screen overflow-hidden">
      {/* Fade Lateral */}
      <div className="z-20 absolute inset-0 pointer-events-none">
        <div className="top-0 left-0 absolute bg-gradient-to-r from-black/40 to-transparent w-32 h-full" />
        <div className="top-0 right-0 absolute bg-gradient-to-l from-black/40 to-transparent w-32 h-full" />
      </div>

      {/* Logo */}
      <div className="hidden z-30 relative md:flex justify-center items-center bg-primary/90 w-full md:w-1/2 h-full">
        <div className="relative w-[400px] h-[400px]">
          <Image
            src="/purlogo.png"
            alt="Logo Purmamarca"
            fill
            className="object-contain scale-90 md:scale-100"
            priority
          />
        </div>
      </div>

      {/* Carrusel */}
      <div className="relative w-full md:w-1/2 h-full overflow-hidden">
        {/* Oscurecido leve */}
        <div className="z-10 absolute inset-0 bg-black/20" />

        {images.length > 0 && (
          <motion.div
            className="flex h-full"
            animate={{
              x: ["0%", `-${images.length * 100}%`],
              scale: [1, 1.015, 1], // zoom leve PRO
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: images.length * 7,
              scale: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {[...images, ...images].map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-screen md:w-[50vw] h-screen md:h-full"
              >
                <Image
                  src={img}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover transition-all duration-700 ease-linear"
                  priority={i === 0}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
