import IconButton from "@/shared/ui/IconButton";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { useAppSelector } from '@/app/providers/store-provider/config/hooks'
import { selectCartCount, selectCartItems } from '@/entities/cart/model/cart.slice'
import { useEffect } from "react";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
    right: -7px;
  }
`;

export default function CartIcon() {

  const cartCount = useAppSelector(selectCartCount)
  const cartItems = useAppSelector(selectCartItems)

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])
  return (
    <IconButton>
      <LocalGroceryStoreIcon className='text-black' />
      <CartBadge badgeContent={cartCount} color="success" overlap="circular" />
    </IconButton>
  )
}