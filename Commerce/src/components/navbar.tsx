import * as React from 'react';
import { useState } from 'react';
import './navbar.css'
import searchBarItems from './SearchItems';
import { useNavigate } from 'react-router-dom';
import ShoppingCartMenu from './ShoppingCartMenu';
export default function Navbar(){
    const [searchBar, setSearchBar] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [shoppingCartMenuOpen, setShoppingCartMenuOpen] = useState(false)

    const navigate = useNavigate();
    
    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        navigate(`/products/?search=${searchBar}`);
    }
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setSearchBar(e.target.value)
        fetch(`https://localhost:7282/products/fuzzy/?match=${e.target.value}`)
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
                    {shoppingCartMenuOpen ? <ShoppingCartMenu/>: null}
                </div>
            
            
            <form id="search-form" onSubmit={e => submitHandler(e)}>
                <input className='nav-item search' value={searchBar} onChange={e => changeHandler(e)}  type='text'/>
                {searchItems.length > 0 && searchBarItems(searchItems)}
            </form>
            
        </nav>
    )
}
