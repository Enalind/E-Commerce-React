import React from "react";
import './search-items.css'
export default function searchBarItems(searchItems: Array<any>){
    return(
        <div className="search-wrapper">
            {searchItems.map((item, index) => (
                <div key={index} className="search-item">{item.name} {item.price}$</div>
            ))}
        </div>
    )
}