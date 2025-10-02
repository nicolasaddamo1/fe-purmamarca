import Link from 'next/link'
import React from 'react'

function Product({ id, name, price, priceOnSale, available, imageUrl }: { id: string, name: string, price: number, priceOnSale?: number, available?: boolean, imageUrl: string }): React.ReactElement {

    return (
        <Link href={`/productos/detalle/${id}`} className={`group flex flex-col hover:shadow-2xl rounded-xs  ${available ? "outline-[#76644c67] hover:outline-[#76644c]" : "outline-neutral-400 hover:outline-neutral-700"} outline-2  w-36 hover:scale-105 duration-200`}>
            <div className={` ${available ? "bg-[#dbc7ab]" : "bg-gray-200"}`}>
                <img className='m-auto w-32 h-36' src={`${imageUrl}`} alt={name} />
            </div>
            <div className='flex flex-col gap-2 px-3 py-2 w-32 font-medium truncate'>
                <h5 className={`truncate ${!available && "text-gray-600"}`}>{name}</h5>
                <div className={`${available ? "text-green-800" : "text-gray-800"}`}>
                    {priceOnSale ?
                        <div className='flex items-center gap-1'>
                            <span className=''>{priceOnSale}</span>
                            <del className='text-gray-500 text-xs' >{price}</del>
                        </div>
                        :
                        <p >{price}</p>

                    }
                </div>
            </div>
        </Link>
    )
}

export default Product