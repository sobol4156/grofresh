import { render, screen } from '@testing-library/react'
import DiscountCard from './DiscountCard'

// Мокаем next/image, чтобы не мешал при тестах
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

// Мокаем компонент Button
jest.mock('@/shared/ui/Button', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children }: any) => <button>{children}</button>,
}))

describe('DiscountCard component', () => {
  // Проверяет, что отображается основной текст
  test('renders discount text and description', () => {
    render(<DiscountCard />)

    expect(screen.getByText(/Fresh Deals/i)).toBeInTheDocument()
    expect(screen.getByText(/Today 20% OFF/i)).toBeInTheDocument()
    expect(screen.getByText(/Special prices on selected groceries/i)).toBeInTheDocument()
  })

  // Проверяет, что отображается кнопка "Explore deals"
  test('renders the "Explore deals" button', () => {
    render(<DiscountCard />)
    expect(screen.getByRole('button', { name: /Explore deals/i })).toBeInTheDocument()
  })

  // Проверяет, что картинка отображается с нужным src и alt
  test('renders product discount image', () => {
    render(<DiscountCard />)
    const image = screen.getByAltText('Picture of the author')
    expect(image).toHaveAttribute('src', '/images/product-discount.png')
  })

  // Проверяет, что переданный className применяется
  test('applies custom className', () => {
    const { container } = render(<DiscountCard className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
