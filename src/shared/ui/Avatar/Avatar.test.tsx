import { render } from "@testing-library/react"
import Avatar from "./Avatar"

describe('Avatar component', () => {

  test('renders with default props', () => {
    render(<Avatar />)
  })

  test('renders with custom size', () => {
    render(<Avatar size={100} />)
  })

  test('renders with custom src', () => {
    render(<Avatar src="example-path" />)
  })
})