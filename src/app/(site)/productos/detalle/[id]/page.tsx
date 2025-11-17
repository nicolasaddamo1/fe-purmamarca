// "use client";

// import React, { useEffect, useState } from "react";

// import { InputNumber } from "antd";
// import { getProductById } from "@/app/axios/ProductosApi";
// import { IProduct } from "@/interfaces/productInterface";
// import { useCartStore } from "@/store/cartStore";
// import ProductPageSkeleton from "@/components/ProductosView/Skeleton/ProductPageSkeleton";

// import { toast } from "react-toastify";
// import ProductColorTag from "@/components/UI/ProductColorTag";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export default function Page({ params }: Props) {
//   const { id } = React.use(params);
//   const [data, setData] = useState<IProduct | undefined>(undefined);
//   const [value, setValue] = useState(1);
//   const [imageRender, setImageRender] = useState<string>("");

//   const { addProd } = useCartStore();

//   const FALLBACK_IMAGES = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzW2tT1esdRNYRXDqodxYxHAbrwvs0QQ6A9w&s",
//     "https://d22fxaf9t8d39k.cloudfront.net/6e8610fe739ecb81cfebe1429b43c28c1aabd7f820ab56b492650234d0fbfb35231113.jpg",
//     "https://acdn-us.mitiendanube.com/stores/004/878/822/products/20250602_150158-53520ee9096366a9c417488927602382-480-0.webp",
//   ];

//   const showSuccessToast = () => {
//     toast.success("Producto agregado al carrito!");
//   };

//   useEffect(() => {
//     if (!id) return;

//     async function load() {
//       try {
//         const res = await getProductById(id);
//         setData(res);
//         const images = res.imgs?.length ? res.imgs : FALLBACK_IMAGES;
//         setImageRender(images[0]);
//       } catch {
//         toast.error("Hubo un error al cargar el producto.");
//       }
//     }

//     load();
//   }, [id]);

//   const handleQtyChange = (val: number | null) => {
//     setValue(val && val > 0 ? val : 1);
//   };

//   const handleAddToCart = () => {
//     if (!data) return;
//     addProd({ ...data, stock_order: value });
//     showSuccessToast();
//   };

//   if (!data) return <ProductPageSkeleton />;

//   const productImages = data.imgs?.length ? data.imgs : FALLBACK_IMAGES;

//   return (
//     <section className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
//       <div className="gap-10 md:gap-16 grid grid-cols-1 md:grid-cols-2">
//         {/* Columna Izquierda - Imágenes */}
//         <div className="flex md:flex-row flex-col-reverse gap-4">
//           {/* Thumbnails */}
//           <div className="flex flex-row md:flex-col gap-3 md:gap-4 md:w-24 md:max-h-[600px] overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0">
//             {productImages.map((img, i) => (
//               <div
//                 key={i}
//                 onClick={() => setImageRender(img)}
//                 className={`cursor-pointer rounded-md aspect-square w-16 h-16 md:w-24 md:h-24 overflow-hidden shrink-0 transition-all duration-200 ring-offset-2 ${
//                   img === imageRender
//                     ? "ring-2 ring-primary scale-[1.02]"
//                     : "opacity-70 hover:opacity-100 hover:scale-[1.03]"
//                 }`}
//               >
//                 <img
//                   className="w-full h-full object-cover"
//                   alt={`Thumbnail ${i + 1} de ${data.name}`}
//                   src={img}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Imagen Principal */}
//           <div className="group relative flex-1">
//             <img
//               className="shadow-md rounded-lg w-full h-auto object-cover aspect-[1/1] group-hover:scale-[1.01] transition-transform duration-300"
//               alt={data.name}
//               src={imageRender}
//             />
//           </div>
//         </div>

//         {/*  Columna Derecha - Información */}
//         <div className="md:top-28 md:sticky flex flex-col space-y-8">
//           {/* Título y Precio */}
//           <header className="space-y-3">
//             <h1 className="font-bold text-primary text-3xl md:text-4xl leading-tight">
//               {data.name}
//             </h1>
//             <h6 className="font-semibold text-neutral-900 text-2xl md:text-3xl">
//               {data.priceOnSale ? (
//                 <>
//                   <span className="px-1 text-chocolate">
//                     ${Number(data.priceOnSale).toLocaleString("es-AR")}
//                   </span>
//                   <del className="px-2 text-neutral-500 text-lg">
//                     ${Number(data.price).toLocaleString("es-AR")}
//                   </del>
//                 </>
//               ) : (
//                 <span className="px-1">
//                   ${Number(data.price).toLocaleString("es-AR")}
//                 </span>
//               )}
//             </h6>
//           </header>

//           {/* Cantidad + Botón */}
//           <div className="flex flex-col space-y-4">
//             <div className="flex items-center gap-3">
//               <span className="font-medium text-neutral-800">Cantidad:</span>
//               <InputNumber
//                 controls={false}
//                 value={value}
//                 min={1}
//                 onChange={handleQtyChange}
//                 disabled={!data.available}
//                 className="w-20"
//               />
//             </div>

//             {!data.available && (
//               <span className="font-medium text-red-600">
//                 Producto no disponible
//               </span>
//             )}

//             <button
//               onClick={handleAddToCart}
//               className="bg-primary hover:bg-primary/90 disabled:bg-gray-400 shadow-sm hover:shadow-md px-6 py-3 rounded-md w-full font-semibold text-white text-base transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
//               disabled={!data.available}
//             >
//               Añadir al carrito
//             </button>
//           </div>

//           {/* Descripción */}
//           {data.description && (
//             <div className="space-y-2">
//               <h6 className="font-semibold text-primary text-lg md:text-xl">
//                 Descripción:
//               </h6>
//               <p className="text-neutral-600 text-base leading-relaxed">
//                 {data.description}
//               </p>
//             </div>
//           )}

//           {/* Características */}
//           {(data.size || data.color || data.category?.name) && (
//             <div className="space-y-4">
//               <h6 className="font-semibold text-primary text-lg md:text-xl">
//                 Características:
//               </h6>

//               <div className="flex flex-wrap gap-3">
//                 {data.size && (
//                   <div className="bg-white shadow-sm px-4 py-2 rounded-md">
//                     <span className="font-semibold text-neutral-800 text-sm">
//                       Tamaño:
//                     </span>{" "}
//                     <span className="text-neutral-600 text-sm">
//                       {data.size}
//                     </span>
//                   </div>
//                 )}

//                 {data.color && <ProductColorTag color={data.color} />}

//                 {data.category?.name && (
//                   <div className="bg-white shadow-sm px-4 py-2 rounded-md">
//                     <span className="font-semibold text-neutral-800 text-sm">
//                       Categoría:
//                     </span>{" "}
//                     <span className="text-neutral-600 text-sm">
//                       {data.category.name}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
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

  // ------------------------
  // LÓGICA PROMOCIÓN / SALE
  // ------------------------

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

  const badgeTextOnSale = !isPromotionActive && data.onSale ? "OFERTA" : null;

  // ------------------------

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 max-w-7xl">
      <div className="gap-10 md:gap-16 grid grid-cols-1 md:grid-cols-2">
        {/* IMÁGENES */}
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

          {/* Imagen principal + BADGE */}
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

        {/* INFO */}
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
                  <del className="px-2 text-neutral-500 text-lg">
                    ${data.price.toLocaleString("es-AR")}
                  </del>
                </>
              ) : data.priceOnSale ? (
                <>
                  <span className="px-1 text-chocolate">
                    ${data.priceOnSale.toLocaleString("es-AR")}
                  </span>
                  <del className="px-2 text-neutral-500 text-lg">
                    ${data.price.toLocaleString("es-AR")}
                  </del>
                </>
              ) : (
                <span className="px-1">
                  ${data.price.toLocaleString("es-AR")}
                </span>
              )}
            </h6>
          </header>

          {/* CANTIDAD */}
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

          {/* DESCRIPCIÓN */}
          {data.description && (
            <div className="space-y-2">
              <h6 className="font-semibold text-primary text-lg">
                Descripción:
              </h6>
              <p className="text-neutral-600">{data.description}</p>
            </div>
          )}

          {/* CARACTERÍSTICAS */}
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
