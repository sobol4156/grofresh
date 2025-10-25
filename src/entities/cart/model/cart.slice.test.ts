import { cartReducer, addToCart, incrementItem, removeFromCart, clearLastProduct, selectCartCount, selectCartItems, lastItemModified, ProductState } from './cart.slice';
import { IProduct } from '@/entities/product';

//  Моковые товары для тестов
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

  //  Проверяет, что при добавлении нового товара:
  // он добавляется в корзину, quantity = 1 и lastProductModified обновляется.
  test('addToCart adds a new item and sets lastProductModified', () => {
    const state = cartReducer(undefined, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  //  Проверяет, что если добавить тот же товар дважды,
  // дубликат не создаётся и lastProductModified сбрасывается.
  test('addToCart does not duplicate existing item', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, addToCart(mockProduct)); // same product
    expect(state.items).toHaveLength(1);
    expect(state.lastProductModified).toBeNull(); // should clear lastProductModified
  });

  //  Проверяет, что incrementItem увеличивает quantity у существующего товара.
  test('incrementItem increases quantity of existing item', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, incrementItem(mockProduct));
    expect(state.items[0].quantity).toBe(2);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  //  Проверяет, что incrementItem корректно увеличивает quantity,
  // если оно уже было задано (например, 2 → 3).
  test('incrementItem increases quantity of existing item with defined quantity', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 2 }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.items[0].quantity).toBe(3); // 2 + 1
  });

  //  Проверяет поведение при отсутствующем quantity:
  // если quantity undefined, оно приравнивается к 0 и становится 1.
  test('incrementItem sets quantity to 1 if item.quantity is undefined', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: undefined as unknown as number }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.items[0].quantity).toBe(1); // (undefined || 0) + 1
  });

  //  Проверяет, что lastProductModified обновляется,
  // если товар найден при увеличении количества.
  test('incrementItem updates lastProductModified when item exists', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  //  Проверяет, что если товара нет в корзине — lastProductModified остаётся null.
  test('incrementItem sets lastProductModified to null if item not found', () => {
    const initialState = {
      items: [],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    expect(state.lastProductModified).toBeNull();
  });

  //  Проверяет, что при повторном добавлении существующего товара
  // сохраняется его текущее количество, и item не дублируется.
  test('addToCart keeps existing quantity if item already exists', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 2 }],
      lastProductModified: null
    };

    const state = cartReducer(initialState, addToCart(mockProduct));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  //  Проверяет "else" ветку в incrementItem:
  // когда в корзине несколько товаров, меняется только нужный.
  test('incrementItem does not change other items (covers else branch)', () => {
    const initialState = {
      items: [
        { ...mockProduct, quantity: 1 },
        { ...anotherProduct, quantity: 3 }
      ],
      lastProductModified: null
    };

    const state = cartReducer(initialState, incrementItem(mockProduct));

    const updatedMock = state.items.find(i => i.id === mockProduct.id);
    expect(updatedMock?.quantity).toBe(2);

    const untouched = state.items.find(i => i.id === anotherProduct.id);
    expect(untouched?.quantity).toBe(3);

    expect(state.lastProductModified?.id).toBe(mockProduct.id);
  });

  //  Проверяет, что removeFromCart уменьшает количество товара,
  // а при достижении 0 — полностью удаляет его из корзины.
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

  //  Проверяет, что удаление одного товара не влияет на другие товары в корзине.
  test('removeFromCart does not affect other items', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, addToCart(anotherProduct));
    state = cartReducer(state, removeFromCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(anotherProduct.id);
  });

  //  Проверяет, что clearLastProduct сбрасывает lastProductModified в null.
  test('clearLastProduct resets lastProductModified', () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, clearLastProduct());
    expect(state.lastProductModified).toBeNull();
  });

});

describe('cartSlice selectors', () => {

  //  Проверяет, что selectCartItems возвращает все товары из корзины.
  test('selectCartItems returns all items in cart', () => {
    const state: { cart: ProductState } = { cart: { items: [], lastProductModified: null } };
    state.cart = cartReducer(state.cart, addToCart(mockProduct));
    state.cart = cartReducer(state.cart, addToCart(anotherProduct));
    const items = selectCartItems(state);
    expect(items).toHaveLength(2);
    expect(items.map(i => i.id)).toEqual([mockProduct.id, anotherProduct.id]);
  });

  //  Проверяет, что lastItemModified возвращает последний изменённый товар.
  test('lastItemModified returns the last modified product', () => {
    const state: { cart: ProductState } = { cart: { items: [], lastProductModified: null } };
    state.cart = cartReducer(state.cart, addToCart(mockProduct));
    expect(lastItemModified(state)?.id).toBe(mockProduct.id);

    state.cart = cartReducer(state.cart, addToCart(anotherProduct));
    expect(lastItemModified(state)?.id).toBe(anotherProduct.id);
  });

  //  Проверяет, что selectCartCount правильно суммирует количество товаров,
  // если у всех указано quantity.
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

  //  Проверяет, что если quantity отсутствует (undefined),
  // оно считается равным 1 (cur.quantity || 1).
  test('treats undefined quantity as 1', () => {
    const state = {
      cart: {
        items: [
          { ...mockProduct, quantity: undefined as unknown as number },
          { ...anotherProduct, quantity: 3 }
        ],
        lastProductModified: null
      }
    };

    expect(selectCartCount(state)).toBe(4); // 1 + 3
  });

  //  Проверяет, что если корзина пуста, selectCartCount возвращает 0.
  test('returns 0 when cart is empty', () => {
    const state = { cart: { items: [], lastProductModified: null } };
    expect(selectCartCount(state)).toBe(0);
  });
});
