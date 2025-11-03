import PaymentDetails from "./ui/payment-details";
import PaymentStatus from "./ui/payment-status";
import './checkout-success-section.css'

export default function CheckoutSuccessSection() {
  return (
    <div className="relative h-full flex flex-col gap-[27px]">
      <div className="h-full flex flex-col items-center justify-center">
        <PaymentStatus />
      </div>

      <div className="slide-up">
        <PaymentDetails />
      </div>
    </div>
  )
}