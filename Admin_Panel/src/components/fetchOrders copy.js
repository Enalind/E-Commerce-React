
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

    function getItemsSignalR(itemList){
        const connection = new HubConnectionBuilder()
            .withUrl(hub)
            .withAutomaticReconnect()
            .build();
        
        return connection
    }
    var itemList = await getItemsHttp()
    var conn; 
    conn = getItemsSignalR(itemList)
    return conn
}