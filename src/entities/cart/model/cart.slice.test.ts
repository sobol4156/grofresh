import { cartReducer, addToCart, incrementItem, removeFromCart, clearLastProduct, selectCartCount, selectCartItems, lastItemModified, ProductState } from './cart.slice';
import { IProduct } from '@/entities/product';

const mockProduct: IProduct = {
  id: 1,
  name: 'Spinach',
  unitValue: 1,
  unit: 'kg',
  price: 10,
  src: '/images/products/spinach.png',
  category: '',
  category_id: 1,
};

const anotherProduct: IProduct = {
  id: 2,
  name: 'Tomato',
  unitValue: 1,
  unit: 'kg',
  price: 5,
  src: '/images/products/tomato.png',
  category: '',
  category_id: 2,
};

describe('cartSlice reducers', () => {

  test('addToCart adds a new item and sets lastProductModified', () => {
    const state = cartReducer(undefined, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  test('addToCart does not duplicate existing item', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, addToCart(mockProduct)); // same product
    expect(state.items).toHaveLength(1);
    expect(state.lastProductModified).toBeNull(); // should clear lastProductModified
  });

  test('incrementItem increases quantity of existing item', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, incrementItem(mockProduct));
    expect(state.items[0].quantity).toBe(2);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  test('incrementItem increases quantity of existing item with defined quantity', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 2 }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.items[0].quantity).toBe(3); // 2 + 1
  });

  test('incrementItem sets quantity to 1 if item.quantity is undefined', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: undefined as unknown as number }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.items[0].quantity).toBe(1); // (undefined || 0) + 1
  });

  test('incrementItem updates lastProductModified when item exists', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  test('incrementItem sets lastProductModified to null if item not found', () => {
    const initialState = {
      items: [],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.lastProductModified).toBeNull();
  });


  test('addToCart keeps existing quantity if item already exists', () => {
    // Изначальное состояние с товаром quantity = 2
    const initialState = {
      items: [{ ...mockProduct, quantity: 2 }],
      lastProductModified: null
    };

    // Добавляем тот же товар
    const state = cartReducer(initialState, addToCart(mockProduct));

    // Количество должно остаться прежним, item не дублируется
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);

    // lastProductModified обновился на существующий item
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  test('incrementItem does not change other items (covers else branch)', () => {
    // Создаём состояние с двумя товарами
    const initialState = {
      items: [
        { ...mockProduct, quantity: 1 },
        { ...anotherProduct, quantity: 3 } // другой товар
      ],
      lastProductModified: null
    };

    // Увеличиваем только mockProduct
    const state = cartReducer(initialState, incrementItem(mockProduct));

    // Проверяем, что quantity mockProduct увеличилась
    const updatedMock = state.items.find(i => i.id === mockProduct.id);
    expect(updatedMock?.quantity).toBe(2);

    // Проверяем, что другой товар остался без изменений
    const untouched = state.items.find(i => i.id === anotherProduct.id);
    expect(untouched?.quantity).toBe(3);

    // lastProductModified должен быть обновлён
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  test('removeFromCart decreases quantity and removes item if quantity is 1', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, incrementItem(mockProduct)); // quantity 2
    state = cartReducer(state, removeFromCart(mockProduct));
    expect(state.items[0].quantity).toBe(1);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);

    state = cartReducer(state, removeFromCart(mockProduct)); // quantity 1 -> remove
    expect(state.items).toHaveLength(0);
    expect(state.lastProductModified).toBeNull();
  });

  test('removeFromCart does not affect other items', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, addToCart(anotherProduct));
    state = cartReducer(state, removeFromCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(anotherProduct.id);
  });

  test('clearLastProduct resets lastProductModified', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, clearLastProduct());
    expect(state.lastProductModified).toBeNull();
  });

});

describe('cartSlice selectors', () => {

  test('selectCartItems returns all items in cart', () => {
    const state: { cart: ProductState } = { cart: { items: [], lastProductModified: null } };
    state.cart = cartReducer(state.cart, addToCart(mockProduct));
    state.cart = cartReducer(state.cart, addToCart(anotherProduct));
    const items = selectCartItems(state);
    expect(items).toHaveLength(2);
    expect(items.map(i => i.id)).toEqual([mockProduct.id, anotherProduct.id]);
  });

  test('lastItemModified returns the last modified product', () => {
    const state: { cart: ProductState } = { cart: { items: [], lastProductModified: null } };
    state.cart = cartReducer(state.cart, addToCart(mockProduct));
    expect(lastItemModified(state)?.id).toBe(mockProduct.id);

    state.cart = cartReducer(state.cart, addToCart(anotherProduct));
    expect(lastItemModified(state)?.id).toBe(anotherProduct.id);
  });
 test('sums quantities correctly when all items have quantity', () => {
    const state = {
      cart: {
        items: [
          { ...mockProduct, quantity: 2 },
          { ...anotherProduct, quantity: 3 }
        ],
        lastProductModified: null
      }
    };

    expect(selectCartCount(state)).toBe(5); // 2 + 3
  });

  test('treats undefined quantity as 1', () => {
    const state = {
      cart: {
        items: [
          { ...mockProduct, quantity: undefined as unknown as number }, // undefined
          { ...anotherProduct, quantity: 3 }
        ],
        lastProductModified: null
      }
    };

    expect(selectCartCount(state)).toBe(4); // 1 + 3
  });

  test('returns 0 when cart is empty', () => {
    const state = { cart: { items: [], lastProductModified: null } };
    expect(selectCartCount(state)).toBe(0);
  });
});
