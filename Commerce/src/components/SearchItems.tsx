import React from "react";
import './SearchItems.css'
export default function searchBarItems(searchItems: Array<any>){
    return(
        <div className="search-wrapper">
            {searchItems.map((item, index) => (
                <a href={`/ProductsPages?id=${item.productID}`} key={index} className="search-item">{item.name} {item.price}$</a>
            ))}
        </div>
    )
}