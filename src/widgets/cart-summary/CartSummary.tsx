import { useAppSelector } from "@/app/providers/store-provider/config/hooks";
import Button from "@/shared/ui/Button";
import { allPriceCart as allPriceCartSelector } from "@/entities/cart/model/cart.slice"
import { serviceFee as serviceFeeSelector } from "@/entities/payment/model/payment.slice"
interface CartSummaryProps {
  isEmpty: boolean;
  onCheckout: () => void
}

export default function CartSummary({ isEmpty, onCheckout }: CartSummaryProps) {
  const serviceFee = useAppSelector(serviceFeeSelector)
  const allPriceCart = useAppSelector(allPriceCartSelector)

  const totalPrice = Number(allPriceCart) > 0 ? Number(allPriceCart) + Number(serviceFee) : 0;

  return (
    <div className="mt-[7px] py-6">
      <div className="flex flex-col gap-[5px]">
        <p className="h3-bold">Total : ${totalPrice}</p>
        <span className="h6-regular">Discount up to 5%</span>
      </div>

      <Button disabled={isEmpty} sx={{
        height: 65,
        borderRadius: 50,
        width: '100%',
        marginTop: '19px',
        textTransform: 'none',
        color: 'white',
        backgroundColor: 'var(--color-green-500)',
        '&:hover': { backgroundColor: 'var(--color-green-400)' },
      }}
        onClick={onCheckout}
      >
        <span className="h5-bold">
          Checkout now
        </span>
      </Button>
    </div>
  )
}