import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {image} from "./images/data" 
import classes from "./carousel.module.css"
const CarouselEffect = () => {
    return (
        <>
            <Carousel
                autoPLay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}
            >
                {
                    image.map((imageItemLink)=>{
                        return <img key={imageItemLink} src={imageItemLink} />;
                    })
                }
            </Carousel>
            <div className={classes.hero__image}></div>
        </>
    )
    }

export default CarouselEffect
