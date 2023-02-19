import React from "react";
import './product.css'
import BlackBike from '../assets/BlackBike.jpg'
import LeatherBike from '../assets/LeatherBike.jpg'
import SportyBike from '../assets/SportyBike.jpg'


export default function Product({id, name, price, image} : {id: number, name: string, price: number, image: string}) {
    function displayImage(image: string) {
        switch (image) {
            case 'BlackBike':
                return BlackBike
            case 'LeatherBike':
                return LeatherBike
            case 'SportyBike':
                return SportyBike
            default:
                return BlackBike
                
        }
    }

    return (
        <div className="product" key={id}>
            <img className="product-image" src={displayImage(image)} alt={name} />
            <h3>{name}, {price}$</h3>
        </div>
    )
}