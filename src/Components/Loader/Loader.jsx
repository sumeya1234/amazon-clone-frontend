import React from 'react'
import {FadeLoader} from "react-spinners";
const Loader = () => {
    return (
        <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height:"50vh",
        }}>
            <FadeLoader color="#febd69" />
        </div>
    ) 
}

export default Loader
