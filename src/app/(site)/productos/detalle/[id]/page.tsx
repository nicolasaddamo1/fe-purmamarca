"use client";

import { getProductById } from "@/app/axios/ProductosApi";
import { IProduct } from "@/interfaces/productInterface";
import { useCartStore } from "@/store/cartStore";
import { InputNumber, InputNumberProps, message, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

function Page({ params }: Props) {
  const { id } = React.use(params);

  const [data, setData] = useState<IProduct | undefined>(undefined);
  const [value, setValue] = useState(1);
  const [imageRender, setImageRender] = useState<string>("");

  const { addProd } = useCartStore();
  const [messageApi, contextHolder] = message.useMessage();

  const fallbackImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzW2tT1esdRNYRXDqodxYxHAbrwvs0QQ6A9w&s",
    "https://d22fxaf9t8d39k.cloudfront.net/6e8610fe739ecb81cfebe1429b43c28c1aabd7f820ab56b492650234d0fbfb35231113.jpg",
    "https://acdn-us.mitiendanube.com/stores/004/878/822/products/20250602_150158-53520ee9096366a9c417488927602382-480-0.webp",
  ];

  const success = () => {
    messageApi.open({ type: "success", content: "Agregado al Carrito!" });
  };

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await getProductById(id);
        setData(res);
        setImageRender(res.imgs?.[0] ?? fallbackImages[0]);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    }

    load();
  }, [id]);

  const onChange: InputNumberProps["onChange"] = (val) => setValue(Number(val));

  function handleClick() {
    if (!data) return;
    addProd({ ...data, stock_order: value });
    success();
  }

  if (!data) {
    return (
      <section className="flex flex-row justify-center items-center gap-10 px-10 py-36 w-full">
        <div className="flex gap-6 w-full">
          <Skeleton.Node active style={{ width: 450, height: 450 }} />
          <div className="flex flex-col gap-4 w-[60%]">
            <Skeleton.Input active size="large" style={{ width: 200 }} />
            <Skeleton paragraph={{ rows: 4 }} active />
            <Skeleton.Button active size="large" shape="round" />
            <Skeleton paragraph={{ rows: 6 }} active />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex md:flex-row flex-col justify-center items-center gap-10 md:px-10 py-2 md:py-36">
      {contextHolder}
      <div className="flex md:flex-row flex-col p-4 md:p-0 w-full">
        <div className="flex flex-row md:flex-col gap-2 p-2 md:w-24 max-h-[40rem] overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll no-scrollbar">
          {(data.imgs?.length ? data.imgs : fallbackImages).map((img, i) => (
            <div
              key={i}
              onClick={() => setImageRender(img)}
              className={`flex items-center rounded-sm outline-2 hover:outline-chocolate md:min-h-20 md:max-h-20 min-h-16 min-w-20 overflow-hidden duration-200 ${
                img === imageRender
                  ? "opacity-100 outline-chocolate"
                  : "opacity-60 outline-transparent"
              }`}
            >
              <img className="m-auto w-20 h-16" alt={data.name} src={img} />
            </div>
          ))}
        </div>

        <img
          className="m-auto md:h-[40rem]"
          height={450}
          width={550}
          alt={data.name}
          src={imageRender}
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:px-0 md:w-[60%]">
        <header className="font-bold text-subtitle text-4xl">
          <h4>{data.name}</h4>
        </header>

        <section className="flex flex-col gap-4">
          <h6 className="font-semibold text-2xl">
            ${" "}
            {data.priceOnSale ? (
              <>
                <span className="px-1 text-3xl">
                  {Number(data.priceOnSale).toLocaleString()}
                </span>
                <del className="px-2 text-gray-500 text-sm">
                  {Number(data.price).toLocaleString()}
                </del>
              </>
            ) : (
              <span className="px-1 text-3xl">
                {Number(data.price).toLocaleString()}
              </span>
            )}
          </h6>

          <div className="flex flex-col items-left gap-2">
            <div className="flex gap-2 font-semibold">
              Cantidad:
              <InputNumber
                controls={false}
                value={value}
                min={1}
                onChange={onChange}
                disabled={!data.available}
              />
            </div>
            {!data.available && (
              <span className="font-medium text-red-600">
                Producto no disponible
              </span>
            )}
          </div>

          <button
            onClick={handleClick}
            className="bg-subtitle hover:bg-chocolate disabled:bg-gray-400 px-4 py-1 rounded-md w-full font-semibold text-white text-lg duration-200 disabled:cursor-not-allowed"
            disabled={!data.available}
          >
            Añadir al carrito
          </button>
        </section>

        <section className="flex flex-col gap-2">
          <h6 className="font-semibold text-subtitle text-lg md:text-2xl">
            Descripción:
          </h6>
          <p className="text-sm">{data.description}</p>

          <h6 className="font-semibold text-subtitle text-lg md:text-2xl">
            Características:
          </h6>
          <ul className="flex flex-col gap-2 text-sm md:text-base">
            {data.size && (
              <li>
                <span className="font-semibold">Tamaño:</span> {data.size}
              </li>
            )}
            {data.color && (
              <li>
                <span className="font-semibold">Color:</span> {data.color}
              </li>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Page;
