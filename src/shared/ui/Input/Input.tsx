import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name: string
}

export default function Input({ name, placeholder = "", children, ...props }: Props) {
  return (
    <div className="flex py-[23px] px-[20px] rounded-xl bg-flash-white">

      <input
        {...props}
        className={`w-full outline-none transition-all
         text-black border-none placeholder:text-black
        small-regular`}
        name={name}
        placeholder={placeholder}
      />

      {children}
    </div>
  );
};