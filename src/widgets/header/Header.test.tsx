/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import Header from './Header';

// Моки для зависимостей
jest.mock('@/shared/ui/Avatar/Avatar', () => () => <div data-testid="avatar" />);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('@/shared/ui/IconButton', () => ({ children }: any) => <button data-testid="icon-button">{children}</button>);
jest.mock('@/entities/cart/ui/CartIcon', () => () => <div data-testid="cart-icon" />);

describe('Header component', () => {
  test('renders user info correctly', () => {
    render(<Header />);

    // Проверяем текст приветствия
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Kevin henderson')).toBeInTheDocument();
  });

  test('renders Avatar and CartIcon components', () => {
    render(<Header />);

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  test('renders notification IconButton with Badge', () => {
    render(<Header />);

    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();

    // Проверяем, что бейдж с числом 2 существует
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
