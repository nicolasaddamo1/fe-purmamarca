import Category from '@/components/ProductosView/Category/Category'
import HeadSection from '@/components/ProductosView/HeadOfSection/HeadSection'
import React from 'react'
import { productList } from '../../page'
import Product from '@/components/ProductosView/Product/Product'

function page() {
    return (
        <div className='pt-36'>
            <HeadSection verMas={false} link='/home' name='Ve Otras' highlight='Categorias' />
            <div className='flex flex-row justify-left items-center gap-4 p-4 w-full max-w-[1200px] overflow-x-scroll no-scrollbar'>
                {
                    productList.map((prod, i) =>
                        <div key={i}>
                            <Category name={prod.name} imageUrl={prod.imageUrl} />
                        </div>
                    )
                }
            </div>
            <HeadSection verMas={false} link='/home' name='Nuestros mejores' highlight={"param"} />
            <div className='flex flex-row flex-wrap justify-left items-center gap-6 m-auto p-4 max-w-[1200px] h-full'>
                {
                    productList.map((prod, i) =>
                        <div key={i}>
                            <Product name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                        </div>
                    )
                }
                {
                    productList.map((prod, i) =>
                        <div key={i}>
                            <Product name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                        </div>
                    )
                }
                {
                    productList.map((prod, i) =>
                        <div key={i}>
                            <Product name={prod.name} price={prod.price} imageUrl={prod.imageUrl} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default page