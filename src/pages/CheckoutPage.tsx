import React from "react";
import './CheckoutPage.css'
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppSelector, useDispatchAppSelector } from "../app/hooks";
import { decrement, increment, removeItem } from "../app/cart";

export default function CheckoutPage() {
    const items = useAppSelector((state) => state.cart.value)
    const dispatch = useDispatchAppSelector()
    if(items === null){
        return(<>
        <Navbar/>
        <h1>No products in cart</h1>
        </>)
    }
    return(<>
        <Navbar />
        {items.map((item: any, index: number) => {
            return <div className="checkout-item" key={index}>
                <img className="checkout-item-info" id="checkout-item-image" src={`../../${item.image}.jpg`} alt={item.name} />
                <h1 className="checkout-item-info">{item.name}</h1>
                <p className="checkout-item-info">Price: {item.price}</p>
                <div id="checkout-item-controls">
                        <img src="../../plus-solid.svg" className="checkout-item-control" onClick={() => {
                            dispatch(increment(index))
                        }}/>
                        <p id="item-quantity">{item.quantity}</p>
                        <img src="../../minus-solid.svg" className="checkout-item-control" onClick={() => {
                            dispatch(decrement(index))
                        }}/>
                        
                </div>
                <img src="../../xmark-solid.svg" alt="check" className="checkout-item-control" onClick={() => dispatch(removeItem(index))}/>
            </div>
        })}
    </>)
}
