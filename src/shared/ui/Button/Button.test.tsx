import { fireEvent, render } from "@testing-library/react";
import Button from "./Button"

describe('Button component', () => {

  // Проверяет, что компонент рендерится с пропсами по умолчанию
  test('renders with default props', () => {
    render(<Button>Кнопка</Button>);
  });

  // Проверяет, что компонент корректно рендерится с вариантом "text"
  test('renders with variant=text', () => {
    render(<Button variant="text">Кнопка</Button>);
  });

  // Проверяет, что компонент корректно рендерится с вариантом "outlined"
  test('renders with variant=outlined', () => {
    render(<Button variant="outlined">Кнопка</Button>);
  });

  // Новый тест: проверяем вызов onClick
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Кнопка</Button>);

    const button = getByText("Кнопка");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Проверка дефолтной заглушки
  test('default onClick does not throw', () => {
    const { getByText } = render(<Button>Кнопка</Button>);
    const button = getByText("Кнопка");

    expect(() => fireEvent.click(button)).not.toThrow();
  });
})
