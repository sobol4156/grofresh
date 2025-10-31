import { useAppSelector } from "@/app/providers/store-provider/config/hooks"
import { allPriceCart as allPriceCartSelector } from "@/entities/cart/model/cart.slice"
import { serviceFee as serviceFeeSelector, paymentMethod as paymentMethodSelector } from "@/entities/payment/model/payment.slice"

export default function CheckoutSummary() {
  const serviceFee = useAppSelector(serviceFeeSelector)
  const allPriceCart = useAppSelector(allPriceCartSelector)
  const paymentMethod = useAppSelector(paymentMethodSelector)

  const totalPrice = (Number(allPriceCart) + Number(serviceFee)).toFixed(2);

  return (
    <div className="flex flex-col gap-[22px]">
      <p className="h4-bold">Summary</p>

      <div className="shadow p-4">

        <div className="flex justify-between">
          <span className="h6-bold">Payment method</span>
          <span className="h6-regular">{paymentMethod}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Service Fee</span>
          <span className="h6-regular">${serviceFee}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h5-bold">Total cost</span>
          <span className="h6-bold">${totalPrice}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3"></div>
      </div>
    </div>
  )
}