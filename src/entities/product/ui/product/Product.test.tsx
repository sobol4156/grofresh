import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, toggleCartItem, toggleSelectedProduct } from '@/entities/cart/model/cart.slice';
import Product from './Product';
import { IProduct } from '../../model/types';

// Мокаем компонент next/image, чтобы он не вызывал ошибок при тестировании
jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element
  const MockedImage = (props: any) => <img {...props} alt={props.alt ?? 'mocked-image'} />;
  MockedImage.displayName = 'MockedImage';
  return { __esModule: true, default: MockedImage };
});

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

describe('Product Component', () => {

  // Проверяет, что компонент корректно отображает информацию о товаре
  test('renders product info correctly', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText('Spinach')).toBeInTheDocument();
    expect(screen.getByText('1 kg')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();

    // Проверяем, что изображение рендерится корректно
    const img = screen.getByAltText('Product') as HTMLImageElement;
    expect(img.src).toContain('/images/products/spinach.png');
  });

  // Проверяет, что при клике на кнопку вызывается dispatch с toggleCartItem
  test('dispatches toggleCartItem on button click', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Проверяем, что dispatch вызван с правильным экшеном
    expect(store.dispatch).toHaveBeenCalledWith(toggleCartItem(mockProduct));
  });

  // Проверяет, что у товара добавляется класс outline, если он выбран
  test('applies outline class if product is current', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          items: [],
          selectedProduct: mockProduct
        }
      }
    });

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const wrapper = screen.getByTestId('product-wrapper');
    expect(wrapper).toHaveClass('outline');
  });

  // Проверяет, что класс outline отсутствует, если товар не выбран
  test('does not apply outline class if product is not current', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const wrapper = screen.getByText('Spinach').closest('div');
    expect(wrapper).not.toHaveClass('outline');
  });

});

describe('Product Component — selectProduct', () => {
  // Проверяет, что при клике на блок продукта диспатчится toggleSelectedProduct
  test('dispatches toggleSelectedProduct on product click', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    store.dispatch = jest.fn(); // подменяем dispatch для отслеживания вызова

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    // Имитируем клик на область, вызывающую selectProduct
    const clickableArea = screen.getByText('Spinach').closest('.touch-manipulation');
    if (!clickableArea) throw new Error('Clickable area not found');

    fireEvent.click(clickableArea);

    // Проверяем, что был вызван правильный экшен
    expect(store.dispatch).toHaveBeenCalledWith(toggleSelectedProduct(mockProduct));
  });

  // Проверяет, что при клике вызывается ровно один dispatch (нет двойных вызовов)
  test('calls dispatch only once on click', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const clickableArea = screen.getByText('Spinach').closest('.touch-manipulation');
    if (!clickableArea) throw new Error('Clickable area not found');

    fireEvent.click(clickableArea);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

describe('Product Component — IconButton variant warning', () => {
  // Проверяет, что кнопка рендерится с оранжевым цветом, если товар уже в корзине
  test('renders IconButton with warning color when product is in cart', () => {
    const preloadedState = {
      cart: {
        items: [mockProduct],
        selectedProduct: null
      }
    };

    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState
    });

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveStyle('background-color: var(--color-orange-500)');
  });
});