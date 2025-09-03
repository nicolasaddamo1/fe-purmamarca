import React from 'react'
import { Carousel } from "flowbite-react";

function PromoCarousel() {
    return (
        <div className="h-96 overflow-hidden">
            <Carousel leftControl={null} rightControl={null} slideInterval={3000}>
                <img
                    className="w-full object-cover"
                    src=""
                    alt="..."
                />
                <img
                    className="w-full object-cover"
                    src=""
                    alt="..."
                />
                <img
                    className="w-full object-cover"
                    src=""
                    alt="..."
                />
            </Carousel>
        </div>
    )
}

export default PromoCarousel