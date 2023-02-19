import React from "react";
export default function searchBarItems(searchItems: Array<any>){
    return(
        <div className="search-wrapper">
            {searchItems.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    )
}