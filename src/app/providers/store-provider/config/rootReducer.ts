import { cartReducer } from '@/entities/cart/model/slice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  // product: productReducer,
  cart: cartReducer,
})
