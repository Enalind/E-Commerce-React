import * as React from 'react';
import { useState, useEffect } from 'react';
import './navbar.css'
import searchBarItems from './SearchItems';
import { useNavigate } from 'react-router-dom';
import ShoppingCartMenu from './ShoppingCartMenu';
import { useAppSelector } from '../app/hooks';
export default function Navbar(){
    const [searchBar, setSearchBar] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [shoppingCartMenuOpen, setShoppingCartMenuOpen] = useState(false)
    const [shoppingCartQuantity, setShoppingCartQuantity] = useState(0)
    
    const items = useAppSelector((state) => state.cart.value)
    
    const navigate = useNavigate();
    useEffect(() => {
        var quantity: number = 0;
        items.map((item) =>  quantity += item.quantity)
        setShoppingCartQuantity(quantity);
    })
    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        navigate(`/products/?search=${searchBar}`);
    }
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setSearchBar(e.target.value)
        fetch(`https://localhost:44329/products/fuzzy/?match=${e.target.value}`)
        .then(response => {
            if(!response.ok){
                throw Error(response.statusText)
            }
            return response.json()
        })
        .then((data) => {setSearchItems(data)})
        .catch((error) => console.log(error))
    }
    
    return(
        <nav>
            <a className='nav-item logo-row' href="/"><p className='logo-text'>BikeMan</p><img src={'../../BikeManLogoNew.svg'} alt="logo" className="logo"/></a>
            <a className='nav-item' href="/products">Products</a>
            <a className='nav-item' href="/about">About</a>
            <a className='nav-item' href="/contact">Contact</a>
            <div id='shopping-cart-wrapper'>
                    <img src={'../../cart-shopping-solid.svg'} alt="shopping cart" id="shopping-cart" onClick={() => setShoppingCartMenuOpen(!shoppingCartMenuOpen)}/>
                    <p id="shopping-items-len">{shoppingCartQuantity.toString()}</p>
                    {shoppingCartMenuOpen ? <ShoppingCartMenu/>: null}
                </div>
            
            
            <form id="search-form" onSubmit={e => submitHandler(e)}>
                <input className='nav-item search' value={searchBar} onChange={e => changeHandler(e)}  type='text'/>
                {searchItems.length > 0 && searchBarItems(searchItems)}
            </form>
            
        </nav>
    )
}
