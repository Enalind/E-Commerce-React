import React from "react";
import './CheckoutPage.css'
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
    const location = useLocation();
    if(location.state.products === null){
        return(<>
        <Navbar/>
        <h1>No products in cart</h1>
        </>)
    }
    return(<>
        <Navbar />
        {location.state.products.map((item: any, index: number) => {
            return <div key={index}>
                <h1>{item.name}</h1>
            </div>
        })}
    </>)
}
