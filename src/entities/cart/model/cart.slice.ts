import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/entities/product'

export interface ProductState {
  items: IProduct[],
  selectedProduct: IProduct | null

}
const initialState: ProductState = {
  items: [],
  selectedProduct: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existingItemInCart = state.items.find(el => el.id === action.payload.id)

      if (state.selectedProduct?.id === action.payload.id) {
        state.items = state.items.reduce((acc, item) => {

          if (item.id !== action.payload.id) {
            acc.push(item);
          }

          return acc;
        }, [] as IProduct[]);
        state.selectedProduct = null
        return
      }

      const item = { ...action.payload, quantity: existingItemInCart?.quantity ? existingItemInCart.quantity : 1 }
      if (!existingItemInCart) {
        state.items.push(item)
        state.selectedProduct = item
      } else {
        state.items = state.items.reduce((acc, item) => {

          if (item.id !== action.payload.id) {
            acc.push(item);
          }

          return acc;
        }, [] as IProduct[]);
        state.selectedProduct = { ...action.payload, quantity: 0 }
      }
    },
    incrementItem(state, action: PayloadAction<IProduct>) {
      const existingItemInCart = state.items.find(el => el.id === action.payload.id)

      if(!existingItemInCart){
        state.items.push(action.payload)
      }

      state.items = state.items.reduce((acc, item) => {
        if (item.id === state.selectedProduct?.id) {
          acc.push({ ...item, quantity: item.quantity + 1 });
        } else {
          acc.push(item);
        }

        return acc;
      }, [] as IProduct[]);

      state.selectedProduct = state.items.find(el => el.id === action.payload.id) || null;
    },
    toggleSelectedProduct(state, action: PayloadAction<IProduct>) {
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = null
      } else {
        state.selectedProduct = action.payload
      }
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
      }, [] as IProduct[])

      state.selectedProduct = state.items.find(el => el.id === action.payload.id) || null
    },
    clearLastProduct(state) {
      state.selectedProduct = null
    },
  },
})

export const { addToCart, removeFromCart, clearLastProduct, incrementItem, toggleSelectedProduct } = cartSlice.actions
export const cartReducer = cartSlice.reducer

export const selectCartCount = (state: { cart: ProductState }) => state.cart.items.reduce((acc, cur) => acc += cur.quantity, 0)
export const selectedProduct = (state: { cart: ProductState }) => state.cart.selectedProduct
export const selectCartItems = (state: { cart: ProductState }) => state.cart.items
export const isInCart = (state: { cart: ProductState }, product: IProduct): boolean => state.cart.items.some(el => el.id === product.id)