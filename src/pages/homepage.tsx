import React from "react";
import './homepage.css'
import Navbar from "../components/Navbar";
import BgImage from "../assets/HomePageBike.jpg"

export default function HomePage() {
    return (
        <>
        <Navbar />
        <div className="home-page-wrapper" style={{backgroundImage: `url(${BgImage}`}}>
            <div className="main-heading">
                <h1 className="MainTitle">BikeMan</h1>
                <h2>We Deliver Bikes For <div className="special">YOU</div></h2>
            </div>
            <b className="testemonial">See Our Customer <a href="/testemonials">Testemonials</a></b>
            <b className="sub">No matter wether you are <br/><br/>
                <div className="customer-wrapper">
                    <p>Adventurous</p>
                    <p>Comfortable</p>
                    <p>Stressed</p>
                    <p>Relaxed</p>
                </div>
                <br/>
                We have a bike just for you.
            </b>
            <a href="/products" className="order-button">
                <b>Order Now!</b>
            </a>
        </div>
        </>
    )
}