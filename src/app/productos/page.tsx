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
            <nav className="top-15 left-0 z-50 fixed bg-white/20 backdrop-blur-md border-white/20 border-b w-full">
                <div className="flex justify-between items-center mx-auto px-6 py-4 max-w-7xl">
                    <label htmlFor="searchBar" className='flex flex-row items-center bg-white m-auto px-2 rounded-md w-96 h-8 text-secondary text-center'>
                        <LiaSearchSolid size={20} className='font-semibold' />
                        <input type="text" id='searchBar' className='px-2 border-0 outline-0 w-full h-full' placeholder='Algun producto de busqueda' />
                    </label>
                    <div
                        className="group relative text-secondary hover:text-primary text-sm transition-colors"
                    >
                        <span className='flex flex-row items-center gap-2'>CATEGORIAS <IoMdArrowDropdown size={20} /> </span>
                        <span className="-bottom-1 left-0 absolute bg-primary w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
                    </div>

                </div>
            </nav>
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