import React from "react";
import './product.css'
import BlackBike from '../assets/BlackBike.jpg'
import LeatherBike from '../assets/LeatherBike.jpg'
import SportyBike from '../assets/SportyBike.jpg'


export default function Product({id, name, price} : {id: number, name: string, price: number}) {
    function displayImage(name: string) {
        switch (name) {
            case 'BlackBike':
                return <img src={BlackBike} alt={name} />
            case 'LeatherBike':
                return <img src={LeatherBike} alt={name} />
            case 'SportyBike':
                return <img src={SportyBike} alt={name} />
            default:
                return <img src={BlackBike} alt={name} />
        }
    }

    return (
        <div className="product" key={id}>
            {displayImage(name)}
            <h3>{name}</h3>
        </div>
    )
}