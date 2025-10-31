import { paymentReducer, toggleCurrentCard, PaymentState, serviceFee, currentCard, allCards, lastUsedCard, paymentMethod } from "./payment.slice";

describe("paymentSlice reducer", () => {
  let initialState: PaymentState;

  beforeEach(() => {
    initialState = {
      serviceFee: '1.50',
      cards: [
        { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
        { id: 2, name: 'Visa', src: '/images/payments/master-card.png' },
      ],
      currentCard: { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
      lastUsedCard: { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
    };
  });

  // Проверяем, что редьюсер возвращает начальное состояние
  it("should return the initial state", () => {
    const state = paymentReducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  // Проверяем, что currentCard сбрасывается, если выбран текущий
  it("should toggle current card off if selected card is the current one", () => {
    const action = toggleCurrentCard({ id: 1, name: 'Mastercard', src: '' });
    const state = paymentReducer(initialState, action);
    expect(state.currentCard).toBeNull();
  });

  // Проверяем, что currentCard устанавливается на другую карту
  it("should set current card if different card is selected", () => {
    const action = toggleCurrentCard({ id: 2, name: 'Visa', src: '' });
    const state = paymentReducer(initialState, action);
    expect(state.currentCard?.id).toBe(2);
    expect(state.currentCard?.name).toBe('Visa');
  });

  // Проверяем, что currentCard не изменяется, если lastUsedCard выбран и карта одна
  it("should not change currentCard if lastUsedCard is selected and only one card exists", () => {
    const singleCardState: PaymentState = {
      ...initialState,
      cards: [initialState.cards[0]],
      currentCard: initialState.cards[0],
    };
    const action = toggleCurrentCard({ id: 1, name: 'Mastercard', src: '' });
    const state = paymentReducer(singleCardState, action);
    expect(state.currentCard?.id).toBe(1);
  });

  // Проверяем, что currentCard не меняется, если передан неизвестный id
  it("should not set currentCard if card id not found", () => {
    const action = toggleCurrentCard({ id: 999, name: 'Unknown', src: '' });
    const state = paymentReducer(initialState, action);
    expect(state.currentCard?.id).toBe(1);
  });


  // Проверяем случай, когда lastUsedCard = null
  it('should handle case when lastUsedCard is null', () => {
    const stateWithNoLastUsed = { ...initialState, lastUsedCard: null };
    const action = toggleCurrentCard({ id: 1, name: 'Mastercard', src: '' });
    const newState = paymentReducer(stateWithNoLastUsed, action);

    // currentCard должно стать null
    expect(newState.currentCard).toBeNull();
  });
  
  // Проверяем случай, когда currentCard = null
  it('should handle case when CurrentCard is null', () => {
    const stateCurrentCard = { ...initialState, currentCard: null };
    const action = toggleCurrentCard({ id: 1, name: 'Mastercard', src: '' });
    const newState = paymentReducer(stateCurrentCard, action);

    // currentCard не должно остаться null
    expect(newState.currentCard).not.toBeNull();
  });
});


// Тесты селекторов

describe('paymentSlice selectors', () => {
  let state: { payment: PaymentState };

  beforeEach(() => {
    state = {
      payment: {
        serviceFee: '1.50',
        cards: [
          { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
          { id: 2, name: 'Visa', src: '/images/payments/master-card.png' },
        ],
        currentCard: { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
        lastUsedCard: { id: 1, name: 'Mastercard', src: '/images/payments/master-card.png' },
      }
    };
  });

  // Проверяем селектор serviceFee
  it('serviceFee selector should return correct value', () => {
    expect(serviceFee(state)).toBe('1.50');
  });

  // Проверяем селектор currentCard
  it('currentCard selector should return the current card', () => {
    expect(currentCard(state)).toEqual(state.payment.currentCard);
  });

  // Проверяем селектор allCards
  it('allCards selector should return all cards', () => {
    expect(allCards(state)).toEqual(state.payment.cards);
  });

  // Проверяем селектор lastUsedCard
  it('lastUsedCard selector should return the last used card', () => {
    expect(lastUsedCard(state)).toEqual(state.payment.lastUsedCard);
  });

  // Проверяем селектор paymentMethod
  it('paymentMethod selector should return current card name', () => {
    expect(paymentMethod(state)).toBe('Mastercard');

    // если currentCard = null
    state.payment.currentCard = null;
    expect(paymentMethod(state)).toBeUndefined();
  });
});
