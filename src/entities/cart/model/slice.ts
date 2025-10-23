import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/entities/product'


export interface ICartProduct extends IProduct {
  quantity: number
}

interface ProductState {
  items: ICartProduct[]
}
const initialState: ProductState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existingItem = state.items.find(el => el.id === action.payload.id)

      if (existingItem?.quantity) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 })

      }
    },
  },
})

export const { addToCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer

export const selectCartCount = (state: { cart: ProductState }) => state.cart.items.reduce((acc, cur) => acc += cur.quantity || 1, 0)

export const selectCartItems = (state: { cart: ProductState }) => state.cart.items