import { useState } from "react";
import { useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { allPriceCart, selectedCartQuantity, selectedCartItems, selectedCartCount } from "@/entities/cart/model/cart.slice";
import { ProductCart } from "@/entities/product";
import Button from "@/shared/ui/Button";
import ActionOfferCard from "@/shared/ui/ActionOfferCard";
import { useRouter } from "next/router";
import BottomNavBar from "@/widgets/bottom-nav-bar";
import PaymentCard from "@/shared/ui/PaymentCard";

const showDefaultItems = 3

export default function CartList() {
  const router = useRouter()
  const [isAll, isAllSet] = useState(false)

  const cartItems = useAppSelector(selectedCartItems)
  const cartUniqueItemsCount = useAppSelector(selectedCartCount);
  const cartTotalQuantity = useAppSelector(selectedCartQuantity);
  const allPrice = useAppSelector(allPriceCart)

  return (
    <div className="flex flex-col pb-[33px]">

      <div className="flex justify-between items-center">
        <h4 className="h4-bold">{cartTotalQuantity} items here</h4>
        <span className="small-regular" >more</span>
      </div>

      <div className="mt-[22px] flex flex-col gap-2.5">
        {cartItems
          .slice(0, isAll ? cartItems.length : showDefaultItems)
          .map((item) => (
            <ProductCart key={item.id} product={item} />
          ))}
      </div>

      {cartUniqueItemsCount > showDefaultItems && (
        <div
          className="mt-[22px] flex items-center gap-[18px] cursor-pointer select-none"
          onClick={() => isAllSet((prev) => !prev)}
        >
          <div className="border w-full"></div>
          <span className="small-regular shrink-0">
            {isAll
              ? "Less items"
              : `Show ${Math.max(0, cartItems.length - showDefaultItems)} more`}
          </span>
          <div className="border w-full"></div>
        </div>
      )}

      {
        true && (

          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-col gap-2.5 mt-[22px]">
              <ActionOfferCard type="apply-discount" text='Use discount code here' />
              <ActionOfferCard type="set-payment" text='Set the payment method' onClick={() => router.push('/')} />
            </div>

            <div className="flex flex-col gap-[22px]">
              <p className="h4-bold">Last use</p>

              <PaymentCard />
            </div>
          </div>
        )
      }



      <div className="mt-[7px] py-6">
        <div className="flex flex-col gap-[5px]">
          <p className="h3-bold">Total : ${allPrice}</p>
          <span className="h6-regular">Discount up to 5%</span>
        </div>

        <Button sx={{
          height: 65,
          borderRadius: 50,
          width: '100%',
          marginTop: '19px',
          textTransform: 'none',
          color: 'white',
          backgroundColor: 'var(--color-green-500)',
          '&:hover': { backgroundColor: 'var(--color-green-400)' },
        }}>
          <span className="h5-bold">
            Checkout now
          </span>
        </Button>
      </div>

      <BottomNavBar className='mt-2.5' />

    </div>
  )
}