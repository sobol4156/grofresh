import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider/config/hooks'
import { clearLastProduct } from '@/entities/cart/model/cart.slice';
import { useCartQuantity } from '@/shared/hooks/useCartQuantity';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import Button from '@/shared/ui/Button';
import Counter from '@/shared/ui/Counter';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AddToCartModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { handleQuantityChange } = useCartQuantity();

  const modalRef = useRef<HTMLDivElement>(null)

  const currentItem = useAppSelector((state) => {
    const selected = state.cart.selectedProduct
    if (!selected) return null
    return state.cart.items.find(item => item.id === selected.id) || selected
  })

  const handleCartAction = () => {
    if (!currentItem) return;

    if (currentItem.quantity > 0) {
      router.push('/cart');
    } else {

      handleQuantityChange(currentItem, 'increment');
    }
  };

  useEffect(() => {
    dispatch(clearLastProduct());
  }, [pathname, dispatch]);

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => dispatch(clearLastProduct()), { doubleEvent: true, doubleTapDelay: 300 })

  useEffect(() => {
    if (!modalRef.current) return;

    if (currentItem?.id && pathname === '/') {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(modalRef.current, { opacity: 0, y: 50, duration: 0.3, ease: 'power2.in' });
    }
  }, [currentItem?.id, pathname]);

  if (!currentItem || pathname !== '/') return null;
  return (
    <div
      ref={modalRef}
      className="fixed bottom-0 left-1/2 translate-x-[-50%] w-full max-w-md bg-white rounded-t-2xl p-6 z-1000 will-change-transform will-change-opacity"
    >
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-[5px]'>
          <p className='h3-bold'>${currentItem.price}</p>
          <span className='h6-regular'>Discount up to 10%</span>
        </div>

        {typeof currentItem.quantity === 'number' && (
          <Counter quantity={currentItem.quantity} handleChange={(type) => handleQuantityChange(currentItem, type)} />
        )}
      </div>

      <div className='flex justify-between items-center gap-2.5 mt-[19px]'>
        <Button
          sx={{
            height: 50,
            borderRadius: 50,
            width: '100%',
            textTransform: 'none',
            backgroundColor: 'var(--color-flash-white)',
            '&:hover': { backgroundColor: 'var(--color-light-silver)' },
          }}
          onClick={handleCartAction}
        >
          <span className='text-black h5-bold'>
            {currentItem.quantity ? 'Go to cart' : 'Add to cart'}
          </span>
        </Button>

        <Button
          sx={{
            height: 50,
            borderRadius: 50,
            width: '100%',
            textTransform: 'none',
            backgroundColor: 'var(--color-green-500)',
            '&:hover': { backgroundColor: 'var(--color-green-400)' },
          }}
        >
          <span className='text-white h5-bold'>Buy now</span>
        </Button>
      </div>
    </div>
  );
}