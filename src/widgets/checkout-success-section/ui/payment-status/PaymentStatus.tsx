import Status from "@/shared/ui/Status";

export default function PaymentStatus() {
  return (
    <div className="flex flex-col items-center max-w-[310px] text-white">
      <Status />

      <p className="h2-bold text-center mt-[22px]">Payment successful</p>
      <span className="small-regular text-center mt-[23px]">Payment successful! Thanks for your order your payment has been completed successfully. You’ll receive a confirmation shortly</span>
    </div>
  )
}