import React from "react";
import './ShoppingCartMenu.css';
import { Link } from "react-router-dom";
import { useAppSelector, useDispatchAppSelector } from "../app/hooks";
import { decrement, increment, removeItem } from "../app/cart";

export default function ShoppingCartMenu() {
    const items = useAppSelector((state) => state.cart.value)
    const dispatch = useDispatchAppSelector()
    
    return(
        <div id="shopping-cart-menu">
            {items.map((item, index) => {
                return(
                    <div className="shopping-cart-item" key={item.name + index.toString}>
                        <p>{item.name} {item.price}$</p>
                        <img src="../../plus-solid.svg" className="shopping-cart-action-icon" onClick={() => {
                            dispatch(increment(index))
                        }}/>
                        <p>{item.quantity}</p>
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