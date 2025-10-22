import { ReactNode } from "react";
import IconButtonMui from '@mui/material/IconButton';

interface Props {
  children?: ReactNode;
  variant?: 'default' | 'success',
  size?: "large" | "small" | "medium"
}

export default function IconButton({ children, size = 'large', variant = 'default' }: Props) {

  const variantStyles = () => {
    if (variant === 'default') {
      return {
        backgroundColor: 'var(--color-flash-white)',
        '&:hover': {
          backgroundColor: 'var(--color-light-silver)',
        },
      }
    }

    if (variant === 'success') {
      return {
        backgroundColor: 'var(--color-green-500)',
        '&:hover': {
          backgroundColor: 'var(--color-green-700)',
        },
      }
    }
  }

  return <>
    <IconButtonMui size={size} sx={variantStyles()}>
      {children}
    </IconButtonMui >
  </>;
}
