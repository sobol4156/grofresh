import { ReactNode } from "react";
import IconButtonMui, { IconButtonProps } from '@mui/material/IconButton';

interface Props extends IconButtonProps {
  children?: ReactNode;
  variant?: 'default' | 'success',
  size?: "large" | "small" | "medium"
}

export default function IconButton({ size = 'large', variant = 'default', sx, children, ...props }: Props) {

  const variantStyles = () => {
    if (variant === 'default') {
      return {
        backgroundColor: 'var(--color-flash-white)',
        '&:hover': {
          backgroundColor: 'var(--color-light-silver)',
        },
        ...sx
      }
    }

    if (variant === 'success') {
      return {
        backgroundColor: 'var(--color-green-500)',
        '&:hover': {
          backgroundColor: 'var(--color-green-700)',
        },
        ...sx
      }
    }
  }

  return (<IconButtonMui size={size} sx={variantStyles()} {...props}>
    {children}
  </IconButtonMui >
  )
}
