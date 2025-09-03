import React from 'react'

function Novedades({ name, price, imageUrl }: { name: string, price: string, imageUrl: string }): React.ReactElement {
    return (
        <div className='group flex flex-col hover:shadow-2xl rounded-xs outline-[#76644c67] outline-2 hover:outline-[#76644c] w-48 hover:scale-105 duration-200'>
            <div className='bg-[#dbc7ab]'>
                <img className='m-auto w-32 h-32' src={`${imageUrl}`} alt={name} />
            </div>
            <div className='flex flex-col justify-around gap-2 px-3 py-2 font-medium truncate'>
                <h5 className='w-44 truncate'>{name}</h5>
                <p className='text-green-800'>{price}</p>
            </div>
        </div>
    )
}

export default Novedades