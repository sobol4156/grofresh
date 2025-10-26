import { render, screen } from '@testing-library/react';
import PopularNow from './PopularNow';

// Мокаем компонент Product, чтобы не зависеть от его логики
jest.mock('@/entities/product', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Product: ({ product }: any) => (
    <div data-testid="product-item">{product.name}</div>
  ),
}));

// Мокаем список продуктов
jest.mock('@/entities/product/config/mock', () => ({
  MOCK_PRODUCTS: [
    { id: 1, name: 'Apples' },
    { id: 2, name: 'Bananas' },
    { id: 3, name: 'Oranges' },
  ],
}));

describe('PopularNow component', () => {
  // Проверяет, что рендерится заголовок и кнопка
  test('renders heading and "more" button', () => {
    render(<PopularNow />);

    expect(screen.getByText('Popular now')).toBeInTheDocument();
    expect(screen.getByText('more')).toBeInTheDocument();
  });

  // Проверяет, что отображаются все продукты из MOCK_PRODUCTS
  test('renders all mock products', () => {
    render(<PopularNow />);

    const products = screen.getAllByTestId('product-item');
    expect(products).toHaveLength(3);
    expect(products[0]).toHaveTextContent('Apples');
    expect(products[1]).toHaveTextContent('Bananas');
    expect(products[2]).toHaveTextContent('Oranges');
  });

  // Проверяет, что контейнер и структура корректны
  test('has correct container structure', () => {
    const { container } = render(<PopularNow />);
    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('h4')).toHaveTextContent('Popular now');
  });
});
