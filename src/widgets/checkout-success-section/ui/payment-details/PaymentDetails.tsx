import Button from "@/shared/ui/Button";
import { useRouter } from "next/router";

export default function PaymentDetails() {
  const router = useRouter()

  const navigateToHome = () => {
    document.body.style.transition = `none`
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
          <span className="h6-regular">{'17 July, 08:45 am'}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Fee</span>
          <span className="h6-regular">${1.50}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h6-bold">Status</span>
          <span className="h6-regular">{'✅ Success'}</span>
        </div>

        <div className="w-full border-b border-light-silver mt-3 mb-2.5"></div>

        <div className="flex justify-between">
          <span className="h5-bold">Sub total</span>
          <span className="h6-bold">${11.95}</span>
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