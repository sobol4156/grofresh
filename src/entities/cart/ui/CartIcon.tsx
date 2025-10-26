import IconButton from "@/shared/ui/IconButton";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { useAppSelector } from '@/app/providers/store-provider/config/hooks'
import { selectedCartCount } from '@/entities/cart/model/cart.slice'

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
    right: -7px;
  }
`;

export default function CartIcon({ ...props }) {

  const cartCount = useAppSelector(selectedCartCount)

  return (
    <IconButton {...props}>
      <LocalGroceryStoreIcon className='text-black' />
      <CartBadge badgeContent={cartCount} color="success" overlap="circular" />
    </IconButton>
  )
}