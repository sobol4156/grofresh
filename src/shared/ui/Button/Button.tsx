import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as ButtonMui, SxProps, Theme, ButtonProps as MuiButtonProps  } from "@mui/material";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "contained" | "text" | "outlined";
  sx?: SxProps<Theme>;
  color?: MuiButtonProps['color']
  onClick?: () => void
}

export default function Button({ children, variant = 'contained', sx, color, onClick }: Props) {

  const defaultSx: SxProps<Theme> = {
    height: '33px',
    ...sx
  };

  return <ButtonMui variant={variant} color={color} sx={defaultSx} onClick={onClick}>{children}</ButtonMui>
}
