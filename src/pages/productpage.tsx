import React, { useEffect } from "react";
import './productpage.css'
import Navbar from "../components/navbar";
import Product from "../components/product";

export default function ProductPage() {
    var [isLoading, setIsLoading] = React.useState(true);
    var [products, setProducts] = React.useState([]);
    var [error, setError] = React.useState(null);



    useEffect(() => {
        fetch("https://localhost:7282/products", {method: "GET"})
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();})
        .then((data) => {setError(null); setProducts(data); })
        .catch((error) => {console.log(error); setError(error);})
        .finally(() => {setIsLoading(false);});
    });
    if(isLoading) {
        
        return (
        <>
            <Navbar/>
            <div>Loading...</div>
        </>
        )
    }
    else{
        return (
            <>
            <Navbar />
            <div className="container">
                {products.map((product) => (Product(product)))}
            </div>
            
            </>
        )
    }
}