import { render, screen } from '@testing-library/react'
import BrowseCategory from './BrowseCategory'
import { MOCK_CATEGORIES } from './config/mock'

// Мокаем CategoryCard, чтобы не рендерить реальные изображения и стили
jest.mock('../category-card', () => ({
  __esModule: true,
  default: ({ category }: { category: { name: string } }) => (
    <div data-testid="category-card">{category.name}</div>
  ),
}))

describe('BrowseCategory component', () => {
  // Проверяет, что отображается заголовок блока
  test('renders section title', () => {
    render(<BrowseCategory />)
    expect(screen.getByText('Browse categories')).toBeInTheDocument()
  })

  // Проверяет, что отображается кнопка "more"
  test('renders "more" button', () => {
    render(<BrowseCategory />)
    expect(screen.getByText('more')).toBeInTheDocument()
  })

  // Проверяет, что карточки категорий рендерятся на основе MOCK_CATEGORIES
  test('renders all category cards from mock data', () => {
    render(<BrowseCategory />)
    const categoryCards = screen.getAllByTestId('category-card')
    expect(categoryCards).toHaveLength(MOCK_CATEGORIES.length)

    // Проверяет, что текст карточек совпадает с именами из MOCK_CATEGORIES
    MOCK_CATEGORIES.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  // Проверяет, что кастомный className применяется к корневому контейнеру
  test('applies custom className', () => {
    const { container } = render(<BrowseCategory className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
