import PaymentDetails from "./ui/payment-details";
import PaymentStatus from "./ui/payment-status";

export default function CheckoutSuccessSection() {
  return (
    <div className="relative h-full flex flex-col gap-[27px]">
      <div className="flex flex-col items-center">
        <PaymentStatus />
      </div>
      <div className="mt-auto">
        <PaymentDetails />
      </div>
    </div>
  )
}