import { fireEvent, render, screen } from "@testing-library/react"
import Input from "./Input"

describe('Input component', () => {

  const valueExample = 'test'
  const handleChange = jest.fn()

  beforeEach(() => {
    handleChange.mockClear();
  });

  // Проверяет, что компонент рендерится с переданным значением и реагирует на изменения
  test('renders with default props and value', () => {
    render(<Input value={valueExample} handleChange={handleChange} />);

    // Проверяет, что input отображается с правильным значением
    const input = screen.getByDisplayValue(valueExample);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(valueExample);

    // Проверяет, что при изменении значения вызывается handleChange
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
})
