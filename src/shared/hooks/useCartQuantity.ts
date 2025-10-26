import { useAppDispatch } from '@/app/providers/store-provider/config/hooks';
import { incrementItem, removeFromCart } from '@/entities/cart/model/cart.slice';
import { IProduct } from '@/entities/product';

export function useCartQuantity() {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (item: IProduct | null | undefined, type: 'increment' | 'decrease') => {
    if (!item) return;

    if (type === 'increment') {
      dispatch(incrementItem(item));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  return { handleQuantityChange };
}
