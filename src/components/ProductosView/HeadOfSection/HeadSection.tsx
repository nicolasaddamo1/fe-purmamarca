import Link from 'next/link'
import React from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

function HeadSection({ name, highlight, link }: { name: string, highlight: string | null, link: string }) {
    return (
        <div className='flex flex-row justify-between px-10'>
            <h4 className='flex gap-2 text-xl tracking-wide'>
                {name}
                <span className='font-medium text-secondary'>{highlight ? highlight : null}</span>
            </h4>
            <Link href={link} className='group relative transition-colors'>
                <span className='flex items-center text-secondary hover:text-maroon transition-colors'>
                    Ver Más <IoMdArrowDropright size={20} className='' />
                </span>
                <span className="-bottom-1 left-0 absolute bg-maroon w-0 group-hover:w-full h-[2px] transition-all duration-300 ease-out" />
            </Link>
        </div>
    )
}

export default HeadSection