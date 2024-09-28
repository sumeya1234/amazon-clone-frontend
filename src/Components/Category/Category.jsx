import React from 'react';
import { categoryInfo } from './categoryData';
import CategoryCard from './CategoryCard';
import classes from "./category.module.css";

const Category = () => {
    return (
        <>
            <section className={classes.category__container}>
                {
                    categoryInfo.map((info) => (
                        <CategoryCard key={info.name} data={info} /> 
                    ))
                }
            </section>
        </>
    )
}

export default Category;
