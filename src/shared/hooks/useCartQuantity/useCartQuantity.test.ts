import { useCartQuantity } from './useCartQuantity';
import * as hooks from '@/app/providers/store-provider/config/hooks';
import { incrementItem, decrementOrRemoveItem } from '@/entities/cart/model/cart.slice';
import { IProduct } from '@/entities/product';

describe('useCartQuantity', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);
  });

  const product: IProduct = {
    id: 1,
    name: 'Test Product',
    unitValue: 1,
    unit: 'kg',
    price: 100,
    src: '/test.png',
    category: '',
    category_id: 0,
    quantity: 0
  };

  it('should dispatch incrementItem when type is "increment"', () => {
    const { handleQuantityChange } = useCartQuantity();
    handleQuantityChange(product, 'increment');

    expect(mockDispatch).toHaveBeenCalledWith(incrementItem(product));
  });

  it('should dispatch decrementOrRemoveItem when type is "decrease"', () => {
    const { handleQuantityChange } = useCartQuantity();
    handleQuantityChange(product, 'decrease');

    expect(mockDispatch).toHaveBeenCalledWith(decrementOrRemoveItem(product));
  });

  it('should not dispatch if item is null', () => {
    const { handleQuantityChange } = useCartQuantity();
    handleQuantityChange(null, 'increment');

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch if item is undefined', () => {
    const { handleQuantityChange } = useCartQuantity();
    handleQuantityChange(undefined, 'decrease');

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
