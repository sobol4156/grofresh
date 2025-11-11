import { useAppDispatch, useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { clearCart } from "@/entities/cart/model/cart.slice";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";
import { allPriceCart as allPriceCartSelector } from "@/entities/cart/model/cart.slice"
import { serviceFee as serviceFeeSelector } from "@/entities/payment/model/payment.slice"
import { formatDate } from "@/shared/lib/formatDate";

export default function PaymentDetails() {
  const router = useRouter()

  const dispatch = useAppDispatch();
  const serviceFee = useAppSelector(serviceFeeSelector)
  const allPriceCart = useAppSelector(allPriceCartSelector)

  const datePayment = formatDate();
  const totalPrice = (Number(allPriceCart) > 0 ? Number(allPriceCart) + Number(serviceFee) : 0).toFixed(2)

  const navigateToHome = () => {
    document.body.style.transition = `none`
    dispatch(clearCart())
    router.push('/')
  }


  return (
    <div className="container flex flex-col bg-white p-[16px_24px] rounded-[10px_10px_0_0]">
      <p className="h4-bold">Summary details</p>

      <div className="shadow mt-[22px] bg-white p-4 rounded-[30px]">
        <div className="flex justify-between">
          <span className="h6-bold">Transaction code</span>
          <span className="h6-regular">{'556DTXGR89'}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Payment method</span>
          <span className="h6-regular">{'Mastercard'}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Date</span>
          <span className="h6-regular">{datePayment}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Fee</span>
          <span className="h6-regular">${serviceFee}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Status</span>
          <span className="h6-regular">{'✅ Success'}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h5-bold">Sub total</span>
          <span className="h6-bold">${totalPrice}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>
      </div>

      <div className="flex flex-col gap-[7px] mt-2.5">
        <Button colorType="success" sx={{ height: '58px', borderRadius: '50px', textTransform: 'none', }}>
          <span className="h5-bold">
            Order history
          </span></Button>
        <Button sx={{ height: '58px', borderRadius: '50px', textTransform: 'none', }} onClick={navigateToHome}>
          <span className="h5-bold">
            Back to home
          </span></Button>
      </div>
    </div>
  )
}