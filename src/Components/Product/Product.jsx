import React, { useEffect, useState } from 'react'
import classes from './product.module.css';
import axios from 'axios';
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=> {
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setProducts(res.data)
            setIsLoading(false);
        }).catch((err)=>{
            console.log(err);
            setIsLoading(false);
        })
    }, [])
    return (
        <>
        {
            isLoading?(<Loader/>) : (<section className={classes.products__container}>
                {
                    products.map((singleProduct)=>(
                        <ProductCard renderAdd={true} key={singleProduct.id} product={singleProduct}/>
                    ))
                }
            </section>)
        }
        </>
    )
}

export default Product
