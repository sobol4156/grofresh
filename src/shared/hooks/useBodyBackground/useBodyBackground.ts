import { useEffect } from "react";

export function useBodyBackground(color: string, transition = "0.3s") {
  useEffect(() => {
    const body = document.body;
    const originalBg = body.style.backgroundColor;
    const originalTransition = body.style.transition;

    body.style.transition = `background-color ${transition} ease`;
    body.style.backgroundColor = color;

    return () => {
      body.style.backgroundColor = originalBg;
      body.style.transition = originalTransition;
    };
  }, [color, transition]);
}
