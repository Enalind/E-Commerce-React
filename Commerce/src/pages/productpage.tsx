import React, { useEffect } from "react";
import './ProductPage.css'
import Navbar from "../components/Navbar";
import Product from "../components/product";
import { useSearchParams } from "react-router-dom";
import { CartItem } from '../app/cart';

export default function ProductPage() {
    var [isLoading, setIsLoading] = React.useState(true);
    var [products, setProducts] = React.useState<CartItem[]>([]);
    let [searchParams] = useSearchParams();
    useEffect(() => {
        if(searchParams.get('search') !== null){
        
            fetch(`https://localhost:7282/products/fuzzy/?match=${searchParams.get('search')}`, {method: "GET"})
            .then(response => {
                if (!response.ok) {
                    console.log("Error")
                }
                return response.json();})
            .then((data) => {setProducts(data); })
            .catch((error) => {console.log(error);})
            .finally(() => {setIsLoading(false);});
        }
        else{
            fetch("https://localhost:7282/products", {method: "GET"})
            .then(response => {
                if (!response.ok) {
                    console.log("Error")
                }
                return response.json();})
            .then((data) => {setProducts(data); console.log(data); })
            
            .catch((error) => {console.log(error);})
            .finally(() => {setIsLoading(false);});
        }
    },[]);
    
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
            <div id="container">
                {products.map((product) => <Product product={product} />)}
                
            </div>
            </>
        )
    }
}