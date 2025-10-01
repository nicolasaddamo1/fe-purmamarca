"use client"
import AdBanner from '@/components/ProductosView/AdBanner/AdBanner'
import Category from '@/components/ProductosView/Category/Category'
import HeadSection from '@/components/ProductosView/HeadOfSection/HeadSection'
import Novedades from '@/components/ProductosView/Novedades/Novedades'
import Product from '@/components/ProductosView/Product/Product'
import PromoCarousel from '@/components/ProductosView/PromosCarousel/PromoCarousel'
import React, { useEffect } from 'react'
import { getAllCategories } from '../axios/categoriasApi'
import { getAllProducts } from '../axios/ProductosApi'
import { useProductStore } from '@/store/productsStore'
import { useCategoryStore } from '@/store/categoryStore'


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
        <div className='pt-32'>

            <PromoCarousel />
            <section className='flex flex-col gap-6 px-4 py-10 pt-32'>
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
                <HeadSection verMas link='/productos/categoria/any' name='Obten los mejores productos al' highlight='mejor precio' />
                <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    {
                        products?.map((prod, i) =>
                            <div key={i}>
                                <Product id={prod.id} available={prod.available} priceOnSale={prod.priceOnSale} name={prod.name} price={prod.price} imageUrl={prod.imgs[0]} />
                            </div>
                        )
                    }
                </div>
                <HeadSection verMas link='/home' name='Novedades' highlight={null} />
                <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    //TODO obtener endpoint de novedades
                    {/* {
                        productList.map((prod, i) =>
                            <div key={i}>
                                <Novedades name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                            </div>
                        )
                    } */}
                </div>
                <div className='flex flex-row justify-between items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    <AdBanner imageURL='https://pbs.twimg.com/media/Gzw7xZwWIAAvpaT?format=png&name=small' />
                    <AdBanner imageURL='https://pbs.twimg.com/media/Gzw7xZwWIAAvpaT?format=png&name=small' />
                </div>
            </section>
            <section></section>
        </div>
    )
}

export default page