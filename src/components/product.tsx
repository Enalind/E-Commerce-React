import React from "react";
import './Product.css'


export default function Product({productID, name, price, image} : {productID: number, name: string, price: number, image: string}) {

    return (
        <a href={`/ProductsPages?id=${productID}`} key={productID}>
            <img id="product-image" src={`../../${image}.jpg`} alt={name} />
            <h3>{name}, {price}$</h3>
        </a>
    )
}