"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Skeleton } from "antd";
import Image from "next/image";
import { useProductStore } from "@/store/productsStore";
import { useCategoryStore } from "@/store/categoryStore";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "250px",
  textAlign: "center",
  background: "#364d79",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "6px",
};

const BackgroundCircles: React.FC = () => {
  const circles = [
    {
      size: "w-64 h-64",
      color: "bg-[#fbd6a2]",
      top: "top-10",
      left: "left-10",
      opacity: "opacity-70",
    },
    {
      size: "w-48 h-48",
      color: "bg-[#76644c]",
      bottom: "bottom-10",
      right: "right-20",
      opacity: "opacity-50",
    },
    {
      size: "w-32 h-32",
      color: "bg-[#612608]",
      top: "top-1/4",
      right: "right-1/3",
      opacity: "opacity-40",
    },
    {
      size: "w-20 h-20",
      color: "bg-[#6a994e]",
      bottom: "bottom-1/4",
      left: "left-1/3",
      opacity: "opacity-40",
    },
  ];

  return (
    <>
      {circles.map((circle, i) => (
        <div
          key={i}
          className={`absolute rounded-full filter blur-md ${circle.size} ${
            circle.color
          } ${circle.top ?? ""} ${circle.bottom ?? ""} ${circle.left ?? ""} ${
            circle.right ?? ""
          } ${circle.opacity}`}
          style={{ zIndex: 0 }}
        />
      ))}
    </>
  );
};

const PromoPlaceholderBanner: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center bg-[#fff6ee] shadow-inner mt-10 md:mt-0 rounded-md w-full h-[250px] overflow-hidden">
      <BackgroundCircles />

      <div className="z-10 flex flex-col items-center gap-4 text-center">
        <Image
          src="/purlogo.png"
          alt="Logo Purmamarca"
          width={380}
          height={380}
          className="drop-shadow-md object-contain"
          priority
        />
      </div>
    </div>
  );
};

const PromoCarousel: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { promotions } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    if (promotions.length >= 0) {
      setLoaded(true);
    }
  }, [promotions]);

  const getCategoryNames = (ids?: string[]): string => {
    if (!ids || ids.length === 0) return "General";
    const names = ids
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter((name): name is string => !!name);
    return names.length > 0 ? names.join(", ") : "Varias categorías";
  };

  if (!loaded) {
    return (
      <div className="flex justify-around items-center w-full h-[250px]">
        <Skeleton.Button
          active
          style={{ width: "95svw", height: 250, borderRadius: 6 }}
        />
      </div>
    );
  }

  if (promotions.length === 0) {
    return <PromoPlaceholderBanner />;
  }

  return (
    <Carousel autoplay autoplaySpeed={2500} dots={false}>
      {promotions.map((promo) => {
        const categoryNames = getCategoryNames(promo.category_ids);

        return (
          <section key={promo.id ?? promo.name} title={promo.name}>
            <div
              className="relative rounded-md overflow-hidden"
              style={contentStyle}
            >
              <img
                src={promo.image_url}
                style={imageStyle}
                alt={promo.name}
                title={promo.name}
              />

              <div className="bottom-4 left-4 absolute flex flex-col gap-1 bg-black/40 shadow-lg backdrop-blur-md px-4 py-3 border border-white/20 rounded-lg max-w-[85%] md:max-w-xs text-white animate-[fadeIn_0.6s_ease-in-out]">
                <p className="font-semibold text-base md:text-lg leading-tight">
                  {promo.name}
                </p>

                {promo.promo_percentage && (
                  <p className="font-bold text-amber-300 text-sm md:text-base">
                    {promo.promo_percentage}% OFF
                  </p>
                )}

                {promo.category_ids && promo.category_ids.length > 0 && (
                  <p className="opacity-90 text-xs md:text-sm">
                    · {categoryNames}
                  </p>
                )}

                {promo.start_date && promo.expiration_date && (
                  <p className="opacity-80 text-[10px] md:text-xs">
                    {new Date(promo.start_date).toLocaleDateString()} →{" "}
                    {new Date(promo.expiration_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </Carousel>
  );
};

export default PromoCarousel;
