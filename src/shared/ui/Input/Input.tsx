import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ name, placeholder = "", handleChange, children }: Props) {
  return (
    <div className="flex py-[23px] px-[20px] rounded-xl bg-flash-white">

      <input
        className={`w-full outline-none transition-all
         text-black border-none placeholder:text-black
        small-regular`}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {children}
    </div>
  );
};