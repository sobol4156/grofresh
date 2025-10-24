import { render } from "@testing-library/react";
import Button from "./Button"

describe('Counter component', () => {

  test('renders with default props', () => {
    render(<Button>Кнопка</Button>);
  });

  test('renders with variant=text', () => {
    render(<Button variant="text">Кнопка</Button>);
  });

  test('renders with variant=outlined', () => {
    render(<Button variant="outlined">Кнопка</Button>);
  });
})