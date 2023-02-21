import React, { useEffect } from "react";
import './ShoppingCartMenu.css';
import { Link } from "react-router-dom";
import { useAppSelector, useDispatchAppSelector } from "../app/hooks";
import { decrement, increment, removeItem, setQuantity } from "../app/cart";

export default function ShoppingCartMenu() {
    const items = useAppSelector((state) => state.cart.value)
    const dispatch = useDispatchAppSelector()
    useEffect(() => {
        document.getElementById("quantity-input")
        ?.addEventListener("keyup", (e) => {
            if(e.key === "enter") {
                console.log("Enter")
                e.preventDefault();
                document.getElementById("submit-button")?.click()
            }

        })
        
    }, [])
    function handleChange(e: React.FormEvent<HTMLFormElement>, index: number){
        e.preventDefault();
        let val:string = e.currentTarget.value;
        dispatch(setQuantity({quantity: parseInt(val), index: index}))
        e.currentTarget.value = "";
    }
    return(
        <div id="shopping-cart-menu">
            {items.map((item, index) => {
                return(
                    <div className="shopping-cart-item" key={item.name + index.toString}>
                        <p>{item.name} {item.price}$</p>
                        <img src="../../plus-solid.svg" className="shopping-cart-action-icon" onClick={() => {
                            dispatch(increment(index))
                        }}/>
                        <form onSubmit={(e) => handleChange(e, index)}>
                            <input type="text" id="quantity-input" placeholder={item.quantity.toString()}/>
                            <input type="submit" id="submit-button"></input>
                        </form>
                        <img src="../../minus-solid.svg" className="shopping-cart-action-icon" onClick={() => {
                            dispatch(decrement(index))
                        }}/>
                        <img src="../../xmark-solid.svg" alt="check" className="shopping-cart-action-icon" onClick={() => dispatch(removeItem(index))}/>
                    </div>
                )
            })}
            <div className="shopping-cart-item">
                <Link to="/checkout">Order</Link>
            </div>
        </div>
    )
}