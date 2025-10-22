import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ handleChange, children, ...props }: Props) {
  return (
    <div className="flex py-[23px] px-[20px] rounded-xl bg-flash-white">

      <input
        {...props}
        className={`w-full outline-none transition-all
         text-black border-none placeholder:text-black
        small-regular`}
        autoComplete="off" 
        spellCheck={false}
        onChange={handleChange}
      />

      {children}
    </div>
  );
};