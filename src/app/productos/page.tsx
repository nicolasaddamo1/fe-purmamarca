import AdBanner from '@/components/ProductosView/AdBanner/AdBanner'
import Category from '@/components/ProductosView/Category/Category'
import HeadSection from '@/components/ProductosView/HeadOfSection/HeadSection'
import Novedades from '@/components/ProductosView/Novedades/Novedades'
import Product from '@/components/ProductosView/Product/Product'
import PromoCarousel from '@/components/ProductosView/PromosCarousel/PromoCarousel'
import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { LiaSearchSolid } from 'react-icons/lia'

const productList = [
    {
        name: "Catarata de humo",
        price: "250.000",
        imageUrl: "https://pbs.twimg.com/media/G1faberXUAAHuad?format=jpg&name=large"
    },
    {
        name: "Catarata de humo",
        price: "250.000",
        imageUrl: "https://pbs.twimg.com/media/G1faberXUAAHuad?format=jpg&name=large"
    },
    {
        name: "Catarata de humo",
        price: "250.000",
        imageUrl: "https://pbs.twimg.com/media/G1faberXUAAHuad?format=jpg&name=large"
    },

]

function page(): React.ReactElement {

    return (
        <div>

            <PromoCarousel />
            <section className='flex flex-col gap-6 px-4 py-10 pt-32'>
                <HeadSection verMas={false} link='/home' name='Observa nuestras' highlight='Categorias' />
                <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    {
                        productList.map((prod, i) =>
                            <div key={i}>
                                <Category name={prod.name} imageUrl={prod.imageUrl} />
                            </div>
                        )
                    }
                </div>
                <HeadSection verMas link='/home' name='Obten los mejores productos al' highlight='mejor precio' />
                <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    {
                        productList.map((prod, i) =>
                            <div key={i}>
                                <Product name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                            </div>
                        )
                    }
                </div>
                <HeadSection verMas link='/home' name='Novedades' highlight={null} />
                <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                    {
                        productList.map((prod, i) =>
                            <div key={i}>
                                <Novedades name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                            </div>
                        )
                    }
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