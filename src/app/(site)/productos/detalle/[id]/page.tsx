"use client";

import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { getProductById } from "@/app/axios/ProductosApi";
import { IProduct } from "@/interfaces/productInterface";
import { useCartStore } from "@/store/cartStore";
import ProductPageSkeleton from "@/components/ProductosView/Skeleton/ProductPageSkeleton";
import { toast } from "react-toastify";
import ProductColorTag from "@/components/UI/ProductColorTag";

type Props = {
  params: Promise<{ id: string }>;
};

const Page: React.FC<Props> = ({ params }) => {
  const { id } = React.use(params);
  const [data, setData] = useState<IProduct | undefined>(undefined);
  const [value, setValue] = useState(1);
  const [imageRender, setImageRender] = useState("");

  const { addProd } = useCartStore();

  const FALLBACK_IMAGES = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzW2tT1esdRNYRXDqodxYxHAbrwvs0QQ6A9w&s",
    "https://d22fxaf9t8d39k.cloudfront.net/6e8610fe739ecb81cfebe1429b43c28c1aabd7f820ab56b492650234d0fbfb35231113.jpg",
    "https://acdn-us.mitiendanube.com/stores/004/878/822/products/20250602_150158-53520ee9096366a9c417488927602382-480-0.webp",
  ];

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await getProductById(id);
        setData(res);
        setImageRender(res.imgs?.[0] ?? FALLBACK_IMAGES[0]);
      } catch {
        toast.error("Hubo un error al cargar el producto.");
      }
    };

    load();
  }, [id]);

  const handleQtyChange = (val: number | null) => {
    setValue(val && val > 0 ? val : 1);
  };

  const handleAdd = () => {
    if (!data) return;
    addProd({ ...data, stock_order: value });
    toast.success("Producto agregado al carrito!");
  };

  if (!data) return <ProductPageSkeleton />;

  const productImages = data.imgs?.length ? data.imgs : FALLBACK_IMAGES;

  const isPromotionActive =
    data.promotion &&
    data.promotion.promo_percentage &&
    data.promotion.promo_percentage > 0 &&
    new Date() >= new Date(data.promotion.start_date) &&
    new Date() <= new Date(data.promotion.expiration_date);

  const discountedPrice = isPromotionActive
    ? Math.round(data.price * (1 - data.promotion!.promo_percentage! / 100))
    : null;

  const badgeTextPromo = isPromotionActive
    ? `🔥 PROMO: ${data.promotion?.name ?? ""}`
    : null;

  const badgeTextOnSale = !isPromotionActive && data.onSale ? "🔥OFERTA" : null;

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
      <div className="gap-10 md:gap-16 grid grid-cols-1 md:grid-cols-2">
        <div className="flex md:flex-row flex-col-reverse gap-4">
          <div className="flex flex-row md:flex-col gap-3 md:w-24 md:max-h-[600px] overflow-x-auto md:overflow-y-auto no-scrollbar">
            {productImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setImageRender(img)}
                className={`cursor-pointer rounded-md aspect-square w-16 h-16 md:w-24 md:h-24 overflow-hidden transition-all ${
                  img === imageRender
                    ? "ring-2 ring-primary scale-[1.02]"
                    : "opacity-60 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <img className="w-full h-full object-cover" src={img} />
              </div>
            ))}
          </div>

          <div className="relative flex-1">
            {(badgeTextPromo || badgeTextOnSale) && (
              <div className="top-3 left-3 absolute bg-red-600 shadow px-3 py-1 rounded-md font-bold text-white text-sm">
                {badgeTextPromo || badgeTextOnSale}
              </div>
            )}

            <img
              className="shadow-md rounded-lg w-full object-cover aspect-[1/1]"
              src={imageRender}
            />
          </div>
        </div>

        <div className="md:top-28 md:sticky flex flex-col space-y-8">
          <header className="space-y-3">
            <h1 className="font-bold text-primary text-3xl md:text-4xl">
              {data.name}
            </h1>

            <h6 className="font-semibold text-neutral-900 text-2xl md:text-3xl">
              {discountedPrice ? (
                <>
                  <span className="px-1 text-chocolate">
                    ${discountedPrice.toLocaleString("es-AR")}
                  </span>
                  {/* Tachar si el precio con descuento es menor que el original */}
                  {discountedPrice < data.price && (
                    <del className="px-2 text-neutral-500 text-lg">
                      ${data.price.toLocaleString("es-AR")}
                    </del>
                  )}
                </>
              ) : data.priceOnSale ? (
                <>
                  <span className="px-1 text-chocolate">
                    ${data.priceOnSale.toLocaleString("es-AR")}
                  </span>
                  {/* Tachar si el precio de oferta manual es menor que el original */}
                  {data.priceOnSale < data.price && (
                    <del className="px-2 text-neutral-500 text-lg">
                      ${data.price.toLocaleString("es-AR")}
                    </del>
                  )}
                </>
              ) : (
                <span className="px-1">
                  ${data.price.toLocaleString("es-AR")}
                </span>
              )}
            </h6>
          </header>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">Cantidad:</span>
              <InputNumber
                controls={false}
                value={value}
                min={1}
                onChange={handleQtyChange}
                disabled={!data.available}
                className="w-20"
              />
            </div>

            {!data.available && (
              <span className="font-medium text-red-600">
                Producto no disponible
              </span>
            )}

            <button
              onClick={handleAdd}
              disabled={!data.available}
              className="bg-primary hover:bg-primary/90 disabled:bg-gray-400 shadow px-6 py-3 rounded-md text-white"
            >
              Añadir al carrito
            </button>
          </div>

          {data.description && (
            <div className="space-y-2">
              <h6 className="font-semibold text-primary text-lg">
                Descripción:
              </h6>
              <p className="text-neutral-600">{data.description}</p>
            </div>
          )}

          {(data.size || data.color || data.category?.name) && (
            <div className="space-y-4">
              <h6 className="font-semibold text-primary text-lg">
                Características:
              </h6>

              <div className="flex flex-wrap gap-3">
                {data.size && (
                  <div className="bg-white shadow-sm px-4 py-2 rounded-md text-sm">
                    <span className="font-semibold">Tamaño:</span> {data.size}
                  </div>
                )}

                {data.color && <ProductColorTag color={data.color} />}

                {data.category?.name && (
                  <div className="bg-white shadow-sm px-4 py-2 rounded-md text-sm">
                    <span className="font-semibold">Categoría:</span>{" "}
                    {data.category.name}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
