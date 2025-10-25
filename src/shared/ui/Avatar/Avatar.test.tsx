import { render } from "@testing-library/react"
import Avatar from "./Avatar"

describe('Avatar component', () => {

  // Проверяет, что компонент рендерится с пропсами по умолчанию
  test('renders with default props', () => {
    render(<Avatar />)
  })

  // Проверяет, что компонент корректно рендерится с кастомным размером
  test('renders with custom size', () => {
    render(<Avatar size={100} />)
  })

  // Проверяет, что компонент корректно рендерится с кастомным src
  test('renders with custom src', () => {
    render(<Avatar src="example-path" />)
  })
})
