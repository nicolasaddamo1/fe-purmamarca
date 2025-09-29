"use client"
import { InputNumber, InputNumberProps } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

function page() {
    const [value, setValue] = useState(1)
    const onChange: InputNumberProps['onChange'] = (valueChange) => {
        setValue(Number(valueChange))
    };
    return (
        <section className='flex flex-row justify-center items-center gap-10 px-10 py-36'>
            <div className='flex w-full'>
                <div className='flex flex-col gap-4 bg-white p-2 w-24 overflow-y-scroll no-scrollbar'>
                    <div className='items-center rounded-md outline-2 outline-transparent hover:outline-chocolate h-24 overflow-hidden duration-200'>
                        <Image className='m-auto' height={450} width={450} alt='Title of the product' src={"https://dcdn-us.mitiendanube.com/stores/001/210/124/products/927310-mla42083967261_062020-f-8189aae681b7a28a4315923406432970-640-0.jpg"} />
                    </div>
                </div>
                <Image className='m-auto' height={450} width={450} alt='Title of the product' src={"https://dcdn-us.mitiendanube.com/stores/001/210/124/products/927310-mla42083967261_062020-f-8189aae681b7a28a4315923406432970-640-0.jpg"} />
            </div>
            <div className='flex flex-col gap-6 w-[60%]'>
                <header className='font-semibold text-4xl'>
                    <h4>Estatua de Buda</h4>
                </header>
                <section className='flex flex-col gap-4'>
                    <h6 className='font-semibold text-2xl'> $<span className='text-3xl'>400</span> </h6>

                    <div className='flex items-center gap-2'>
                        <p className='font-semibold'>Cantidad:</p>
                        <InputNumber controls={false} value={value} min={1} max={10} defaultValue={value} onChange={onChange} />

                    </div>
                    <button className='bg-maroon hover:bg-subtitle px-4 py-1 rounded-md w-full font-semibold text-white text-lg duration-200'>Añadir al carrito</button>
                </section>

                <section className='flex flex-col gap-4'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus tempore at nemo nihil quas eaque eos mollitia atque possimus aliquam. Pariatur ipsam in omnis odio eligendi aliquam eius eum at?

                    </p>
                    <h6 className='text-2xl'>Caracteristicas:</h6>
                    <ul className='flex flex-col gap-2'>
                        <li>Tamaño: 25cm alto 50cm ancho</li>
                        <li>Tamaño: 25cm alto 50cm ancho</li>
                        <li>Tamaño: 25cm alto 50cm ancho</li>
                        <li>Tamaño: 25cm alto 50cm ancho</li>
                    </ul>
                </section>
            </div>
        </section>
    )
}

export default page