import { useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { lastUsedCard } from "@/entities/payment/model/payment.slice";
import CheckoutSummary from "@/entities/payment/ui/checkout-summary";
import ActionOfferCard from "@/shared/ui/ActionOfferCard";
import PaymentCard from "@/shared/ui/PaymentCard";
import { useRouter } from "next/router";

export default function CheckoutDetails() {
  const router = useRouter()
  const lastCard = useAppSelector(lastUsedCard)
  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-2.5 mt-[22px]">
        <ActionOfferCard type="apply-discount" text='Use discount code here' />
        <ActionOfferCard type="set-payment" text='Set the payment method' onClick={() => router.push('/')} />
      </div>

      <div className="flex flex-col gap-[22px]">
        <p className="h4-bold">Last use</p>


        <PaymentCard card={lastCard} isLastCard />
      </div>

      <CheckoutSummary />
    </div>
  )
}