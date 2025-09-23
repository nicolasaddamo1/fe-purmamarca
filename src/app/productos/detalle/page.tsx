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
            <div>
                <Image height={450} width={450} alt='imagen' src={"https://pbs.twimg.com/media/G1c9hdeXwAAnu6p?format=png&name=240x240"} />
            </div>
            <div className='flex flex-col gap-6'>
                <header className='font-semibold text-2xl'>
                    <h4>Titulo del producto</h4>
                </header>
                <section className='flex flex-col gap-4'>
                    <h6 className='font-semibold text-2xl'>Price <span className='text-3xl'>$400</span> </h6>

                    <div className='flex items-center gap-2'>
                        <p className='font-semibold'>Cantidad</p>
                        <button onClick={() => setValue((prev) => prev + 1)}>+</button>
                        <InputNumber controls={false} value={value} min={1} max={10} defaultValue={value} onChange={onChange} />

                    </div>
                    <button className='bg-maroon hover:bg-subtitle px-4 py-1 rounded-md w-full font-semibold text-white text-lg duration-200'>Añadir al carrito</button>
                </section>

                metadata of the sale like #4 product most sell
            </div>
        </section>
    )
}

export default page