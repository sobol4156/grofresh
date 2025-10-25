import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@/entities/product'

export interface ICartProduct extends IProduct {
  quantity: number
}

interface ProductState {
  currentProduct: IProduct | null
}

const initialState: ProductState = {
  currentProduct: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<IProduct>) {
      state.currentProduct = action.payload
    },
  },
})

export const { selectProduct } = productSlice.actions
export const productReducer = productSlice.reducer


export const selectCurrentProduct = (state: { product: ProductState }) => state.product.currentProduct
