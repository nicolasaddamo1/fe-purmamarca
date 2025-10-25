"use client"
import React, { useEffect, useState } from 'react';
import { Carousel, Skeleton } from 'antd';

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '250px',
    width: "100%",
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
};
const images = ["https://img.freepik.com/vector-gratis/plantilla-banner-horizontal-rebajas-viernes-negro_23-2150867247.jpg?semt=ais_hybrid&w=740", "https://img.freepik.com/vetores-gratis/modelo-de-banner-de-venda-horizontal-plano-com-foto_23-2149000923.jpg",]

const PromoCarousel: React.FC = () => {

    const [loaded, setLoaded] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImagesLoaded((prev) => prev + 1);
            };
        });
    }, []);

    useEffect(() => {
        if (imagesLoaded === images.length) {
            setLoaded(true);
        }
    }, [imagesLoaded]);

    if (!loaded) {
        return (
            <div className="flex justify-around items-center w-full h-[250px]">
                <Skeleton.Button
                    active
                    style={{ width: "95svw", height: 250, borderRadius: 20 }}
                />
            </div>
        );
    }
    return (
        <Carousel autoplay autoplaySpeed={1500} >
            {images.map((src, i) => (
                <section key={i}>
                    <div>
                        <img src={src} style={contentStyle} alt={`promo-${i}`} />
                    </div>
                </section>
            ))}


        </Carousel>
    );
};

export default PromoCarousel;