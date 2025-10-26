import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/entities/cart/model/cart.slice';

export const createMockStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
  });