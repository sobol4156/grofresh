import Avatar from '@/shared/ui/Avatar/Avatar'
import IconButton from '@/shared/ui/IconButton'
import { styled } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CartIcon from '@/entities/cart/ui/CartIcon';
import { usePathname } from 'next/navigation';
import { HeaderConfig, headerConfig, HeaderRoute } from './config';
import { useRouter } from 'next/router'

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Header() {
  const router = useRouter();

  const pathname = (usePathname() ?? '/') as HeaderRoute;
  const currentConfig: HeaderConfig = headerConfig[pathname];

  const navigateBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }
  return (
    <header className='flex relative justify-between w-full container'>
      {currentConfig?.user && (
        <div className='flex items-center gap-2.5' data-testid="user">
          <Avatar />
          <div className='flex flex-col justify-between'>
            <p className='h5-regular'>Welcome Back</p>
            <b className='h5-bold'>Kevin henderson</b>
          </div>
        </div>
      )}

      {currentConfig?.backRoute && (
        <IconButton sx={{ width: 50, height: 50 }} data-testid="btn-navigate-back" onClick={navigateBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4231 17.308L8.65385 11.5388L14.4231 5.76953" stroke="black" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconButton>
      )}

      {currentConfig?.centerName && (
        <div className='w-full flex justify-center items-center' data-testid="center-name">
          <h3 className='h3-bold'>Cart</h3>
        </div>
      )}

      <div className='flex items-center gap-1.5'>
        {currentConfig?.cartIcon && <CartIcon onClick={() => router.push('/cart')} />}

        {currentConfig?.notificationIcon && (
          <IconButton sx={{ width: 50, height: 50 }} data-testid="notification-icon">
            <NotificationsNoneIcon sx={{ color: 'black' }} fontSize='inherit' />
            <CartBadge badgeContent={2} color="warning" overlap="circular" />
          </IconButton>
        )}

        {currentConfig?.dots && (
          <IconButton sx={{ width: 50, height: 50 }} data-testid="dots">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.827 16.5107C12.1148 16.5108 12.3911 16.6256 12.5946 16.8291C12.7978 17.0325 12.9119 17.3082 12.912 17.5957C12.912 17.8834 12.798 18.1598 12.5946 18.3633C12.3911 18.5668 12.1148 18.6816 11.827 18.6816C11.5392 18.6816 11.2629 18.5668 11.0594 18.3633C10.856 18.1598 10.742 17.8835 10.742 17.5957C10.7421 17.3081 10.8562 17.0325 11.0594 16.8291C11.2629 16.6256 11.5392 16.5107 11.827 16.5107ZM11.827 10.7412C12.1148 10.7412 12.3911 10.8561 12.5946 11.0596C12.7979 11.2631 12.912 11.5395 12.912 11.8271C12.9119 12.1147 12.7978 12.3904 12.5946 12.5938C12.3911 12.7972 12.1148 12.9121 11.827 12.9121C11.5392 12.9121 11.2629 12.7973 11.0594 12.5938C10.8562 12.3904 10.7421 12.1147 10.742 11.8271C10.742 11.5394 10.856 11.2631 11.0594 11.0596C11.2629 10.8561 11.5392 10.7412 11.827 10.7412ZM11.827 4.97266C12.1148 4.97268 12.3911 5.08655 12.5946 5.29004C12.798 5.49354 12.912 5.76985 12.912 6.05762C12.9119 6.34539 12.7981 6.62171 12.5946 6.8252C12.3911 7.02869 12.1148 7.14256 11.827 7.14258C11.5392 7.14258 11.2629 7.02866 11.0594 6.8252C10.8559 6.62171 10.7421 6.34539 10.742 6.05762C10.742 5.76981 10.8559 5.49355 11.0594 5.29004C11.2629 5.08653 11.5392 4.97266 11.827 4.97266Z" fill="black" stroke="black" strokeWidth="0.714286" />
            </svg>
          </IconButton>
        )}
      </div>


    </header >)
}