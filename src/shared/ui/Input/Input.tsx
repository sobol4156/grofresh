import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function Input({value, handleChange, children, ...props }: Props) {
  return (
    <div className="flex py-[23px] px-5 rounded-xl bg-flash-white">

      <input
        {...props}
        className={`w-full outline-none transition-all
         text-black border-none placeholder:text-black
        small-regular`}
        data-testid="input"
        value={value}
        autoComplete="off" 
        spellCheck={false}
        onChange={handleChange}
      />

      {children}
    </div>
  );
};