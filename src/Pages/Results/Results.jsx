import React, { useEffect, useState } from 'react'
import classes from "./results.module.css";
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { productUrl } from '../../API/endpoints';
import ProductCard from "../../Components/Product/ProductCard"
const Results = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {categoryName} = useParams();
    useEffect(()=>{
        axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res)=>{
            // console.log(res);
            setResults(res.data);
            setIsLoading(false);
        }).catch((err)=>{
            console.log(err)
            setIsLoading(false);
        })
    }, [])
    return (
        <LayOut>
            <h1 style={{padding : "30px"}}>Results</h1>
            <p style={{padding : "30px"}}>Category/{categoryName}</p>
            <hr />
            <div className={classes.products__container}>
                {
                    results?.map((product)=>(
                    <ProductCard
                        key={product.id}
                        renderAdd={true}
                        renderDesc={false}
                        product={product}
                    />
                ))}
            </div>
        </LayOut>
    )
}

export default Results
