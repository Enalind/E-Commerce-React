import React, { useEffect, useRef, useState } from "react";
import './HomePage.css';
import SideBar from "../components/SideBar";
import { HubConnectionBuilder} from '@microsoft/signalr';

export default function HomePage(){
    const [orders, setOrders] = useState([]);
    const latestOrder = useRef(null);

    latestOrder.current = orders;

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44329/hubs/order")
            .withAutomaticReconnect()
            .build();
        
        connection.start()
            .then(result => {
                connection.on("ReciveOrder", order => {
                    const updatedOrders = [...latestOrder.current]
                    updatedOrders.push(order)
                    setOrders(updatedOrders)
                })
            })
            .catch(e => console.log("Connection failed ", e))
    })

    return(
        <div className="page-wrapper">
            <SideBar/>
            <div>
                <p>{console.log(orders)}</p>
            </div>
        </div>
    )
}