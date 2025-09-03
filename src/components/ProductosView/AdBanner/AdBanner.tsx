import React from 'react'

function AdBanner({ imageURL }: { imageURL: string }) {
    return (
        <div>
            <img src={imageURL} className='w-[500px] h-96' alt="Imagen de promo" />
        </div>
    )
}

export default AdBanner