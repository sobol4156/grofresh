import { ReactNode } from "react";
import IconButtonMui from '@mui/material/IconButton';

interface Props {
  children?: ReactNode;
}

export default function IconButton({ children }: Props) {
  return <>
    <IconButtonMui size="large" sx={{
      backgroundColor: 'var(--color-flash-white)',
      '&:hover': {
        backgroundColor: 'var(--color-light-silver)',
      },
    }}>
      {children}
    </IconButtonMui >
  </>;
}
