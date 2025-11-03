import { useBodyBackground } from "@/shared/hooks/useBodyBackground/useBodyBackground"
import CheckoutSuccessSection from "@/widgets/checkout-success-section";

export default function CheckoutSuccess() {
  useBodyBackground("#00824B");

  return (
    <div className="pt-[38px] h-full overflow-x-hidden">
        <CheckoutSuccessSection />
    </div>
  )
}