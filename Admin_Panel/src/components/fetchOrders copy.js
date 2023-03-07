
import { HubConnectionBuilder} from '@microsoft/signalr';
export default async function fetchOrders(hub, route, funListen){
    
    async function getItemsHttp(){
        const response = await fetch(route, {method: "GET"})
        if(!response.ok){
            console.log("Error fetching products")
        }
        const itemsJson = await response.json()
        return itemsJson
    } 

    async function getItemsSignalR(itemList){
        const connection = new HubConnectionBuilder()
            .withUrl(hub)
            .withAutomaticReconnect()
            .build();
        
        await connection.start()
        connection.on(funListen, item => {
            itemList.push(item)
            console.log(item)
            return itemList
        })
        return itemList
    }
    var itemList = await getItemsHttp()
    itemList = await getItemsSignalR(itemList)
    console.log(itemList)
}