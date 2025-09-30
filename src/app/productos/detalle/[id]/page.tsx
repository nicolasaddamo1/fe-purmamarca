"use client"
import { getProductById } from '@/app/axios/ProductosApi'
import { IProduct } from '@/interfaces/productInterface'
import { useCartStore } from '@/store/cartStore'
import { InputNumber, InputNumberProps, Skeleton } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


function page({ params }: { params: Promise<{ id: string }> }) {
    const [value, setValue] = useState(1)
    const { addProd } = useCartStore()
    const [data, setData] = useState<undefined | IProduct>(undefined)
    const { id } = React.use(params)
    async function getProduct(id: string | number) {
        try {
            const res = await getProductById(id)
            console.log(res)
            setData(res)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (id) getProduct(id)
    }
        , [id])

    const [imageRender, setImageRender] = useState<string>(data?.imgs[0]!)
    const onChange: InputNumberProps['onChange'] = (valueChange) => {
        setValue(Number(valueChange))
    };
    function handleClick() {
        addProd({ ...data!, stock_order: value })
    }
    if (!data) {
        return (
            <section className="flex flex-row justify-center items-center gap-10 px-10 py-36 w-full">
                <div className="flex gap-6 w-full">
                    <Skeleton.Image active style={{ width: 450, height: 450 }} />
                    <div className="flex flex-col gap-4 w-[60%]">
                        <Skeleton.Input active size="large" style={{ width: 200 }} />
                        <Skeleton paragraph={{ rows: 4 }} active />
                        <Skeleton.Button active size="large" shape="round" />
                        <Skeleton paragraph={{ rows: 6 }} active />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className='flex flex-row justify-center items-center gap-10 px-10 py-36'>
            <div className='flex w-full'>
                <div className='flex flex-col gap-2 bg-white p-2 w-24 max-h-[40rem] overflow-y-scroll no-scrollbar'>
                    {data.imgs.map((img, i) => {
                        return (
                            <div key={i} onMouseEnter={() => setImageRender(img)} onMouseLeave={() =>
                                setImageRender(data.imgs[0])
                            } className='flex items-center bg-maroon rounded-sm outline-2 outline-transparent hover:outline-chocolate min-h-20 max-h-20 overflow-hidden duration-200'>
                                <Image className='m-auto' height={450} width={450} alt='Title of the product' src={img} />
                            </div>
                        )
                    })}
                </div>
                <Image className='m-auto h-[40rem]' height={450} width={450} alt='Title of the product' src={imageRender} />
            </div>
            <div className='flex flex-col gap-2 w-[60%]'>
                <header className='font-semibold text-subtitle text-4xl'>
                    <h4>{data.name} </h4>
                </header>
                <section className='flex flex-col gap-4'>
                    <h6 className='font-semibold text-2xl'> $
                        {data.priceOnSale ?
                            <>
                                <span className='px-1 text-3xl'>{data.priceOnSale}</span>
                                <del className='px-2 text-gray-500 text-sm' >{data.price}</del>
                            </>
                            :
                            <span className='px-1 text-3xl'>{data.price}</span>
                        }
                    </h6>

                    <div className='flex flex-col items-left gap-2'>
                        <div className='flex gap-2 font-semibold'>Cantidad:
                            <InputNumber controls={false} value={value} min={1} defaultValue={value} onChange={onChange} />
                        </div>
                    </div>
                    <button onClick={() => handleClick()} className='bg-subtitle hover:bg-chocolate px-4 py-1 rounded-md w-full font-semibold text-white text-lg duration-200'>Añadir al carrito</button>
                </section>

                <section className='flex flex-col gap-2'>
                    <h6 className='font-medium text-subtitle text-2xl'>Descripción:</h6>
                    <p>
                        {data.description}
                    </p>
                    <h6 className='font-medium text-subtitle text-2xl'>Caracteristicas:</h6>
                    <ul className='flex flex-col gap-2'>
                        {data.size && <li>Tamaño: {data.size}</li>}
                        {data.color && <li>Color: {data.color}</li>}
                    </ul>
                </section>
            </div>
        </section>
    )
}

export default page