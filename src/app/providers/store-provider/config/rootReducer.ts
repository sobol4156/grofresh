import { cartReducer } from '@/entities/cart/model/cart.slice'
import { productReducer } from '@/entities/product/model/product.slice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
})
