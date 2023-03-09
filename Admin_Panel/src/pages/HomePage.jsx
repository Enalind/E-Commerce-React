import React, { useEffect, useRef, useState } from "react";
import './HomePage.css';
import SideBar from "../components/SideBar";
import { HubConnectionBuilder} from '@microsoft/signalr';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Brush} from 'recharts';
import moment from 'moment';    
import fetchOrders from "../components/fetchOrders copy"; 

export default function HomePage(){
    const [orders, setOrders] = useState([]);
    const [signalROrder, setSignalROrder] = useState({})
    const [dates, setDates] = useState({keys: [], values: [], valLen: []})
    const [shareData, setShareData] = useState([])

    const Colors = [
        "#32a852",
        "#3269a8",
        "#7532a8"
    ]

    function getShare(orderList){
        var productArr = [];
        console.log(orderList)
        if(!orderList.length){
            return
        }
        
        orderList.forEach(order => {
            productArr.push(...Array(order.quantity).fill(order.name))
        })
        console.log()
        var unique = [... new Set(productArr)]
        var returnable = unique.map((productID) => {
            var occ = productArr.filter(element => element === productID).length
            return {occurances: occ, name: productID}
        })
        setShareData(returnable)
    }
    async function getOrdersHttp(){
        const response = await fetch("https://localhost:44329/orders/withperson/withproduct", {method: "GET"})
        if(!response.ok){
            console.log("Error fetching products")
        }
        const ordersJson = await response.json()
        return ordersJson
    } 
   
    async function getOrdersSignalR(orderList){
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44329/hubs/order/with")
            .withAutomaticReconnect()
            .build();
        
        await connection.start()
        connection.on("ReciveOrderNew",(order) => {
            setSignalROrder(order)
        })
        return orderList
    }
    useEffect(() => {
        console.log(orders)
        var ord = [...orders.slice(), signalROrder]
        sortByDate(ord)
    }, [signalROrder])
    function mapToMap(orderList){
        var map = new Map()
        orderList.forEach((order) =>{
            var orderStamp = moment.unix(order.createdUnix).format("MMM Do YY")
            var mapItem = map.get(orderStamp)
            if(mapItem === undefined){
                map.set(orderStamp, Array(order.quantity).fill(order.orderID))
            }
            else{
                mapItem.push(...Array(order.quantity).fill(order.orderID))
                map.set(orderStamp, mapItem)
            }
        })
        return map
    }
    
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
    
    function sortByDate(orderList){
        var map = mapToMap(orderList)
        var newMap = enumerateDaysBetweenDates(map, orderList)
        newMap = new Map([...newMap.entries()].sort())
        console.log(newMap)
        var vals = Array.from(newMap.values())
        var keys = Array.from(newMap.keys())
        getShare(orderList)
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
    
    useEffect(() => {
        // getShare()
    }, [orders])
    return(
        <div className="main-page-wrapper">
            <div className="main-chart">
                <ResponsiveContainer width="99%">
                    <AreaChart
                        data={dates.keys.map((item, index) => {var obj =  {name: item, value: dates.valLen[index]}; return obj})}
                        margin={{
                            top: 0,
                            right:0,
                            left:0,
                            bottom:0
                        }}>
                            <CartesianGrid strokeDasharray={"3 3"}/>
                            <XAxis dataKey="name"/>
                            <YAxis dataKey="value"/>
                            <Tooltip/>
                            <Brush/>
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="pie">
            
                <ResponsiveContainer width="99%">
                        <PieChart>
                            <Pie stroke="none" dataKey="occurances" data={shareData} label={(entry) => entry.name} innerRadius="50%" >
                                {shareData.map((entry, index) => {
                                    return <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                                })}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}