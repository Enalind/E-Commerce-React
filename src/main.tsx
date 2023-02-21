import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProductDetails from './pages/ProductDetails'
import './index.css'
import CheckoutPage from './pages/CheckoutPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/Products' element={<ProductPage/>}/>
        <Route path='/ProductsPages' element={<ProductDetails/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
