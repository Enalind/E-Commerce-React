import React from "react";
import './ProductDetails.css'
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function ProductDetails(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState(true);
    const [product, setProduct] = React.useState({
        name: "",
        image: "",
        price: 0
    });
    let id = searchParams.get('id');

    fetch(`https://localhost:7282/products/byid?id=${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();})
    .then((data) => {setProduct(data)})
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
                <div id="product-detail-container">
                    <img id="product-main-image" src={`../../${product.image}.jpg`} alt={product.name}/>
                    <div id="text-wrapper">
                        <h1>{product.name}</h1>
                        <p>{product.price}$</p>
                    </div>
                </div>
            </>
        )
    }
    
}
