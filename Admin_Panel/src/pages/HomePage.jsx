import React, { useEffect, useRef, useState } from "react";
import './HomePage.css';
import SideBar from "../components/SideBar";
import { HubConnectionBuilder} from '@microsoft/signalr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';     

export default function HomePage(){
    const [orders, setOrders] = useState({items: [], dateRange: []});
    const latestOrder = useRef(null);

    latestOrder.current = orders;
    async function getOrders(){
        const response = await fetch("https://localhost:44329/orders", {method: "GET"})
        if(!response.ok){
            console.log("Error fetching products")
        }
        const ordersJson = await response.json()
        setOrders({items: ordersJson})
    } 

    async function getOrdersSignalR(){
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44329/hubs/order")
            .withAutomaticReconnect()
            .build();
        
        connection.start()
            .then(result => {
                connection.on("ReciveOrder", order => {
                    const updatedOrders = [...latestOrder.current]
                    updatedOrders.push(order)
                    setOrders({items: updatedOrders})
                })
            })
            .catch(e => console.log("Connection failed ", e))
    }
    useEffect(() => {
        Promise.all([getOrders(), getOrdersSignalR()])
        orders.items.forEach(order => {
            moment.unix(order.createdUnix).isBetween()
        });
    }, [])
    
    return(
        <div className="page-wrapper">
            <SideBar/>
            <div>
                    <AreaChart width={500} 
                        height={400} 
                        data={orders.items}
                        margin={{
                            top: 10,
                            right:30,
                            left:0,
                            bottom:0
                        }}>
                            <CartesianGrid strokeDasharray={"3 3"}/>
                            <XAxis dataKey="createdUnix" tickFormatter={(item) => moment.unix(item).format("MMM do YY")}/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="productID" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
            </div>
        </div>
    )
}