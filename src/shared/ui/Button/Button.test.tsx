import { render } from "@testing-library/react";
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
})
