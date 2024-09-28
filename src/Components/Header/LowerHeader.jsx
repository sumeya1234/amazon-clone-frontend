import React from 'react'
import { LuMenu } from "react-icons/lu";
import classes from "./header.module.css";
const LowerHeader = () => {
    return (
        <>
            <div className={classes.lower__container}>
                <ul>
                    <li>
                        <LuMenu />
                        <p>All</p>
                    </li>
                    <li>Today's Deals</li>
                    <li>Costumer Service</li>
                    <li>Registry</li>
                    <li>Gift Cards</li>
                    <li>Sell</li>
                </ul>
            </div>
        </>
    )
}

export default LowerHeader
