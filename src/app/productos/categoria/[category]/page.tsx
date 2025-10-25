"use client"
import Category from '@/components/ProductosView/Category/Category'
import HeadSection from '@/components/ProductosView/HeadOfSection/HeadSection'
import React, { useEffect, useState } from 'react'
import { useProductStore } from '@/store/productsStore'
import { IProduct } from '@/interfaces/productInterface'
import { useCategoryStore } from '@/store/categoryStore'
import Product from '@/components/ProductosView/Product/Product'

function page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = React.use(params)
    const { categories } = useCategoryStore()
    const { products } = useProductStore()
    const [data, setData] = useState<IProduct[]>()

    useEffect(() => {
        if (category === "any") { setData(products) }
        else {
            const filter: IProduct[] = products.filter((prod: IProduct) => prod.categoryId == category)
            setData(filter)
        }
    }, [products])

    return (
        <div className='pt-36'>
            <HeadSection verMas={false} link='/home' name='Ve Otras' highlight='Categorias' />
            <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                {
                    categories.map((prod, i) =>
                        <div key={i}>
                            <Category id={prod.id} name={prod.name} imageUrl={prod.categoryImage} />
                        </div>
                    )
                }
            </div>
            <HeadSection verMas={false} link='/home' name='Nuestros mejores' highlight={""} />
            <div className='gap-6 grid grid-cols-1 md:grid-cols-5 md:p-4 w-full'>
                {
                    data?.map((prod, i) =>
                        <div key={i}>
                            <Product available id={prod.id} name={prod.name} price={prod.price} imageUrl={prod.imgs[0]} />
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default page