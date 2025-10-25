"use client"
import AdBanner from '@/components/ProductosView/AdBanner/AdBanner'
import Category from '@/components/ProductosView/Category/Category'
import HeadSection from '@/components/ProductosView/HeadOfSection/HeadSection'
import Product from '@/components/ProductosView/Product/Product'
import PromoCarousel from '@/components/ProductosView/PromosCarousel/PromoCarousel'
import React, { useEffect } from 'react'
import { useProductStore } from '@/store/productsStore'
import { useCategoryStore } from '@/store/categoryStore'
import { getAllCategories } from '@/app/axios/categoriasApi'
import { getAllProducts } from '@/app/axios/ProductosApi'


function page(): React.ReactElement {
    const { categories, setCategories } = useCategoryStore()
    const { products, setProducts } = useProductStore()

    useEffect(() => {
        const getAllCat = async () => {
            try {
                if (!categories) {
                    const res = await getAllCategories()
                    setCategories(res)
                }
                if (!products) {
                    const data = await getAllProducts()
                    setProducts(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getAllCat()
    }, [])
    return (
        <div className='md:pt-32'>

            <PromoCarousel />
            <section className='flex flex-col gap-6 md:px-4 py-10'>
                <div className='hidden md:block'>
                    <HeadSection verMas={false} link='/home' name='Observa nuestras' highlight='Categorias' />
                    <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                        {
                            categories?.map((prod, i) =>
                                <div key={i}>
                                    <Category id={prod.id} name={prod.name} imageUrl={prod.categoryImage} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <HeadSection verMas={false} link='/productos/categoria/any' name='Obten los mejores productos al' highlight='mejor precio' />
                <div className='gap-6 grid grid-cols-1 md:grid-cols-5 md:p-4 w-full'>
                    {
                        products?.map((prod, i) => {
                            return (<div className='m-auto' key={i}>
                                <Product id={prod.id} available={prod.available} priceOnSale={prod.priceOnSale} name={prod.name} price={prod.price} imageUrl={"https://pbs.twimg.com/media/G209xrkXsAESuN9?format=jpg&name=small"} />
                            </div>)
                        }
                        )
                    }
                </div>

                <div className='flex flex-row justify-between items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    <AdBanner imageURL='https://pbs.twimg.com/media/G209xrkXsAESuN9?format=jpg&name=small' />
                    <AdBanner imageURL='https://pbs.twimg.com/media/G209xrkXsAESuN9?format=jpg&name=small' />
                </div>
            </section>
            <section></section>
        </div>
    )
}

export default page