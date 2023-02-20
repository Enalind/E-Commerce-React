import React from "react";
import './ProductDetails.css'
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetails(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState(true);
    
    let product: any;
    
    fetch(`https://localhost:7282/products/byid/${searchParams.get('id')}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();})
    .then((data) => {product = data})
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));
    
    if(isLoading){
        return (<>
            <Navbar/>
            <div>Loading...</div>
        </>)
    }
    else if(product === null || product === undefined){
        return (<>
            <Navbar/>
            <div>Product not found</div>
        </>)
    }
    else{
        return(
            <>
                <Navbar/>
                <img src={`../../public/${product.image}`} alt={product.name}/>
                <h1>{product.name}</h1>
                
            </>
        )
    }
    
}
