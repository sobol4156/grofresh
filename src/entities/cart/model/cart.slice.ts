import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/entities/product'


export interface ICartProduct extends IProduct {
  quantity: number
}

interface ProductState {
  items: ICartProduct[],
  lastProductModified: IProduct | null

}
const initialState: ProductState = {
  items: [],
  lastProductModified: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existingItem = state.items.find(el => el.id === action.payload.id)

      if (state.lastProductModified?.id === action.payload.id) {
        state.lastProductModified = null
        return
      }

      const item = { ...action.payload, quantity: existingItem?.quantity ? existingItem.quantity : 1 }
      if (!existingItem) {
        state.items.push(item)
      }
      state.lastProductModified = item

    },
    incrementItem(state, action: PayloadAction<IProduct>) {
      state.items = state.items.reduce((acc, item) => {

        if (item.id === action.payload.id) {
          acc.push({ ...item, quantity: (item.quantity || 0) + 1 });
        } else {
          acc.push(item);
        }

        return acc;
      }, [] as ICartProduct[]);

      state.lastProductModified = state.items.find(el => el.id === action.payload.id) || null;
    },
    removeFromCart(state, action: PayloadAction<IProduct>) {
      state.items = state.items.reduce((acc, item) => {
        if (item.id === action.payload.id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 })
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [] as ICartProduct[])

      state.lastProductModified = state.items.find(el => el.id === action.payload.id) || null
    },
    clearLastProduct(state) {
      state.lastProductModified = null
    }
  },
})

export const { addToCart, removeFromCart, clearLastProduct, incrementItem } = cartSlice.actions
export const cartReducer = cartSlice.reducer

export const selectCartCount = (state: { cart: ProductState }) => state.cart.items.reduce((acc, cur) => acc += cur.quantity || 1, 0)
export const lastItemModified = (state: { cart: ProductState }) => state.cart.lastProductModified
export const selectCartItems = (state: { cart: ProductState }) => state.cart.items