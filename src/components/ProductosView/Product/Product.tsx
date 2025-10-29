import Link from 'next/link'
import React from 'react'

function Product({ id, name, price, priceOnSale, available, imageUrl, categoryName }: { id: string, name: string, price: number, priceOnSale?: number, available?: boolean, imageUrl: string, categoryName: string }): React.ReactElement {

    return (
        <div className={`group flex h-80 md:h-auto flex-col justify-between hover:shadow-2xl rounded-xs  ${available ? "outline-[#76644c67] hover:outline-[#76644c]" : "outline-neutral-400 hover:outline-neutral-700"} outline-2  w-64 md:w-56  duration-200`}>
            <div className={` ${available ? "bg-[#dbc7ab]" : "bg-gray-200"}`}>
                <img className='m-auto w-full md:w-32 md:h-36' src={imageUrl} title={name} alt={name} />
            </div>
            <div className='flex flex-col items-center md:items-start gap-0.5 md:gap-2 px-3 py-2 w-full md:w-52 font-medium'>
                <i className={` text-sm md:text-md m-auto text-gray-500/60 `}>{categoryName}</i>
                <Link href={`/productos/detalle/${id}`} title={name} className='w-full max-w-full'>
                    <h5 className={` text-2xl w-full font-sans  overflow-ellipsis truncate hover:text-blue-700 duration-200 md:text-xl text-gray-800 ${!available && "text-gray-600"}`}>{name}</h5>
                </Link>
                <div className={`text-2xl md:text-base ${available ? "text-green-800" : "text-gray-800"}`}>
                    {priceOnSale ?
                        <div className='flex items-center gap-1'>
                            <span className=''>${Number(priceOnSale).toLocaleString()}</span>
                            <del className='text-gray-500 md:text-xs text-lg' >${Number(price).toLocaleString()}</del>
                        </div>
                        :
                        <p >$<span className='text-lg'>{Number(price).toLocaleString()}</span></p>

                    }
                </div>
            </div>
            <Link href={`/productos/detalle/${id}`} className='self-center bg-gray-200/60 hover:bg-chocolate group-hover:bg-chocolate/80 m-2 px-4 py-1 rounded-sm text-gray-600 group-hover:text-white transition-all duration-200'>
                Ver Más
            </Link>
        </div>
    )
}

export default Product