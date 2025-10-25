import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, addToCart } from '@/entities/cart/model/cart.slice';
import Product from './Product';
import { IProduct } from '../model/types';

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
};

describe('Product Component', () => {

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
    const img = screen.getByAltText('Product') as HTMLImageElement;
    expect(img.src).toContain('/images/products/spinach.png');
  });

  test('dispatches addToCart on button click', () => {
    const store = configureStore({ reducer: { cart: cartReducer } });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Product product={mockProduct} />
      </Provider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(mockProduct));
  });

  test('applies outline class if product is current', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          items: [],
          lastProductModified: mockProduct
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
