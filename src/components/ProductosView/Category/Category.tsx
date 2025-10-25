import Link from 'next/link'
import React from 'react'

function Category({ id, name, imageUrl }: { id: string, name: string, imageUrl: string }): React.ReactElement {
    return (
        <Link href={`/productos/categoria/${id}`} className='group flex flex-col justify-center items-center gap-2 hover:drop-shadow-xl hover:scale-105 duration-200'>
            <img className='rounded-full outline-2 outline-transparent group-hover:outline-[#76644cb6] w-24 h-24 duration-200' src={imageUrl ?? "https://graciadivina.com.ar/wp-content/uploads/2022/02/Porta-Sahumerio-Buda-Sentado-Meditando-Anejo-01.jpg"} alt={name} />
            <h5 className='w-24 font-medium text-xs text-center truncate'>{name}</h5>
        </Link>
    )
}

export default Category