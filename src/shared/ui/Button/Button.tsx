import { ReactNode } from "react";
import { Button as ButtonMui, SxProps, Theme } from "@mui/material";

interface Props {
  children: ReactNode;
  variant?: "contained" | "text" | "outlined";
  sx?: SxProps<Theme>;
}

export default function Button({ children, variant = 'contained', sx }: Props) {

  const defaultSx: SxProps<Theme> = {
    height: '33px',
    ...sx
  };

  return <ButtonMui variant={variant} sx={defaultSx}>{children}</ButtonMui>
}
