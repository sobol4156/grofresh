import BottomNavBar from "@/widgets/bottom-nav-bar";
import CartList from "@/widgets/cart-list";

export default function Cart() {
  return (
    <div className="mt-[38px]">
      <div className="container">
        <CartList />

        <BottomNavBar className='mt-2.5' />
      </div>
    </div>
  )
}