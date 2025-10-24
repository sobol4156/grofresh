import { fireEvent, render, screen } from "@testing-library/react"
import Input from "./Input"

describe('Input component', () => {

  const valueExample = 'test'
  const handleChange = jest.fn()

  beforeEach(() => {
    handleChange.mockClear();
  });

  test('renders with default props and value', () => {
    render(<Input value={valueExample} handleChange={handleChange} />);

    const input = screen.getByDisplayValue(valueExample);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(valueExample);

    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
})