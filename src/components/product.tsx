import React from "react";
import './Product.css'
import { useDispatchAppSelector } from "../app/hooks";
import { addCartItem } from "../app/cart";


export default function Product({productID, name, price, image} : {productID: number, name: string, price: number, image: string}) {
    const dispatch = useDispatchAppSelector()
    return (
        <div>
            <a href={`/ProductsPages?id=${productID}`} key={productID}>
                <img id="product-image" src={`../../${image}.jpg`} alt={name} />
                
            </a>
            <div className="product-subtext">
                <h3>{name}, {price}$</h3>
                <p className="add-to-cart" onClick={() => dispatch(addCartItem({name: name, price: price, image:image, quantity:1}))}>Add to Cart</p>
            </div>
        </div>
    )
}