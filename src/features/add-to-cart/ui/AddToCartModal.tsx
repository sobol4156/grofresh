import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider/config/hooks'
import {  clearLastProduct, incrementItem, lastItemModified, removeFromCart } from '@/entities/cart/model/cart.slice';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import Button from '@/shared/ui/Button';
import Counter from '@/shared/ui/Counter';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

export default function AddToCartModal() {
  const modalRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()
  const currentItem = useAppSelector(lastItemModified)

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => dispatch(clearLastProduct()), { doubleEvent: true, doubleTapDelay: 300 })

  const handleChange = (type: 'increment' | 'decrease') => {
    if (!currentItem) return

    if (type === 'increment') {
      dispatch(incrementItem(currentItem))
    } else {
      dispatch(removeFromCart(currentItem))
    }
  }

  return (
    <AnimatePresence>
      {currentItem && (
        <motion.div
          ref={modalRef}
          key={currentItem.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
            className='fixed bottom-0 left-1/2 translate-x-[-50%] w-full bg-white rounded-t-2xl p-6 max-w-md z-1000 will-change-transform will-change-opacity'
        >

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-[5px]'>
              <p className='h3-bold'>${currentItem.price}</p>
              <span className='h6-regular'>Discount up to 10%</span>
            </div>
            <Counter product={currentItem} handleChange={handleChange} />
          </div>

          <div className='flex justify-between items-center gap-2.5 mt-[19px]'>
            <Button sx={{
              height: 50,
              borderRadius: 50,
              width: '100%',
              textTransform: 'none',
              backgroundColor: 'var(--color-flash-white)',
              '&:hover': {
                backgroundColor: 'var(--color-light-silver)',
              }
            }}>
              <span className='text-black h5-bold'>
                Add to cart
              </span>
            </Button>
            <Button sx={{
              height: 50,
              borderRadius: 50,
              width: '100%',
              textTransform: 'none',
              backgroundColor: 'var(--color-green-500)',
              '&:hover': {
                backgroundColor: 'var(--color-green-400)',
              }
            }}>
              <span className='text-white h5-bold'>
                Buy now
              </span>

            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

  )
}