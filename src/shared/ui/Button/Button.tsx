import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button as ButtonMui, SxProps, Theme } from "@mui/material";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "contained" | "text" | "outlined";
  sx?: SxProps<Theme>;
  onClick?: () => void
}

export default function Button({ children, variant = 'contained', sx, onClick }: Props) {

  const defaultSx: SxProps<Theme> = {
    height: '33px',
    ...sx
  };

  return <ButtonMui variant={variant} sx={defaultSx} onClick={onClick}>{children}</ButtonMui>
}
