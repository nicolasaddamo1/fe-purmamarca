"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/pur1.jpg",
  "/pur2.jpg",
  "/pur3.jpg",
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
    <section className="md:flex w-full h-[480px] overflow-hidden">
      <div className="flex justify-center items-center bg-secondary w-full md:w-1/2 h-[300px] md:h-full">
        <Image
          src="/logpur.png"
          alt="Imagen fija"
          width={300}
          height={300}
          className="object-contain"
          priority
        />
      </div>

      <div className="relative w-full md:w-1/2 h-[200px] md:h-full overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 60,
          }}
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="relative flex-shrink-0 w-[50vw] h-full">
              <Image
                src={img}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
