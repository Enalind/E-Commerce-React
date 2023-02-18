import React, { useEffect } from "react";
import './productpage.css'
import Navbar from "../components/navbar";
import Product from "../components/product";

export default function ProductPage() {
    var [isLoading, setIsLoading] = React.useState(true);
    var [products, setProducts] = React.useState([]);


    useEffect(() => {
        var client = new XMLHttpRequest();
        client.open("GET", "https://localhost:7282/products");
        client.onload = function (){
            setIsLoading(false);
            setProducts(JSON.parse(client.response));
        }
        console.log("Whoooow!");
        client.send();
    }, [])
    return (
        <>
        <Navbar />
        <div className="container">
            {products.map((product) => (Product(product)))}
        </div>
        <div>
            <h1>Product Page</h1>
        </div>
        </>
    )
}