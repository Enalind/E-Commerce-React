import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/homepage'
import ProductPage from './pages/productpage'
import ProductDetails from './pages/ProductDetails'
import './index.css'
import CheckoutPage from './pages/CheckoutPage';
import { Provider } from 'react-redux'
import {store, persistor} from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import.meta.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/Products' element={<ProductPage/>}/>
            <Route path='/ProductsPages' element={<ProductDetails/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
