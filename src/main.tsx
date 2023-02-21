import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/homepage'
import ProductPage from './pages/productpage'
import ProductDetails from './pages/ProductDetails'
import './index.css'
import CheckoutPage from './pages/CheckoutPage';
import { Provider } from 'react-redux'
import {store} from './app/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/Products' element={<ProductPage/>}/>
          <Route path='/ProductsPages' element={<ProductDetails/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
