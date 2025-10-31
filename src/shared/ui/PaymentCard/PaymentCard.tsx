import Image from "next/image";
import Checkbox from "../Checkbox";
import { useAppDispatch, useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { Card, toggleCurrentCard } from "@/entities/payment/model/payment.slice";

interface PaymentCardProps {
  card: Card | null
}

export default function PaymentCard({ card }: PaymentCardProps) {
  const checked = useAppSelector((state) => state.payment.currentCard);
  const dispatch = useAppDispatch()

  const toggleCard = () => {
    if (!card) return

    dispatch(toggleCurrentCard(card))
  }

  if (!card) return null;

  return (
    <div className="shadow bg-white p-4 rounded-[30px] flex items-center cursor-pointer select-none" onClick={toggleCard}>

      <div className="rounded-full flex justify-center items-center">
        <Image src={card.src} width={50} height={50} alt="payment-method" />
      </div>

      <span className="small-regular ml-2.5">{card.name}</span>

      <Checkbox sx={{ marginLeft: 'auto' }} checked={!!checked} />
    </div>
  )
}