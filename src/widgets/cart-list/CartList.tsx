import { useAppSelector } from "@/app/providers/store-provider/config/hooks";
import { selectedCartCount, selectedCartItems } from "@/entities/cart/model/cart.slice";
import { ProductCart } from "@/entities/product";

export default function CartList() {
  const cartItems = useAppSelector(selectedCartItems)
  const cartItemsLength = useAppSelector(selectedCartCount)
  return (
    <div className="flex flex-col">

      <div className="flex justify-between items-center">
        <h4 className="h4-bold">{cartItemsLength} items here</h4>
        <span className="small-regular">more</span>
      </div>

      <div className="mt-[22px] flex flex-col gap-2.5">
        {cartItems.map((item) => {
          return <ProductCart key={item.id} product={item} />
        })}
      </div>
    </div>
  )
}