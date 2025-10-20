import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Button({ children }: Props) {
  return <>{children}</>;
}
