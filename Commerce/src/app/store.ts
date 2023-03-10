import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer= persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: {
      cart: persistedReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })
  
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
