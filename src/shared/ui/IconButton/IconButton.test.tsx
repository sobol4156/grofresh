import { render } from '@testing-library/react';
import IconButton from './IconButton';

describe('IconButton component', () => {

  // Проверяет, что компонент рендерится с пропсами по умолчанию
  test('renders with default props', () => {
    render(<IconButton />);
  });

  // Проверяет, что компонент корректно рендерится с вариантом "success"
  test('renders with success variant', () => {
    render(<IconButton variant="success" />);
  });

  // Проверяет, что можно передать кастомный стиль через пропс sx
  test('renders with custom sx', () => {
    render(<IconButton sx={{ border: '1px solid red' }} />);
  });

  // Проверяет, что компонент корректно рендерится с кастомным размером
  test('renders with custom size', () => {
    render(<IconButton size='large' />);
  });

  // Проверяет, что компонент корректно рендерится с дочерним контентом
  test('renders with children', () => {
    render(<IconButton>Click me</IconButton>);
  });
});
