import Status from "@/shared/ui/Status";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "./payment-status.css";

export default function PaymentStatus() {
  return (
    <div className="flex flex-col items-center max-w-[310px] text-white">
      <DotLottieReact
        className="absolute top-0 w-[800px] h-[400px] z-0"
        src="https://lottie.host/0014cf32-8c95-43f9-a5da-4e01b983ceb6/d7H3IZks5z.lottie"
        autoplay
        loop
      />
      <div className="pulse-wrapper z-1">
        <Status className="pulse-status"/>
      </div>

      <p className="h2-bold text-center mt-[22px] z-1">Payment successful</p>
      <span className="small-regular text-center mt-[23px] z-1">Payment successful! Thanks for your order your payment has been completed successfully. You’ll receive a confirmation shortly</span>
    </div>

  )
}