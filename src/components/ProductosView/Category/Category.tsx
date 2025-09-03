import React from 'react'

function Category({ name, imageUrl }: { name: string, imageUrl: string }): React.ReactElement {
    return (
        <div className='group flex flex-col justify-center items-center gap-2 hover:drop-shadow-xl hover:scale-105 duration-200'>
            <img className='rounded-full outline-2 outline-transparent group-hover:outline-[#76644cb6] w-24 h-24 duration-200' src={imageUrl} alt={name} />
            <h5 className='w-24 font-medium text-xs truncate'>{name}</h5>
        </div>
    )
}

export default Category