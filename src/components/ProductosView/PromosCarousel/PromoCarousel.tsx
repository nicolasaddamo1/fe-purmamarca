"use client"
import React from 'react';
import { Carousel } from 'antd';

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


    return (
        <Carousel autoplay autoplaySpeed={1500} >
            <section>
                <div  >
                    <img src="https://img.freepik.com/vector-gratis/plantilla-banner-horizontal-rebajas-viernes-negro_23-2150867247.jpg?semt=ais_hybrid&w=740" style={contentStyle} alt="" />
                </div>
            </section>
            <section>
                <div >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MMMgnnu0NQjpPXUqm6OoHQwQOSv7LU1uRoCk1z4uI4Zn8TzDqQJIO5Y3MWNZhSXJXOU&usqp=CAU" style={contentStyle} alt="" />
                </div>
            </section>
            <section>
                <div >
                    <img src="https://img.freepik.com/psd-gratis/plantilla-banner-oferta-venta_23-2149225725.jpg?semt=ais_hybrid&w=740&q=80" style={contentStyle} alt="" />
                </div>
            </section>
            <section>
                <div >
                    <img src="https://img.freepik.com/vetores-gratis/modelo-de-banner-de-venda-horizontal-plano-com-foto_23-2149000923.jpg" style={contentStyle} alt="" />
                </div>
            </section>

        </Carousel>
    );
};

export default PromoCarousel;