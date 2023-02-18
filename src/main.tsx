import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar'
import HomePage from './pages/homepage'
import ProductPage from './pages/productpage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/Products' element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
