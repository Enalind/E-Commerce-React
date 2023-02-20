import React from "react";
import './product.css'


export default function Product({id, name, price, image} : {id: number, name: string, price: number, image: string}) {

    return (
        <div className="product" key={id}>
            <img className="product-image" src={`../../${image}.jpg`} alt={name} />
            <h3>{name}, {price}$</h3>
        </div>
    )
}