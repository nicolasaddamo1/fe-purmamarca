import Link from 'next/link'
import React from 'react'

function Product({ name, price, imageUrl }: { name: string, price: string, imageUrl: string }): React.ReactElement {
    return (
        <Link href={"/productos/detalle"} className='group flex flex-col hover:shadow-2xl rounded-xs outline-[#76644c67] outline-2 hover:outline-[#76644c] w-36 hover:scale-105 duration-200'>
            <div className='bg-[#dbc7ab]'>
                <img className='m-auto w-32 h-36' src={`${imageUrl}`} alt={name} />
            </div>
            <div className='flex flex-col gap-2 px-3 py-2 w-32 font-medium truncate'>
                <h5 className='truncate'>{name}</h5>
                <p className='text-green-800'>{price}</p>
            </div>
        </Link>
    )
}

export default Product