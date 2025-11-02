import { ReactNode } from "react";
import { Button as ButtonMui, ButtonProps as MuiButtonProps, SxProps, Theme, } from "@mui/material";

interface Props extends Omit<MuiButtonProps, 'color'> {
  children: ReactNode;
  variant?: "contained" | "text" | "outlined";
  sx?: SxProps<Theme>;
  colorType?: "default" | "success";
  onClick?: () => void
}

export default function Button({ children, variant = 'contained', sx, colorType = "default", onClick = () => {}, ...props }: Props) {

  const colorSx: SxProps<Theme> = (() => {
    switch (colorType) {
      case "success":
        return {
          color: 'white',
          backgroundColor: 'var(--color-green-500)',
          '&:hover': { backgroundColor: 'var(--color-green-400)' },
        };
      case "default":
      default:
        return {
          backgroundColor: 'var(--color-flash-white)',
          '&:hover': { backgroundColor: 'var(--color-light-silver)' },
        };
    }
  })();

  const defaultSx: SxProps<Theme> = {
    height: "33px",
    borderRadius: 2,
    ...colorSx,
    ...sx,
  };

  return <ButtonMui variant={variant} sx={defaultSx} onClick={onClick} {...props}>{children}</ButtonMui>
}
