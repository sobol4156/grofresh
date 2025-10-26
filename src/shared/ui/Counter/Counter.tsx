import { SxProps, Theme } from "@mui/material";
import IconButton from "../IconButton";

interface CounterProps {
  quantity: number;
  btnSx?: SxProps<Theme>;
  btnSize?: "medium" | "large" | "small",
  handleChange: (type: 'increment' | 'decrease') => void
}

export default function Counter({ quantity, handleChange, btnSx, btnSize }: CounterProps) {
  const customSx = () => {
    return {

      ...btnSx
    }
  }


  const svgSize = (() => {
    switch (btnSize) {
      case "small":
        return 14;
      case "medium":
        return 17;
      case "large":
      default:
        return 19;
    }
  })();
  return (
    <div className="flex items-center gap-2.5">
      <IconButton onClick={() => handleChange('decrease')} size={btnSize} sx={customSx()} data-testid="btn-decrease">
        <svg width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.84616 9.23047H14.6154H3.84616Z" fill="black" />
          <path d={`M${svgSize * 0.2} ${svgSize / 2}H${svgSize * 0.8}`} stroke="black" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconButton>

      <span className="large-bold" data-testid="counter-quantity">{quantity}</span>

      <IconButton onClick={() => handleChange('increment')} size={btnSize} sx={customSx()} data-testid="btn-increment">
        <svg width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={`
              M${svgSize / 2} ${svgSize * 0.2}V${svgSize * 0.8}
              M${svgSize * 0.2} ${svgSize / 2}H${svgSize * 0.8}
            `}
            stroke="black"
            strokeWidth="1.3"
            strokeLinecap="round" />
        </svg>
      </IconButton>
    </div>
  )
}