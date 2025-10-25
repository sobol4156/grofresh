import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter component', () => {
  const quantity = 5;
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  // Проверяет, что компонент рендерит текущее количество
  test('renders the current quantity', () => {
    render(<Counter quantity={quantity} handleChange={handleChange} />);
    expect(screen.getByTestId('counter-quantity')).toBeInTheDocument();
  });

  // Проверяет, что при клике на кнопку уменьшения вызывается handleChange с аргументом "decrease"
  test('clicking decrement button calls handleChange with "decrease"', () => {
    render(<Counter quantity={quantity} handleChange={handleChange} />);
    fireEvent.click(screen.getByTestId('btn-decrease'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('decrease');
  });

  // Проверяет, что при клике на кнопку увеличения вызывается handleChange с аргументом "increment"
  test('clicking increment button calls handleChange with "increment"', () => {
    render(<Counter quantity={quantity} handleChange={handleChange} />);
    fireEvent.click(screen.getByTestId('btn-increment'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('increment');
  });
});
