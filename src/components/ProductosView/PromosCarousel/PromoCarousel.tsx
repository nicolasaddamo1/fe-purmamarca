"use client"
import React, { useEffect, useState } from 'react';
import { Carousel, Skeleton } from 'antd';
import { useProductStore } from '@/store/productsStore';
import { useRouter } from 'next/navigation';
import { IPromotion } from '@/interfaces/promotionsInterface';

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

const PromoCarousel: React.FC = () => {

    const [loaded, setLoaded] = useState(false);
    const { promotions } = useProductStore();
    // const router = useRouter()

    useEffect(() => {
        if (promotions.length >= 1) {
            setLoaded(true)
        }
    }, [promotions])
    //TODO HANDLE REDIRECT IF POSSIBLE create new page called promotion/[id] y get categories from there
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
            {promotions.map((promo) => (
                <section key={promo.name} title={promo.name}>
                    <div>
                        <img src={promo.image_url} style={contentStyle} alt={promo.name} title={promo.name} />
                    </div>
                </section>
            ))}


        </Carousel>
    );
};

export default PromoCarousel;