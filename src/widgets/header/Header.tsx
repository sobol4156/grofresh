import Avatar from '@/shared/ui/Avatar/Avatar'
import IconButton from '@/shared/ui/IconButton'
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CartIcon from '@/entities/cart/ui/CartIcon';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Header() {
  return (
    <header className='flex justify-between w-full container'>
      <div className='flex items-center gap-2.5'>
        <Avatar />
        <div className='flex flex-col justify-between'>
          <p className='h5-regular'>Welcome Back</p>
          <b className='h5-bold'>Kevin henderson</b>
        </div>
      </div>

      <div className='flex items-center gap-1.5'>
        <CartIcon />

        <IconButton>
          <NotificationsNoneIcon sx={{ color: 'black' }} fontSize='inherit' />
          <CartBadge badgeContent={2} color="warning" overlap="circular" />
        </IconButton>
      </div>


    </header >)
}