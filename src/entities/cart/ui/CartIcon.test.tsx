import { render, screen } from '@testing-library/react'
import CartIcon from './CartIcon'
import * as hooks from '@/app/providers/store-provider/config/hooks'

// Мокаем IconButton, чтобы не рендерить реальный компонент
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock('@/shared/ui/IconButton', () => (props: any) => (
  <button {...props} data-testid="icon-button">{props.children}</button>
))

// Мокаем иконку корзины
// eslint-disable-next-line react/display-name
jest.mock('@mui/icons-material/LocalGroceryStore', () => () => <div data-testid="store-icon" />)

describe('CartIcon component', () => {

  // Проверка, что компонент рендерит кнопку и иконку корзины
  test('renders the IconButton and the cart icon', () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue(0)
    render(<CartIcon />)

    expect(screen.getByTestId('icon-button')).toBeInTheDocument()
    expect(screen.getByTestId('store-icon')).toBeInTheDocument()
  })

  // Проверка отображения количества товаров в корзине, когда оно больше 0
  test('displays correct cart count when > 0', () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue(5)
    render(<CartIcon />)

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  // Проверка, что компонент Badge рендерится, даже если количество товаров в корзине равно 0
  test('renders Badge when cart count is 0', () => {
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue(0)
    render(<CartIcon />)

    const button = screen.getByTestId('icon-button')
    const badge = button.querySelector('.MuiBadge-badge')
    expect(badge).toBeInTheDocument()
  })
})
