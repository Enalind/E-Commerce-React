
export default async function fetchOrders(hub, route, funListen){
    
    const latestOrder = useRef(null);
    latestOrder.current = orders.items;
    async function getOrdersHttp(){
        const response = await fetch("https://localhost:44329/orders", {method: "GET"})
        if(!response.ok){
            console.log("Error fetching products")
        }
        const ordersJson = await response.json()
        return ordersJson
    } 

    async function getOrdersSignalR(orderList){
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44329/hubs/order")
            .withAutomaticReconnect()
            .build();
        
        await connection.start()
        connection.on("ReciveOrder", order => {
            return orderList.push(order)
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
    async function sortByDate(orderList){
        var map = mapToMap(orderList)
        console.log(map)
        console.log(orderList)
        var newMap = enumerateDaysBetweenDates(map, orderList)
        newMap = mapSort(newMap)
        console.log(newMap)
        var vals = Array.from(newMap.values())
        var keys = Array.from(newMap.keys())
        return {items: orderList, dateRange: {keys: keys, values: vals, valLen: vals.map((item) => item.length)}}
        
    }

    var orderList = await getOrdersHttp()
    var orderListR = await getOrdersSignalR(orderList)
    sortByDate(orderListR)
    
    useEffect(() => {console.log(orders); console.log(orders.dateRange.valLen)}, [orders])
}