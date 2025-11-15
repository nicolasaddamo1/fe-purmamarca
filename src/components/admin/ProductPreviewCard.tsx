// "use client";

// import React from "react";
// import { useProductCreationStore } from "@/store/useProductCreationStore";
// import { IoImagesSharp } from "react-icons/io5";

// const ProductPreviewCard: React.FC = () => {
//   const product = useProductCreationStore();

//   const isOnSale =
//     product.onSale &&
//     product.priceOnSale &&
//     product.priceOnSale < product.price;

//   const displayPrice = isOnSale ? product.priceOnSale : product.price;

//   return (
//     <div className="flex bg-white shadow-lg hover:shadow-2xl border border-chocolate/20 rounded-2xl w-full max-w-2xl h-80 overflow-hidden transition-all duration-300 cursor-pointer">
//       {/* IMAGEN */}
//       <div className="relative flex-shrink-0 w-72 h-full">
//         {product.imgPreviews.length > 0 ? (
//           <img
//             src={product.imgPreviews[0]}
//             alt={product.name || "Preview"}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="flex flex-col justify-center items-center bg-gray-200 w-full h-full">
//             <IoImagesSharp className="w-14 h-14 text-chocolate/50" />
//             <span className="mt-1 text-chocolate/50 text-sm">Sin imagen</span>
//           </div>
//         )}

//         {/* BADGE OFERTA */}
//         {isOnSale && (
//           <div className="top-3 left-3 absolute bg-red-600/90 shadow-md px-3 py-1 rounded-lg font-bold text-white text-sm">
//             -
//             {Math.round(
//               ((product.price - product.priceOnSale!) / product.price) * 100
//             )}
//             %
//           </div>
//         )}
//       </div>

//       {/* CONTENIDO */}
//       <div className="flex flex-col justify-between p-5 w-full text-left">
//         {/* TÍTULO */}
//         <h4 className="font-semibold text-chocolate text-2xl leading-tight">
//           {product.name || "Sin nombre"}
//         </h4>

//         {/* SEPARADOR SUAVE */}
//         <div className="bg-chocolate/10 my-2 w-full h-px"></div>

//         {/* PRECIOS */}
//         <div className="flex items-center gap-4 mb-2">
//           {isOnSale ? (
//             <>
//               <span className="font-semibold text-chocolate/50 text-lg line-through">
//                 ${product.price.toFixed(2)}
//               </span>
//               <span className="drop-shadow-sm font-extrabold text-red-600 text-3xl">
//                 ${displayPrice.toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span className="drop-shadow-sm font-extrabold text-primary text-3xl">
//               ${displayPrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* INFO EXTRA */}
//         <div className="gap-x-6 gap-y-1 grid grid-cols-2 text-chocolate/80 text-sm">
//           <span className="font-medium">
//             Stock:{" "}
//             <span className="font-semibold text-primary">
//               {product.stock || 0}
//             </span>
//           </span>
//           <span className="font-medium">
//             Tamaño:{" "}
//             <span className="font-semibold text-primary">
//               {product.size || "No definido"}
//             </span>
//           </span>
//         </div>

//         {/* DESCRIPCIÓN */}
//         <p className="mt-3 pr-2 text-chocolate/60 text-sm line-clamp-3 leading-relaxed">
//           {product.description || "Sin descripción"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductPreviewCard;
"use client";

import React, { useState, useEffect } from "react";
import { useProductCreationStore } from "@/store/useProductCreationStore";
import { IoImagesSharp } from "react-icons/io5";
import ProductColorTag from "../UI/ProductColorTag";

const ProductPreviewCard: React.FC = () => {
  const product = useProductCreationStore();

  // Estado local para manejar la imagen principal seleccionada (por índice)
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Reiniciar el índice si la lista de imágenes cambia (por ejemplo, si se cargan nuevas imágenes)
  useEffect(() => {
    if (mainImageIndex >= product.imgPreviews.length) {
      setMainImageIndex(0);
    }
  }, [product.imgPreviews.length, mainImageIndex]);

  const isOnSale =
    product.onSale &&
    product.priceOnSale &&
    product.priceOnSale < product.price;

  const displayPrice = isOnSale ? product.priceOnSale : product.price;

  const currentImageSrc = product.imgPreviews[mainImageIndex];

  return (
    <div className="flex bg-white shadow-lg hover:shadow-2xl border border-chocolate/20 rounded-2xl w-full max-w-2xl h-96 overflow-hidden transition-all duration-300 cursor-pointer">
      {/* IMAGEN */}
      <div className="relative flex-shrink-0 w-78 h-full">
        {product.imgPreviews.length > 0 ? (
          <>
            <img
              src={currentImageSrc}
              alt={product.name || "Preview"}
              className="w-full h-full object-cover"
            />

            {/* Miniaturas de imágenes */}
            {product.imgPreviews.length > 1 && (
              <div className="bottom-3 left-1/2 absolute flex gap-2 bg-white/80 shadow-lg backdrop-blur-sm p-2 rounded-xl overflow-x-auto -translate-x-1/2">
                {product.imgPreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`miniatura-${i}`}
                    onClick={() => setMainImageIndex(i)}
                    className={`flex-shrink-0 border-2 ${
                      i === mainImageIndex
                        ? "border-primary scale-105"
                        : "border-transparent"
                    } rounded-lg w-10 h-10 object-cover cursor-pointer transition-all duration-200 hover:border-chocolate`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-200 w-full h-full">
            <IoImagesSharp className="w-14 h-14 text-chocolate/50" />
            <span className="mt-1 text-chocolate/50 text-sm">Sin imagen</span>
          </div>
        )}

        {/* BADGE OFERTA */}
        {isOnSale && (
          <div className="top-3 left-3 absolute bg-red-600/90 shadow-md px-3 py-1 rounded-lg font-bold text-white text-sm">
            -
            {Math.round(
              ((product.price - product.priceOnSale!) / product.price) * 100
            )}
            %
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col justify-between p-5 w-full text-left">
        {/* TÍTULO */}
        <h4 className="font-semibold text-chocolate text-2xl leading-tight">
          {product.name || "Sin nombre"}
        </h4>

        {/* SEPARADOR SUAVE */}
        <div className="bg-chocolate/10 my-2 w-full h-px"></div>

        {/* PRECIOS */}
        <div className="flex justify-start items-center gap-4 mb-2">
          {isOnSale ? (
            <>
              <span className="drop-shadow-sm font-extrabold text-primary/80 text-3xl">
                ${displayPrice.toFixed(2)}
              </span>
              <span className="font-semibold text-chocolate/50 text-lg line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="drop-shadow-sm font-extrabold text-primary text-3xl">
              ${displayPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* INFO EXTRA */}
        <div className="gap-x-6 gap-y-1 grid grid-cols-1 text-chocolate/80 text-sm">
          <span className="font-medium">
            Stock:{" "}
            <span className="font-semibold text-primary">
              {product.stock || 0}
            </span>
          </span>
          <span className="font-medium">
            Tamaño:{" "}
            <span className="font-semibold text-primary">
              {product.size || "N/D"}
            </span>
          </span>

          <span className="font-medium">
            Categoría:{" "}
            <span className="font-semibold text-primary">
              {product.categoryName || "N/D"}
            </span>
          </span>
        </div>

        {/* DESCRIPCIÓN */}
        <p className="mt-3 pr-2 text-chocolate/60 text-sm line-clamp-4 leading-relaxed">
          {product.description || "Sin descripción"}
        </p>
        <span className="font-semibold text-primary">
          {(product.color && <ProductColorTag color={product.color} />) ||
            "N/D"}
        </span>
      </div>
    </div>
  );
};

export default ProductPreviewCard;
