import { render, screen } from '@testing-library/react'
import CategoryCard from './CategoryCard'
import { Category } from '../../../browse-category/model/types'

// Мокаем next/image, чтобы тесты не падали из-за SSR специфики Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

// Моковые данные категории
const mockCategory: Category = {
  id: 1,
  name: 'Fruits',
  image: '/images/categories/fruits.png',
}

describe('CategoryCard component', () => {
  // Проверяет, что рендерится имя категории
  test('renders category name', () => {
    render(<CategoryCard category={mockCategory} />)
    expect(screen.getByText('Fruits')).toBeInTheDocument()
  })

  // Проверяет, что отображается изображение с нужным src и alt
  test('renders category image', () => {
    render(<CategoryCard category={mockCategory} />)
    const image = screen.getByAltText('category')
    expect(image).toHaveAttribute('src', mockCategory.image)
  })

  // Проверяет, что карточка имеет базовые классы для стиля и наведения
  test('has correct base styles', () => {
    const { container } = render(<CategoryCard category={mockCategory} />)
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('bg-white')
    expect(card).toHaveClass('hover:bg-flash-white')
    expect(card).toHaveClass('cursor-pointer')
  })
})
