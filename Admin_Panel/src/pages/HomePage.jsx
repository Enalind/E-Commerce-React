import React from "react";
import './HomePage.css';
import SideBar from "../components/SideBar";

export default function HomePage(){
    return(
        <div className="page-wrapper">
            <SideBar/>
            <div>
                <p>Hello World</p>
            </div>
        </div>
    )
}