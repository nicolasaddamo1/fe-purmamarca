"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductStore } from "@/store/productsStore";
import { useMemo } from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";

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
      <div className="top-1/2 left-2 md:left-6 z-40 absolute flex flex-col gap-4 bg-white/10 md:bg-primary/10 p-6 md:p-0 rounded-2xl -translate-y-1/2">
        <Link
          href="https://www.instagram.com/purmamarca_dustribuidora?igsh=dDR4Zjh0ZmllNXJi"
          target="_blank"
        >
          <FaInstagram
            className="text-[#E1306C] md:text-gray-400 hover:scale-110 transition-transform"
            size={30}
          />
        </Link>

        <Link href="https://www.facebook.com/share/1CApiSuDLx/" target="_blank">
          <FaFacebook
            className="text-[#1877F2] md:text-gray-400 hover:scale-110 transition-transform"
            size={30}
          />
        </Link>

        <Link
          href="https://www.tiktok.com/@purmamarca_distri?_t=ZM-90ndM9THf9H&_r=1"
          target="_blank"
        >
          <FaTiktok
            className="text-black md:text-gray-400 hover:scale-110 transition-transform"
            size={30}
          />
        </Link>

        <Link href="https://wa.me/c/5491133324141" target="_blank">
          <FaWhatsapp
            className="text-[#25D366] md:text-gray-400 hover:scale-110 transition-transform"
            size={30}
          />
        </Link>
      </div>

      {/* Fade lateral */}
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
        <div className="z-10 absolute inset-0 bg-black/20" />

        {images.length > 0 && (
          <motion.div
            className="flex h-full"
            animate={{
              x: ["0%", `-${images.length * 100}%`],
              scale: [1, 1.015, 1],
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
