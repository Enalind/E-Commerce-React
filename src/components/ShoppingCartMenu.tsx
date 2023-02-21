import React from "react";
import './ShoppingCartMenu.css';

export default function ShoppingCartMenu() {
    let [cartItems, setCartItems] = React.useState([{name: 'item1', price: 100, quantity: 1}, {name: 'item12', price: 100, quantity: 1}, {name: 'item13', price: 100, quantity: 1}]);

    function removeItem(index: number){
        
        let items = cartItems.slice()
        items.splice(index, 1)
        console.log(items)
        setCartItems(items);
    }
    return(
        <div id="shopping-cart-menu">
            {cartItems.map((item, index) => {
                return(
                    <div className="shopping-cart-item" key={item.name + index.toString}>
                        <p>{item.name} {item.price}$</p>
                        <img src="../../plus-solid.svg" className="shopping-cart-action-icon" onClick={() => {
                            let items = cartItems.slice()
                            items[index].quantity++
                            setCartItems(items);
                        }}/>
                        <p>{item.quantity}</p>
                        <img src="../../minus-solid.svg" className="shopping-cart-action-icon" onClick={() => {
                            let items = cartItems.slice()
                            items[index].quantity--
                            setCartItems(items);
                        }}/>
                        <img src="../../xmark-solid.svg" alt="check" className="shopping-cart-action-icon" onClick={() => removeItem(index)}/>
                    </div>
                )
            })}
            
        </div>
    )
}