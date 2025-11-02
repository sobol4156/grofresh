import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { selectedCartQuantity, selectedCartItems } from "@/entities/cart/model/cart.slice";
import { useRouter } from "next/router";
import BottomNavBar from "@/widgets/bottom-nav-bar";
import CheckoutDetails from "../checkout-details";
import CartSummary from "../cart-summary";
import CartItemsList from "../cart-items-list";

const showDefaultItems = 3

export default function CartSection() {
  const [isCheckoutMode, setCheckoutMode] = useState(false);

  const router = useRouter()

  const cartItems = useAppSelector(selectedCartItems);
  const cartTotalQuantity = useAppSelector(selectedCartQuantity);

  const handleProceedToCheckout = () => {
    if (isCheckoutMode) {
      router.push('/checkout-success')
      setCheckoutMode(false);
      return
    }
    setCheckoutMode(true);
  }

  useEffect(() => {
    if (router.query.checkout === 'true') {
      setCheckoutMode(true);
    }
  }, [router.query.checkout]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCheckoutMode(false)
    }
  }, [cartItems])

  return (
    <div className="flex flex-col pb-[33px]">

      <div className="flex justify-between items-center">
        <h4 className="h4-bold">{cartTotalQuantity} items here</h4>
        <span className="small-regular" >more</span>
      </div>

      <CartItemsList items={cartItems} showDefaultItems={showDefaultItems} />

      {isCheckoutMode && <CheckoutDetails />}

      <CartSummary isCheckoutMode={isCheckoutMode} isEmpty={cartItems.length === 0} onCheckout={handleProceedToCheckout} />

      <BottomNavBar className='mt-2.5' />

    </div>
  )
}