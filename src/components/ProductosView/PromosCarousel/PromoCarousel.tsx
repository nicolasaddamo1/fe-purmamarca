"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Skeleton } from "antd";
import { useProductStore } from "@/store/productsStore";
import { useCategoryStore } from "@/store/categoryStore"; // Asegúrate de que esta ruta sea correcta

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "250px",
  lineHeight: "250px",
  textAlign: "center",
  background: "#364d79",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const PromoCarousel: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { promotions } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    if (promotions.length >= 1) {
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

  return (
    <Carousel autoplay autoplaySpeed={1500}>
      {promotions.map((promo) => {
        const categoryNames = getCategoryNames(promo.category_ids);

        return (
          <section key={promo.name} title={promo.name}>
            <div
              className="relative rounded-b-md overflow-hidden"
              style={contentStyle}
            >
              <img
                src={promo.image_url}
                style={imageStyle}
                alt={promo.name}
                title={promo.name}
              />

              <div
                className={`
                  absolute inset-0 text-white 
                  flex flex-col justify-center items-center p-4 
                  opacity-0 transition-opacity duration-300
                  hover:opacity-100 cursor-pointer
                `}
                style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              >
                {promo.promo_percentage && (
                  <h2 className="mb-2 font-bold text-4xl">
                    {promo.promo_percentage}% OFF
                  </h2>
                )}

                <p className="mb-4 font-semibold text-amber-300 text-lg text-center">
                  Aplica a: {categoryNames}
                </p>

                <div className="text-gray-200 text-sm text-center">
                  <p>
                    Inicia: **{new Date(promo.start_date).toLocaleDateString()}
                    **
                  </p>
                  <p>
                    Finaliza: **
                    {new Date(promo.expiration_date).toLocaleDateString()}**
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </Carousel>
  );
};

export default PromoCarousel;
