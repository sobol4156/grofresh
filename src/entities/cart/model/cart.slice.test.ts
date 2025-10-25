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

  test('selectCartCount returns total quantity of all items', () => {
    const state: { cart: ProductState }  = { cart: { items: [], lastProductModified: null } };
    state.cart = cartReducer(state.cart, addToCart(mockProduct));
    state.cart = cartReducer(state.cart, incrementItem(mockProduct)); // quantity 2
    state.cart = cartReducer(state.cart, addToCart(anotherProduct)); // quantity 1
    expect(selectCartCount(state)).toBe(3);
  });

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

});
