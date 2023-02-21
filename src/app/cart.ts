import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CartState {
  value: Array<CartItem>
}
interface CartItem {
    name: string,
    price: number,
    quantity: number,
    image: string
}

// Define the initial state using that type
const initialState: CartState = {
  value: [
    {name: 'item1', price: 100, quantity: 1, image: '../../LeatherBike.jpg'}
  ],
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value[action.payload].quantity += 1
    },
    decrement: (state, action: PayloadAction<number>) => {
        state.value[action.payload].quantity -= 1
    },
    removeItem: (state, action: PayloadAction<number>) => {
        state.value.splice(action.payload, 1)
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.value.push(action.payload)
    },
  },
})

export const { increment, decrement, addCartItem, removeItem } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.value.length

export default cartSlice.reducer