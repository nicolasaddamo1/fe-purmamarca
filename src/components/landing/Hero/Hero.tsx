"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/pur1.jpg",
  "/pur2.jpg",

  "/pur4.jpg",
  "/pur5.jpg",
  "/pur6.jpg",
  "/pur7.jpg",
  "/pur8.jpg",
  "/pur9.jpg",
  "/pur10.jpg",
];

const Hero = () => {
  return (
    <section className="flex md:flex-row flex-col w-full h-screen md:h-[480px] overflow-hidden">
      {/* Imagen fija (solo en desktop) */}
      <div className="hidden md:flex justify-center items-center bg-primary/80 w-full md:w-1/2 h-full">
        <div className="relative w-[400px] h-[400px]">
          <Image
            src="/purlogo.png"
            alt="Logo Purmamarca"
            fill
            className="object-contain scale-90 md:scale-100"
            style={{ transformOrigin: "center" }}
            priority
          />
        </div>
      </div>

      {/* Carrusel de imágenes */}
      <div className="relative w-full md:w-1/2 h-full overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: ["0%", `-${images.length * 100}%`] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: images.length * 10,
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
                className="object-cover scale-100 md:scale-100"
                style={{ transformOrigin: "center" }}
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
