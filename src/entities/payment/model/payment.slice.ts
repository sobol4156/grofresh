import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Card {
  id: number;
  name: string;
  src: string
}

export interface PaymentState {
  serviceFee: string;
  cards: Card[]
  currentCard: Card | null,
  lastUsedCard: Card | null,
}
const initialState: PaymentState = {
  serviceFee: '1.50',
  cards: [
    {
      id: 1,
      name: 'Mastercard',
      src: '/images/payments/master-card.png'
    },
    {
      id: 2,
      name: 'Visa',
      src: '/images/payments/master-card.png'
    }
  ],
  currentCard: {
    id: 1,
    name: 'Mastercard',
    src: '/images/payments/master-card.png'
  },
  lastUsedCard: {
    id: 1,
    name: 'Mastercard',
    src: '/images/payments/master-card.png'
  }
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    toggleCurrentCard(state, action: PayloadAction<Card>) {

      if (state.lastUsedCard?.id === action.payload.id && state.cards.length <= 1) {
        return
      }

      if (state.currentCard?.id === action.payload.id) {
        state.currentCard = null
        return
      }


      const card = state.cards.find((el) => el.id === action.payload.id);
      if (card) {
        state.currentCard = card;
      }
    }
  }
})

export const { toggleCurrentCard } = paymentSlice.actions
export const paymentReducer = paymentSlice.reducer

export const serviceFee = (state: { payment: PaymentState }) => state.payment.serviceFee
export const currentCard = (state: { payment: PaymentState }) => state.payment.currentCard
export const allCards = (state: { payment: PaymentState }) => state.payment.cards
export const lastUsedCard = (state: { payment: PaymentState }) => state.payment.lastUsedCard
export const paymentMethod = (state: { payment: PaymentState }) => state.payment.currentCard?.name
