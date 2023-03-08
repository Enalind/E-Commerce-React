import React, { useEffect, useRef, useState } from "react";
import './HomePage.css';
import SideBar from "../components/SideBar";
import { HubConnectionBuilder} from '@microsoft/signalr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import moment from 'moment';    
import fetchOrders from "../components/fetchOrders copy"; 

export default function HomePage(){
    const [orders, setOrders] = useState([]);
    const [signalROrder, setSignalROrder] = useState({})
    const [dates, setDates] = useState({keys: [], values: [], valLen: []})
    
    async function getOrdersHttp(){
        const response = await fetch("https://localhost:44329/orders", {method: "GET"})
        if(!response.ok){
            console.log("Error fetching products")
        }
        const ordersJson = await response.json()
        return ordersJson
    } 
    function signalRCallback(order, state){
        setSignalROrder(order);
    }
    async function getOrdersSignalR(orderList){
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44329/hubs/order/with")
            .withAutomaticReconnect()
            .build();
        
        await connection.start()
        connection.on("ReciveOrderNew",(order) => {
            signalRCallback(order)
        })
        return orderList
    }
    function mapToMap(orderList){
        var map = new Map()
        orderList.forEach((order) =>{
            var orderStamp = moment.unix(order.createdUnix).format("MMM Do YY")
            var mapItem = map.get(orderStamp)
            if(mapItem === undefined){
                map.set(orderStamp, [order.orderID])
            }
            else{
                mapItem.push(order.orderID)
                map.set(orderStamp, mapItem)
            }
        })
        return map
    }
    useEffect(() => {
        var order = signalROrder
        console.log(order)
        console.log(orders)
        console.log("Hello")
        var orderss = orders.slice()
        orderss.push(order)
        sortByDate(orderss)
    }, [signalROrder])
    function enumerateDaysBetweenDates (map, orderList){
        var mapCopy = new Map(map)
        var endDateValue = [...mapCopy.values()].pop().pop()
        var startDateValue = mapCopy.values().next().value[0]
        var endDateUnix = orderList.find(element => element.orderID === endDateValue).createdUnix
        var startDateUnix = orderList.find(element => element.orderID === startDateValue).createdUnix
        var endDate = moment.unix(endDateUnix)
        var startDate = moment.unix(startDateUnix)
        while(startDate.isSameOrBefore(endDate)){
          if(!Array.from(map.keys()).includes(startDate.format("MMM Do YY"))){
            map.set(moment(startDate).format("MMM Do YY"), [])
          }
          startDate = startDate.add(1, 'day');
        }
        return map;
    }
    function mapSort(map){
        return new Map([...map.entries()].sort())
    }
    function sortByDate(orderList){
        console.log("orderList")
        console.log(orderList)
        var map = mapToMap(orderList)
        console.log(map)
        console.log(orderList)
        var newMap = enumerateDaysBetweenDates(map, orderList)
        newMap = mapSort(newMap)
        console.log(newMap)
        var vals = Array.from(newMap.values())
        var keys = Array.from(newMap.keys())
        setOrders(orderList)
        setDates({keys: keys, values: vals, valLen: vals.map((item) => item.length)})
        
    }

    async function getOrders(){
        var orderList = await getOrdersHttp()
        var orderListR = await getOrdersSignalR(orderList)
        sortByDate(orderListR)
    }
    useEffect(() => {
        getOrders()
        
    }, [])
    
    return(
        <div className="page-wrapper">
            <div>
                    <AreaChart width={750} 
                        height={400} 
                        data={dates.keys.map((item, index) => {var obj =  {name: item, value: dates.valLen[index]}; return obj})}
                        margin={{
                            top: 10,
                            right:30,
                            left:0,
                            bottom:0
                        }}>
                            <CartesianGrid strokeDasharray={"3 3"}/>
                            <XAxis dataKey="name"/>
                            <YAxis dataKey="value"/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
            </div>
        </div>
    )
}