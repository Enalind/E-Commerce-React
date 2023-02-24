import React from "react";
import './CheckoutPage.css'
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppSelector, useDispatchAppSelector } from "../app/hooks";
import { decrement, increment, removeItem } from "../app/cart";
import {CartItem} from '../app/cart';

export default function CheckoutPage() {
    const items = useAppSelector((state) => state.cart.value)
    const dispatch = useDispatchAppSelector()
    const [showPopup, setShowPopup] = React.useState(false)
    const [Message, setMessage] = React.useState({Message: "", Show: false})
    
    interface user{
        Name: string,
        Email: string,
        Adress: string
    }
    function changeMessage(message:string){
        setMessage({Message: message, Show: true})
        return new Promise(res => setTimeout(res, 3000)).then(() => setMessage({Message: "", Show: false}))
    }
    function postUser({Name, Adress, Email}: {Name: String, Adress: String, Email: String}){
        let UserID: string;
        let fetchPromise = fetch("https://localhost:7282/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: Name,
                Adress: Adress,
                Email: Email
            })
        })
        .then(res => {
            if(res.status !== 200){
                setMessage({Message: "Error adding new user", Show: true})
                return "Error"
            }
            else{
                return(res.json())
            }
        })
        .then((data) => {
            if(data === "Error"){
                return data
            }
            UserID = data.id
            return data.id
        })

        return fetchPromise
    }
    function postItems(UserId: string){
        console.log(items)
        
        return items.map((item) =>{
            console.log(item)
            
            fetch("https://localhost:7282/orders",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nrBikesOrdered: item.quantity,
                    ProductId: item.productID,
                    UserId: UserId
                })
            })
            .then((response) => {
                if(response.status!== 200){
                    console.log("Error adding new order")
                    changeMessage("Error adding new order")
                    return "Error"
                }
                else{
                    console.log("Order added")
                    changeMessage("Order placed succesfully")
                    return(response.json())
                }
            })
        })
    }
    async function checkout(e: React.FormEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget)
        let name = formData.get('name-field')?.toString()
        let adress = formData.get('adress-field')?.toString()
        let email = formData.get('email-field')?.toString()
        if(name === undefined || adress === undefined || email === undefined){
            changeMessage("All fields are requiered");
            return
        }

        e.preventDefault()
        let user: user = {
            Name: name,
            Adress: adress,
            Email: email
        }
        postUser(user).then((UserId: string) => postItems(UserId))
        setShowPopup(false);
    }

    if(items === null){
        return(<>
        <Navbar/>
        <h1>No products in cart</h1>
        </>)
    }
    return(<>
        <Navbar />
        {items.map((item: any, index: number) => {
            return <div className="checkout-item" key={index}>
                <img className="checkout-item-info" id="checkout-item-image" src={`../../${item.image}.jpg`} alt={item.name} />
                <h1 className="checkout-item-info">{item.name}</h1>
                <p className="checkout-item-info">Price: {item.price}</p>
                <div id="checkout-item-controls">
                        <img src="../../plus-solid.svg" className="checkout-item-control" onClick={() => {
                            dispatch(increment(index))
                        }}/>
                        <p id="item-quantity">{item.quantity}</p>
                        <img src="../../minus-solid.svg" className="checkout-item-control" onClick={() => {
                            dispatch(decrement(index))
                        }}/>
                        
                </div>
                <img src="../../xmark-solid.svg" alt="check" className="checkout-item-control" onClick={() => dispatch(removeItem(index))}/>
            </div>
        })}
        <p className={Message.Show ? "message-show" : "message-hide"} id={`message`}>{Message.Message}</p>
        <div id="checkout-popup-background" onClick={(event) => {if(event.currentTarget === event.target){setShowPopup(false)}}} style={{visibility: showPopup ? "visible" : "hidden"}}>
            <form id="checkout-popup" onSubmit={(e) => checkout(e)}>
                <input className="checkout-field" name="name-field" type="text" placeholder="Full name"/>
                <input className="checkout-field" name="adress-field" type="text" placeholder="Adress"/>
                <input className="checkout-field" name="email-field" type="text" placeholder="Email"/>
                <input id="checkout-submit" type="submit" value="Checkout"/>
            </form>
        </div>
        <div className="checkout-item" >
            <p className="checkout-item-info">Total: {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
            <h1 className="checkout-item-info" id="checkout" onClick={() => {setShowPopup(!showPopup)}}>Checkout</h1>
        </div>
    </>)
}
