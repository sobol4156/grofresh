import { cartReducer, toggleCartItem, incrementItem, decrementOrRemoveItem, clearSelectedProduct, selectedCartCount, selectedCartItems, selectedProduct, ProductState, toggleSelectedProduct } from './cart.slice';
import { IProduct } from '@/entities/product';

// Моковые товары для тестов
const mockProduct: IProduct = {
  id: 1,
  name: 'Spinach',
  unitValue: 1,
  unit: 'kg',
  price: 10,
  src: '/images/products/spinach.png',
  category: '',
  category_id: 1,
  quantity: 0
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
  quantity: 0
};

describe('cartSlice reducers', () => {

  // Проверяет добавление нового товара в корзину и установку selectedProduct
  test('toggleCartItem adds a new item with quantity 1 and sets selectedProduct', () => {
    const state = cartReducer(undefined, toggleCartItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.selectedProduct?.id).toBe(mockProduct.id);
  });

  // Проверяет удаление товара из корзины, если он уже выбран
  test('toggleCartItem removes item from cart when it is already selected', () => {
    const initialState: ProductState = {
      items: [
        { ...mockProduct, quantity: 2 },
        { ...anotherProduct, quantity: 1 }
      ],
      selectedProduct: { ...mockProduct, quantity: 2 }
    };

    const state = cartReducer(initialState, toggleCartItem(mockProduct));

    expect(state.items.find(i => i.id === mockProduct.id)).toBeUndefined();
    expect(state.items.find(i => i.id === anotherProduct.id)).toBeDefined();
    expect(state.selectedProduct).toBeNull();
  });

  // Проверяет, что если товар уже есть, но не выбран, selectedProduct устанавливается с quantity 0
  test('toggleCartItem existing item not selected sets selectedProduct to quantity 0', () => {
    const initialState: ProductState = {
      items: [{ ...mockProduct, quantity: 2 }],
      selectedProduct: null
    };

    const state = cartReducer(initialState, toggleCartItem(mockProduct));

    expect(state.items).toHaveLength(0);
    expect(state.selectedProduct).toEqual({ ...mockProduct, quantity: 0 });
  });

  // Проверяет повторное добавление одного и того же товара (toggle)
  test('toggleCartItem removes item if it already exists', () => {
    let state = cartReducer(undefined, toggleCartItem(mockProduct));
    state = cartReducer(state, toggleCartItem(mockProduct)); // toggle remove
    expect(state.items).toHaveLength(0);
    expect(state.selectedProduct).toBeNull();
  });

  // Проверяет увеличение quantity товара
  test('incrementItem increases quantity of existing item', () => {
    let state = cartReducer(undefined, toggleCartItem(mockProduct));
    state = cartReducer(state, incrementItem(mockProduct));
    expect(state.items[0].quantity).toBe(2);
    expect(state.selectedProduct?.id).toBe(mockProduct.id);
  });

  // Проверяет корректное увеличение quantity, если оно > 1
  test('incrementItem increases quantity correctly when quantity > 1', () => {
    const initialState: ProductState = {
      items: [{ ...mockProduct, quantity: 2 }],
      selectedProduct: null
    };
    const state = cartReducer(initialState, incrementItem(mockProduct));
    expect(state.items[0].quantity).toBe(3);
  });

  // Проверяет корректное увеличение quantity, если оно 0 и товара нет в корзине
  test('incrementItem adds new product with quantity 1 if not in cart', () => {
    const initialState: ProductState = {
      items: [],
      selectedProduct: mockProduct
    };
    const state = cartReducer(initialState, incrementItem(mockProduct));
    expect(state.items[0].quantity).toBe(1);
  });

  // Проверяет, что увеличение quantity не изменяет другие товары в корзине
  test('incrementItem does not change other items', () => {
    const initialState: ProductState = {
      items: [
        { ...mockProduct, quantity: 1 },
        { ...anotherProduct, quantity: 3 }
      ],
      selectedProduct: null
    };
    const state = cartReducer(initialState, incrementItem(mockProduct));
    expect(state.items.find(i => i.id === mockProduct.id)?.quantity).toBe(2);
    expect(state.items.find(i => i.id === anotherProduct.id)?.quantity).toBe(3);
  });

  // Проверяет уменьшение quantity и удаление товара при достижении 0
  test('decrementOrRemoveItem decreases quantity and removes item when quantity reaches 0', () => {
    let state = cartReducer(undefined, toggleCartItem(mockProduct)); // quantity 1
    state = cartReducer(state, incrementItem(mockProduct)); // quantity 2
    state = cartReducer(state, decrementOrRemoveItem(mockProduct)); // quantity 1
    expect(state.items[0].quantity).toBe(1);
    expect(state.selectedProduct?.id).toBe(mockProduct.id);

    state = cartReducer(state, decrementOrRemoveItem(mockProduct)); // remove completely
    expect(state.items).toHaveLength(0);
    expect(state.selectedProduct).toBeNull();
  });

  // Тесты для toggleSelectedProduct
  describe('toggleSelectedProduct', () => {

    // Проверяет установку selectedProduct, если ничего не выбрано
    test('sets selectedProduct if none is selected', () => {
      const initialState: ProductState = { items: [], selectedProduct: null };
      const state = cartReducer(initialState, toggleSelectedProduct(mockProduct));
      expect(state.selectedProduct).toEqual(mockProduct);
    });

    // Проверяет смену выбранного продукта на другой
    test('sets selectedProduct to new product if different is selected', () => {
      const initialState: ProductState = { items: [], selectedProduct: mockProduct };
      const state = cartReducer(initialState, toggleSelectedProduct(anotherProduct));
      expect(state.selectedProduct).toEqual(anotherProduct);
    });

    // Проверяет сброс selectedProduct при повторном выборе того же товара
    test('resets selectedProduct to null if same product is toggled', () => {
      const initialState: ProductState = { items: [], selectedProduct: mockProduct };
      const state = cartReducer(initialState, toggleSelectedProduct(mockProduct));
      expect(state.selectedProduct).toBeNull();
    });
  });

  // Проверяет, что удаление одного товара не влияет на другие товары
  test('decrementOrRemoveItem does not affect other items', () => {
    let state = cartReducer(undefined, toggleCartItem(mockProduct));
    state = cartReducer(state, toggleCartItem(anotherProduct));
    state = cartReducer(state, decrementOrRemoveItem(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(anotherProduct.id);
  });

  // Проверяет сброс selectedProduct через clearSelectedProduct
  test('clearSelectedProduct sets selectedProduct to null', () => {
    let state = cartReducer(undefined, toggleCartItem(mockProduct));
    state = cartReducer(state, clearSelectedProduct());
    expect(state.selectedProduct).toBeNull();
  });
});

// Тесты для селекторов
describe('cartSlice selectors', () => {

  // Проверяет получение всех товаров
  test('selectedCartItems returns all items', () => {
    const state: { cart: ProductState } = { cart: { items: [], selectedProduct: null } };
    state.cart = cartReducer(state.cart, toggleCartItem(mockProduct));
    state.cart = cartReducer(state.cart, toggleCartItem(anotherProduct));
    const items = selectedCartItems(state);
    expect(items).toHaveLength(2);
    expect(items.map(i => i.id)).toEqual([mockProduct.id, anotherProduct.id]);
  });

  // Проверяет возвращение последнего выбранного товара
  test('selectedProduct returns last modified product', () => {
    const state: { cart: ProductState } = { cart: { items: [], selectedProduct: null } };
    state.cart = cartReducer(state.cart, toggleCartItem(mockProduct));
    expect(selectedProduct(state)?.id).toBe(mockProduct.id);

    state.cart = cartReducer(state.cart, toggleCartItem(anotherProduct));
    expect(selectedProduct(state)?.id).toBe(anotherProduct.id);
  });

  // Проверяет корректную сумму quantity
  test('selectedCartCount sums quantities correctly', () => {
    const state = {
      cart: {
        items: [
          { ...mockProduct, quantity: 2 },
          { ...anotherProduct, quantity: 3 }
        ],
        selectedProduct: null
      }
    };
    expect(selectedCartCount(state)).toBe(5);
  });

  // Проверяет поведение при пустой корзине
  test('selectedCartCount returns 0 for empty cart', () => {
    const state = { cart: { items: [], selectedProduct: null } };
    expect(selectedCartCount(state)).toBe(0);
  });
});
