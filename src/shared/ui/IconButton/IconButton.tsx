import { ReactNode } from "react";
import IconButtonMui, { IconButtonProps } from '@mui/material/IconButton';

interface Props extends IconButtonProps {
  children?: ReactNode;
  variant?: 'default' | 'success' | 'warning',
  size?: "large" | "small" | "medium"
}

const VARIANT_STYLES = {
  default: {
    backgroundColor: 'var(--color-flash-white)',
    '&:hover': { backgroundColor: 'var(--color-light-silver)' }
  },
  success: {
    backgroundColor: 'var(--color-green-500)',
    '&:hover': { backgroundColor: 'var(--color-green-700)' }
  },
  warning: {
    backgroundColor: 'var(--color-orange-500)',
    '&:hover': { backgroundColor: 'var(--color-orange-500)' }
  }
};

export default function IconButton({ size = 'large', variant = 'default', sx, children, ...props }: Props) {
  const styles = { ...VARIANT_STYLES[variant], ...sx };

  return (<IconButtonMui size={size} sx={styles} {...props}>
    {children}
  </IconButtonMui >
  )
}
