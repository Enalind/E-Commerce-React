import React from "react";
import './Product.css'
import { useAppSelector, useDispatchAppSelector } from "../app/hooks";
import { CartItem, addCartItem } from "../app/cart";


export default function Product({product}: {product: CartItem}) 
{
    const items = useAppSelector((state) => state.cart.value)
    const dispatch = useDispatchAppSelector()

    function addToCart(){
        dispatch(addCartItem({name: product.name, price: product.price, image:product.image, quantity:1, productID:product.productID}))
    }
    function displayItemAdding(){
        const itemIndex = items.findIndex((i => i.productID === product.productID))
        console.log(product)
        
        
        console.log(product.productID)
        
        
        if(itemIndex === -1){
            return "Add To Cart"
        }
        else{
            return `${items[itemIndex].quantity} In Cart`
        }
    }
    return (
        <div key={product.productID}>
            <a href={`/ProductsPages?id=${product.productID}`} key={product.productID}>
                <img id="product-image" src={`../../${product.image}.jpg`} alt={product.name} />
            </a>
            <div className="product-subtext">
                <h3>{product.name}, {product.price}$</h3>
                <p className="add-to-cart" onClick={() => addToCart()}>{displayItemAdding()}</p>
            </div>
        </div>
    )
}