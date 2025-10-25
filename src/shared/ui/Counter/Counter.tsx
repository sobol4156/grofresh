import IconButton from "../IconButton";

interface CounterProps {
  quantity: number;
  handleChange: (type: 'increment' | 'decrease') => void
}

export default function Counter({ quantity, handleChange }: CounterProps) {

  return (
    <div className="flex items-center gap-2.5">
      <IconButton onClick={() => handleChange('decrease')} sx={{ touchAction: 'manipulation' }} data-testid="btn-decrease">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.84616 9.23047H14.6154H3.84616Z" fill="black" />
          <path d="M3.84616 9.23047H14.6154" stroke="black" strokeWidth="1.14286" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconButton>

      <span className="large-bold" data-testid="counter-quantity">{quantity}</span>

      <IconButton onClick={() => handleChange('increment')} sx={{ touchAction: 'manipulation' }} data-testid="btn-increment">
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.23047 3.27441C9.54591 3.27441 9.80151 3.53032 9.80176 3.8457V8.65918H14.6152C14.9306 8.65934 15.1864 8.91512 15.1865 9.23047C15.1865 9.54596 14.9307 9.8016 14.6152 9.80176H9.80176V14.6152C9.8016 14.9307 9.54596 15.1865 9.23047 15.1865C8.91512 15.1864 8.65934 14.9306 8.65918 14.6152V9.80176H3.8457C3.53032 9.80151 3.27441 9.54591 3.27441 9.23047C3.27458 8.91517 3.53042 8.65942 3.8457 8.65918H8.65918V3.8457C8.65942 3.53042 8.91517 3.27458 9.23047 3.27441Z" fill="black" />
        </svg>
      </IconButton>
    </div>
  )
}