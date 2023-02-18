import * as React from 'react';
import { useState } from 'react';
import BikeManLogo from '../assets/BikeManLogoNew.svg'
import './navbar.css'
export default function Navbar(){
    const [searchBar, setSearchBar] = useState('')
    const [searchItems, setSearchItems] = useState([])

    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        alert(`You searched for ${searchBar}`)
        console.log(searchBar)
    }
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setSearchBar(e.target.value)
        fetch("https://localhost:7282/products")
    }
    return(
        <nav>
            <a className='nav-item logo-row' href="/"><p className='logo-text'>BikeMan</p><img src={BikeManLogo} alt="logo" className="logo"/></a>
            <a className='nav-item' href="/products">Products</a>
            <a className='nav-item' href="/about">About</a>
            <a className='nav-item' href="/contact">Contact</a>
            <form onSubmit={e => submitHandler(e)}>
                <input className='nav-item search' value={searchBar} onChange={e => changeHandler(e)}  type='text'/>
                
            </form>
        </nav>
    )
}
