import Image from "next/image";
import Checkbox from "../Checkbox";

export default function PaymentCard() {
  return (
    <div className="shadow bg-white p-4 rounded-[30px] flex items-center">

      <div className="rounded-full flex justify-center items-center">
        <Image src={'/images/payments/master-card.png'} width={50} height={50} alt="payment-method" />
      </div>

      <span className="small-regular ml-2.5">Mastercard</span>

      <Checkbox sx={{marginLeft: 'auto'}}/>
    </div>
  )
}